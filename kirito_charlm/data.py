from __future__ import annotations

import json
from pathlib import Path
from typing import List, Dict

ROLE_TAGS = {
    "system": "<|system|>",
    "user": "<|user|>",
    "assistant": "<|assistant|>",
}


def read_jsonl_messages(path: str | Path) -> List[List[Dict[str, str]]]:
    records: List[List[Dict[str, str]]] = []
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            if not line.strip():
                continue
            obj = json.loads(line)
            msgs = obj.get("messages", [])
            # Keep only known roles
            cleaned = []
            for m in msgs:
                role = m.get("role", "user")
                if role not in ROLE_TAGS:
                    role = "user"
                content = (m.get("content", "") or "").strip()
                if content:
                    cleaned.append({"role": role, "content": content})
            if cleaned:
                records.append(cleaned)
    return records


def build_corpus_from_messages(conversations: List[List[Dict[str, str]]]) -> str:
    # Concatenate dialogues with role tags, separated by newlines
    lines: List[str] = []
    for convo in conversations:
        for msg in convo:
            tag = ROLE_TAGS[msg["role"]]
            lines.append(f"{tag} {msg['content']}")
        lines.append("\n")
    text = "\n".join(lines)
    return text