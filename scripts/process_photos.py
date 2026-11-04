"""Resize campus photos into responsive WebP + JPEG and write src/data/photos.json.

Usage: python3 scripts/process_photos.py photos/manifest.json
manifest.json maps a slot key to its source photo:
  { "hero": { "src": "/path/to/IMG_0001.jpg", "alt": "...", "focus": "50% 40%", "credit": "..." } }
EXIF orientation is applied and all metadata (incl. GPS) is stripped on export.
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public/photos"
WIDTHS = [640, 1280, 1920]

manifest = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
OUT.mkdir(parents=True, exist_ok=True)
data = {}
for key, spec in manifest.items():
    im = ImageOps.exif_transpose(Image.open(spec["src"])).convert("RGB")
    widths = [w for w in WIDTHS if w < im.width] + [min(im.width, WIDTHS[-1])]
    widths = sorted(set(widths))
    for w in widths:
        h = round(im.height * w / im.width)
        r = im.resize((w, h), Image.LANCZOS)
        r.save(OUT / f"{key}-{w}.webp", "WEBP", quality=78, method=6)
        r.save(OUT / f"{key}-{w}.jpg", "JPEG", quality=80, optimize=True, progressive=True)
    big = widths[-1]
    entry = {"file": key, "widths": widths, "w": big, "h": round(im.height * big / im.width), "alt": spec["alt"]}
    for k in ("focus", "credit"):
        if spec.get(k):
            entry[k] = spec[k]
    data[key] = entry
    print(f"{key}: {im.width}x{im.height} -> {widths}")

(ROOT / "src/data/photos.json").write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"{len(data)} photos written")
