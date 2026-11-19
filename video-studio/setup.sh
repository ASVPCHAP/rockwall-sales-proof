#!/usr/bin/env bash
# One-time setup. Needs: python3 (3.10+) and ffmpeg on your PATH.
#   macOS:   brew install ffmpeg python
#   Windows: winget install Gyan.FFmpeg Python.Python.3.12   (then run this in Git Bash or WSL)
set -euo pipefail
cd "$(dirname "$0")"
command -v ffmpeg >/dev/null || { echo "ffmpeg not found - install it first"; exit 1; }
python3 -m venv .venv
.venv/bin/pip install --upgrade pip
.venv/bin/pip install -r requirements.txt
mkdir -p voices media/clips media/music media/reference out
if [ ! -f voices/en_US-ryan-high.onnx ]; then
  base=https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/ryan/high
  curl -sSL -o voices/en_US-ryan-high.onnx      "$base/en_US-ryan-high.onnx"
  curl -sSL -o voices/en_US-ryan-high.onnx.json "$base/en_US-ryan-high.onnx.json"
fi
echo "Ready. Try: .venv/bin/python scripts/narrate.py scripts/example_script.txt out/vo.wav"
