from __future__ import annotations

import json
import math
import random
from pathlib import Path
from typing import Dict, Tuple

import numpy as np
import torch


def build_char_vocab(text: str) -> Tuple[Dict[str, int], Dict[int, str]]:
    chars = sorted(set(text))
    # Ensure essential special tokens exist in vocab
    for tok in ["<pad>"]:
        if tok not in chars:
            chars.append(tok)
    stoi = {ch: i for i, ch in enumerate(chars)}
    itos = {i: ch for ch, i in stoi.items()}
    return stoi, itos


def encode(text: str, stoi: Dict[str, int]) -> torch.Tensor:
    ids = [stoi.get(ch, None) for ch in text]
    # Unknown chars are skipped
    ids = [i for i in ids if i is not None]
    return torch.tensor(ids, dtype=torch.long)


def decode(ids: torch.Tensor, itos: Dict[int, str]) -> str:
    return "".join(itos[int(i)] for i in ids)


def save_vocab(path: str | Path, stoi: Dict[str, int], itos: Dict[int, str]) -> None:
    obj = {"stoi": stoi, "itos": {str(k): v for k, v in itos.items()}}
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)


def load_vocab(path: str | Path) -> Tuple[Dict[str, int], Dict[int, str]]:
    with open(path, "r", encoding="utf-8") as f:
        obj = json.load(f)
    stoi = obj["stoi"]
    itos = {int(k): v for k, v in obj["itos"].items()}
    return stoi, itos


def top_p_filtering(logits: torch.Tensor, top_p: float = 0.9, min_tokens_to_keep: int = 1) -> torch.Tensor:
    # logits: [vocab]
    sorted_logits, sorted_indices = torch.sort(logits, descending=True)
    probs = torch.softmax(sorted_logits, dim=-1)
    cumulative_probs = torch.cumsum(probs, dim=-1)
    cutoff = cumulative_probs > top_p
    if min_tokens_to_keep > 0:
        cutoff[:min_tokens_to_keep] = False
    sorted_logits[cutoff] = -float("inf")
    # Map back
    filtered = torch.full_like(logits, -float("inf"))
    filtered[sorted_indices] = sorted_logits
    return filtered


def sample_next_token(logits: torch.Tensor, temperature: float = 1.0, top_p: float = 0.9) -> int:
    if temperature <= 0:
        return int(torch.argmax(logits).item())
    logits = logits / max(1e-6, temperature)
    logits = top_p_filtering(logits, top_p=top_p)
    probs = torch.softmax(logits, dim=-1)
    next_id = torch.multinomial(probs, num_samples=1)
    return int(next_id.item())