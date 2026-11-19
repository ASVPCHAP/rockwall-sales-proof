"""Generate a shot list's still images through treg (GPT Image 2 by default), in parallel.

Usage:
    .venv/bin/python scripts/gen_images.py SHOTS.json OUT_DIR [--workers 6] [--only 12,13] [--dry-run]

SHOTS.json:
{
  "style": "1980s anime feature film still, ...",          # prefixed to every prompt
  "refs": {"him": "https://.../sheet.png", "cast": "https://.../cast.png"},   # public image URLs
  "shots": [{"id": "016", "refs": ["him"], "prompt": "...", "reuse": null, "hero": false}, ...]
}
A shot with "reuse": "path.png" is copied instead of generated. Existing OUT_DIR/<id>.png files are
skipped, so re-running only fills gaps (delete a file to re-roll it). Needs the `treg` CLI, signed in.
Writes OUT_DIR/gen_log.jsonl with each call id and charge.
"""
import argparse
import json
import re
import shutil
import subprocess
import tempfile
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

TOOL = "reapi.image-gen.gpt-image-2"


def generate(shot, style, refs, out_dir):
    out = out_dir / f"{shot['id']}.png"
    if out.exists():
        return shot["id"], "exists", 0.0
    if shot.get("reuse"):
        shutil.copy(shot["reuse"], out)
        return shot["id"], "reused", 0.0
    body = {"model": "gpt-image-2", "prompt": style + " " + shot["prompt"], "size": "16:9", "resolution": "1k"}
    urls = [refs[r] for r in shot.get("refs", [])]
    if urls:
        body["image_urls"] = urls
    with tempfile.NamedTemporaryFile("w", suffix=".json", delete=False) as f:
        json.dump(body, f)
    p = subprocess.run(["treg", "call", TOOL, "--method", "POST", "--data", f"@{f.name}", "--await", "--timeout", "900"],
                       capture_output=True, text=True)
    err = re.sub(r"\x1b\[[0-9;]*m", "", p.stderr)
    cost = sum(float(x) for x in re.findall(r"charged \$([\d.]+)", err))
    try:
        url = json.loads(p.stdout)["output"]["image_urls"][0]
    except Exception:
        return shot["id"], "FAILED (no result): " + (err.strip().splitlines() or ["?"])[-1][:200], cost
    # Record the URL first: a paid result must never be lost to a download hiccup.
    with open(out_dir / "result_urls.jsonl", "a") as f:
        f.write(json.dumps({"id": shot["id"], "url": url}) + "\n")
    # curl, not urllib: some result hosts refuse Python's default user agent (HTTP 403).
    d = subprocess.run(["curl", "-sSfL", "--retry", "3", "-o", str(out), url], capture_output=True, text=True)
    if d.returncode != 0:
        return shot["id"], f"DOWNLOAD FAILED (url saved in result_urls.jsonl): {d.stderr.strip()[:150]}", cost
    return shot["id"], "ok", cost


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("shots")
    ap.add_argument("out_dir", type=Path)
    ap.add_argument("--workers", type=int, default=6)
    ap.add_argument("--only", help="comma-separated shot ids")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()
    spec = json.loads(Path(a.shots).read_text())
    shots = spec["shots"]
    if a.only:
        keep = set(a.only.split(","))
        shots = [s for s in shots if s["id"] in keep]
    a.out_dir.mkdir(parents=True, exist_ok=True)
    todo = [s for s in shots if not (a.out_dir / f"{s['id']}.png").exists() and not s.get("reuse")]
    print(f"{len(shots)} shots, {len(todo)} to generate (~${len(todo) * 0.03:.2f} at $0.03 each)")
    if a.dry_run:
        return
    total = 0.0
    with ThreadPoolExecutor(a.workers) as ex, open(a.out_dir / "gen_log.jsonl", "a") as log:
        futs = [ex.submit(generate, s, spec["style"], spec.get("refs", {}), a.out_dir) for s in shots]
        for fut in as_completed(futs):
            sid, status, cost = fut.result()
            total += cost
            log.write(json.dumps({"id": sid, "status": status, "cost": cost}) + "\n")
            log.flush()
            print(f"{sid}: {status}  (running total ${total:.2f})", flush=True)


if __name__ == "__main__":
    main()
