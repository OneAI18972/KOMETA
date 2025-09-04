from __future__ import annotations

import json
from dataclasses import dataclass
from typing import Iterable, List, Dict

from datasets import load_dataset
from transformers import PreTrainedTokenizerBase


SPECIAL_TOKENS = {
    "bos": "<s>",
    "eos": "</s>",
    "pad": "<pad>",
    "user": "<|user|>",
    "assistant": "<|assistant|>",
    "system": "<|system|>",
}


def format_dialogue(messages: List[Dict[str, str]]) -> str:
    parts: List[str] = []
    for msg in messages:
        role = msg.get("role", "user")
        content = msg.get("content", "").strip()
        if not content:
            continue
        if role == "system":
            parts.append(f"{SPECIAL_TOKENS['system']} {content}")
        elif role == "assistant":
            parts.append(f"{SPECIAL_TOKENS['assistant']} {content}")
        else:
            parts.append(f"{SPECIAL_TOKENS['user']} {content}")
    parts.append(SPECIAL_TOKENS["eos"])
    return "\n".join(parts)


def load_jsonl_dataset(path: str):
    # Uses datasets for streaming-safe jsonlines
    return load_dataset("json", data_files=path, split="train")


@dataclass
class TokenizedExample:
    input_ids: List[int]
    attention_mask: List[int]


def ensure_special_tokens(tokenizer: PreTrainedTokenizerBase) -> None:
    added = tokenizer.add_special_tokens({
        "eos_token": SPECIAL_TOKENS["eos"],
        "pad_token": SPECIAL_TOKENS["pad"],
        "bos_token": SPECIAL_TOKENS["bos"],
        "additional_special_tokens": [
            SPECIAL_TOKENS["user"],
            SPECIAL_TOKENS["assistant"],
            SPECIAL_TOKENS["system"],
        ],
    })
    if added > 0 and hasattr(tokenizer, "model_max_length"):
        # The caller must resize the embeddings on model.load
        pass


def tokenize_function(examples, tokenizer: PreTrainedTokenizerBase, max_length: int = 512):
    texts = []
    for rec in examples["messages"]:
        # Each rec is a list of {role, content}
        text = format_dialogue(rec)
        texts.append(text)
    encoded = tokenizer(
        texts,
        truncation=True,
        max_length=max_length,
        padding=False,
        return_attention_mask=True,
    )
    return encoded