from __future__ import annotations

import argparse
import json
from pathlib import Path

import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from tqdm import tqdm

from .data import read_jsonl_messages, build_corpus_from_messages
from .model import CharLanguageModel
from .utils import build_char_vocab, encode, save_vocab


class CharDataset(Dataset):
    def __init__(self, text: str, block_size: int = 256):
        super().__init__()
        self.text = text
        self.block_size = block_size

    def __len__(self):
        return max(0, len(self.text) - self.block_size - 1)

    def __getitem__(self, idx):
        chunk = self.text[idx : idx + self.block_size + 1]
        return chunk


def collate_fn(batch, stoi):
    xs = []
    ys = []
    for chunk in batch:
        ids = encode(chunk, stoi)
        xs.append(ids[:-1])
        ys.append(ids[1:])
    # pad to max len in batch
    max_len = max(x.size(0) for x in xs)
    x_pad = torch.full((len(xs), max_len), fill_value=stoi.get("<pad>", 0), dtype=torch.long)
    y_pad = torch.full((len(xs), max_len), fill_value=-100, dtype=torch.long)
    for i, (x, y) in enumerate(zip(xs, ys)):
        x_pad[i, : x.size(0)] = x
        y_pad[i, : y.size(0)] = y
    return x_pad, y_pad


def parse_args():
    p = argparse.ArgumentParser(description="Train a char-level Kirito-inspired LM")
    p.add_argument("--data_path", type=str, default="data/kirito_synthetic.jsonl")
    p.add_argument("--output_dir", type=str, default="outputs/charlm")
    p.add_argument("--block_size", type=int, default=256)
    p.add_argument("--batch_size", type=int, default=32)
    p.add_argument("--epochs", type=int, default=2)
    p.add_argument("--lr", type=float, default=3e-3)
    p.add_argument("--embedding_dim", type=int, default=192)
    p.add_argument("--hidden_dim", type=int, default=384)
    p.add_argument("--layers", type=int, default=2)
    p.add_argument("--device", type=str, default="cpu")
    return p.parse_args()


def main():
    args = parse_args()
    Path(args.output_dir).mkdir(parents=True, exist_ok=True)

    conversations = read_jsonl_messages(args.data_path)
    corpus = build_corpus_from_messages(conversations)

    stoi, itos = build_char_vocab(corpus)
    save_vocab(Path(args.output_dir) / "vocab.json", stoi, itos)

    dataset = CharDataset(corpus, block_size=args.block_size)
    loader = DataLoader(dataset, batch_size=args.batch_size, shuffle=True, collate_fn=lambda b: collate_fn(b, stoi))

    model = CharLanguageModel(vocab_size=len(stoi), embedding_dim=args.embedding_dim, hidden_dim=args.hidden_dim, num_layers=args.layers)
    model.to(args.device)
    optimizer = torch.optim.AdamW(model.parameters(), lr=args.lr)
    criterion = nn.CrossEntropyLoss(ignore_index=-100)

    model.train()
    for epoch in range(args.epochs):
        pbar = tqdm(loader, desc=f"epoch {epoch+1}/{args.epochs}")
        total_loss = 0.0
        for x, y in pbar:
            x = x.to(args.device)
            y = y.to(args.device)
            optimizer.zero_grad()
            logits, _ = model(x)
            loss = criterion(logits.view(-1, logits.size(-1)), y.view(-1))
            loss.backward()
            optimizer.step()
            total_loss += loss.item()
            pbar.set_postfix(loss=f"{loss.item():.3f}")
        avg = total_loss / max(1, len(loader))
        print(f"epoch {epoch+1} avg loss: {avg:.4f}")

    torch.save(model.state_dict(), str(Path(args.output_dir) / "model.pt"))
    # Save config for inference
    cfg = {
        "embedding_dim": args.embedding_dim,
        "hidden_dim": args.hidden_dim,
        "layers": args.layers,
    }
    with open(Path(args.output_dir) / "config.json", "w", encoding="utf-8") as f:
        json.dump(cfg, f)
    print("Saved to", args.output_dir)


if __name__ == "__main__":
    main()