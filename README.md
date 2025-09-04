# Kirito-like Persona AI (Python)

Two options are provided:

1) Lightweight char-level model (works on Python 3.13 without tokenizers)
2) (Optional) Transformers + LoRA setup (may require Python 3.11/3.12)

## Quick start (char-level)

1) Install minimal deps:

```bash
pip install -r requirements.txt --break-system-packages
```

2) Train a tiny model on the provided synthetic dataset:

```bash
python -m kirito_charlm.train --data_path data/kirito_synthetic.jsonl --output_dir outputs/charlm --epochs 2
```

3) Run inference:

```bash
python -m kirito_charlm.infer --model_dir outputs/charlm --prompt "Впереди сильный противник. Твоя стратегия?"
```

## Optional: Transformers + LoRA

The `kirito_ai/` package contains a standard Transformers-based setup. On Python 3.13, building `tokenizers` fails currently. Use Python 3.11/3.12 or a venv with compatible wheels.

- Train: `python -m kirito_ai.train --data_path data/kirito_synthetic.jsonl --output_dir outputs/kirito_lora --base_model distilgpt2`
- Infer: `python -m kirito_ai.infer --prompt "..." --adapter_path outputs/kirito_lora`

## Dataset format

`JSONL` with messages per line:

```json
{"messages": [
  {"role": "system", "content": "You are a calm, decisive swordsman who protects friends and prefers concise, tactical replies."},
  {"role": "user", "content": "Команда застряла в ловушке. Что делать?"},
  {"role": "assistant", "content": "Сохраняем строй. Проверю края ловушки, ты прикрой. Если датчики молчат — прорежем путь."}
]}
```

Create your own original lines to express the style; avoid quoting copyrighted text.