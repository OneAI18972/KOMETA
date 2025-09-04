from __future__ import annotations

import torch
import torch.nn as nn


class CharLanguageModel(nn.Module):
    def __init__(self, vocab_size: int, embedding_dim: int = 256, hidden_dim: int = 512, num_layers: int = 2, dropout: float = 0.1):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embedding_dim)
        self.rnn = nn.GRU(embedding_dim, hidden_dim, num_layers=num_layers, batch_first=True, dropout=dropout)
        self.norm = nn.LayerNorm(hidden_dim)
        self.fc = nn.Linear(hidden_dim, vocab_size)

    def forward(self, input_ids, hidden=None):
        x = self.embedding(input_ids)
        out, hidden = self.rnn(x, hidden)
        out = self.norm(out)
        logits = self.fc(out)
        return logits, hidden