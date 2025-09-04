from __future__ import annotations

import argparse
from pathlib import Path
from typing import List

from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel

from .config import ModelConfig, build_chat_preamble, KIRITO_SYSTEM_PROMPT


def parse_args():
    parser = argparse.ArgumentParser(description="Kirito-like persona inference")
    parser.add_argument("--prompt", type=str, default=None, help="Single-turn user prompt. If omitted, starts REPL.")
    parser.add_argument("--adapter_path", type=str, default=None, help="Optional LoRA adapter directory")
    parser.add_argument("--base_model", type=str, default=ModelConfig.base_model_name, help="Base model name")
    parser.add_argument("--max_new_tokens", type=int, default=ModelConfig.max_new_tokens)
    parser.add_argument("--temperature", type=float, default=ModelConfig.temperature)
    parser.add_argument("--top_p", type=float, default=ModelConfig.top_p)
    parser.add_argument("--repetition_penalty", type=float, default=ModelConfig.repetition_penalty)
    return parser.parse_args()


def build_prompt(user_input: str, history: List[str] | None = None, system_prompt: str | None = None) -> str:
    preamble = build_chat_preamble(system_prompt)
    convo = [preamble]
    if history:
        for turn in history:
            convo.append(turn)
    convo.append(f"<|user|> {user_input}")
    convo.append("<|assistant|>")
    return "\n".join(convo)


def generate(model, tokenizer, text: str, max_new_tokens: int, temperature: float, top_p: float, repetition_penalty: float) -> str:
    input_ids = tokenizer(text, return_tensors="pt").input_ids
    output_ids = model.generate(
        input_ids=input_ids,
        max_new_tokens=max_new_tokens,
        do_sample=True,
        temperature=temperature,
        top_p=top_p,
        repetition_penalty=repetition_penalty,
        pad_token_id=tokenizer.eos_token_id,
        eos_token_id=tokenizer.eos_token_id,
    )
    decoded = tokenizer.decode(output_ids[0], skip_special_tokens=True)
    # Return only the last assistant segment if possible
    split_tag = "<|assistant|>"
    return decoded.split(split_tag)[-1].strip()


def main():
    args = parse_args()

    tokenizer = AutoTokenizer.from_pretrained(args.base_model)
    # Ensure special tokens exist for our tags
    tokenizer.add_special_tokens({
        "eos_token": "</s>",
        "pad_token": "<pad>",
        "bos_token": "<s>",
        "additional_special_tokens": ["<|user|>", "<|assistant|>", "<|system|>"],
    })

    model = AutoModelForCausalLM.from_pretrained(args.base_model)
    model.resize_token_embeddings(len(tokenizer))

    if args.adapter_path:
        model = PeftModel.from_pretrained(model, args.adapter_path)

    if args.prompt:
        text = build_prompt(args.prompt, system_prompt=KIRITO_SYSTEM_PROMPT)
        out = generate(
            model,
            tokenizer,
            text=text,
            max_new_tokens=args.max_new_tokens,
            temperature=args.temperature,
            top_p=args.top_p,
            repetition_penalty=args.repetition_penalty,
        )
        print(out)
        return

    # REPL
    history: List[str] = []
    print("Kirito-like persona REPL. Type 'exit' to quit.")
    while True:
        try:
            user_in = input("You: ").strip()
        except EOFError:
            break
        if not user_in or user_in.lower() in {"exit", "quit"}:
            break
        prompt = build_prompt(user_in, history=history, system_prompt=KIRITO_SYSTEM_PROMPT)
        reply = generate(
            model,
            tokenizer,
            text=prompt,
            max_new_tokens=args.max_new_tokens,
            temperature=args.temperature,
            top_p=args.top_p,
            repetition_penalty=args.repetition_penalty,
        )
        print(f"Kirito: {reply}")
        history.append(f"<|user|> {user_in}")
        history.append(f"<|assistant|> {reply}")


if __name__ == "__main__":
    main()