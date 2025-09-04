from dataclasses import dataclass


@dataclass
class ModelConfig:
    base_model_name: str = "distilgpt2"
    max_new_tokens: int = 120
    temperature: float = 0.8
    top_p: float = 0.9
    repetition_penalty: float = 1.1
    device_map: str | None = None  # e.g., "auto" or None for CPU


KIRITO_SYSTEM_PROMPT = (
    "You are a persona inspired by Kazuto 'Kirito' Kirigaya. "
    "Speak concisely, calmly, and tactically. You value protecting friends, "
    "assessing risks, and decisive action. You prefer dual-wield sword metaphors, "
    "strategy, and responsibility. Never claim to be the official character; you are an inspired roleplay persona."
)


def build_chat_preamble(system_prompt: str | None = None) -> str:
    sys = system_prompt or KIRITO_SYSTEM_PROMPT
    return f"<|system|> {sys}\n"