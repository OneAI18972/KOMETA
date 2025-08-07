from __future__ import annotations

import argparse
import json
from pathlib import Path

import torch

from .model import CharLanguageModel
from .utils import load_vocab, encode, decode, sample_next_token

KIRITO_STYLE = (
    "<|system|> You are a calm, decisive swordsman who protects friends, analyzes quickly, "
    "and replies concisely with tactical focus. You are an inspired persona, not an official character.\n"
)


def parse_args():
    p = argparse.ArgumentParser(description="Infer with char-level Kirito-inspired model")
    p.add_argument("--model_dir", type=str, default="outputs/charlm")
    p.add_argument("--prompt", type=str, required=True)
    p.add_argument("--max_new_chars", type=int, default=240)
    p.add_argument("--temperature", type=float, default=0.9)
    p.add_argument("--top_p", type=float, default=0.9)
    p.add_argument("--device", type=str, default="cpu")
    return p.parse_args()


def main():
    args = parse_args()

    stoi, itos = load_vocab(Path(args.model_dir) / "vocab.json")
    # Load model config if available
    cfg_path = Path(args.model_dir) / "config.json"
    if cfg_path.exists():
        with open(cfg_path, "r", encoding="utf-8") as f:
            cfg = json.load(f)
        embedding_dim = int(cfg.get("embedding_dim", 256))
        hidden_dim = int(cfg.get("hidden_dim", 512))
        layers = int(cfg.get("layers", 2))
    else:
        embedding_dim, hidden_dim, layers = 256, 512, 2
    model = CharLanguageModel(vocab_size=len(stoi), embedding_dim=embedding_dim, hidden_dim=hidden_dim, num_layers=layers)
    state_dict = torch.load(Path(args.model_dir) / "model.pt", map_location=args.device)
    model.load_state_dict(state_dict)
    model.to(args.device)
    model.eval()

    preamble = KIRITO_STYLE
    prompt = preamble + f"<|user|> {args.prompt}\n<|assistant|> "

    x = encode(prompt, stoi).unsqueeze(0).to(args.device)
    hidden = None

    with torch.no_grad():
        # Warm-up through the prompt
        logits, hidden = model(x)
        next_input = x[:, -1:]
        out_ids = []
        for _ in range(args.max_new_chars):
            logits, hidden = model(next_input, hidden)
            next_id = sample_next_token(logits[0, -1], temperature=args.temperature, top_p=args.top_p)
            out_ids.append(next_id)
            if itos.get(next_id, "") == "\n":
                # Stop if we produced a line break after some text
                if len(out_ids) > 40:
                    break
            next_input = torch.tensor([[next_id]], dtype=torch.long, device=args.device)

    text = decode(torch.tensor(out_ids), itos)
    print(text.strip())


if __name__ == "__main__":
    main()