#!/usr/bin/env python3
"""Make the small WebP copies that pages offer through srcset.

Run from the repository root after adding or replacing a JPEG in assets/:
    python3 tools/make-webp.py
Every JPEG gets a full-size WebP (<name>.webp). Publication and project
thumbnails also get a 400 px copy, and simulation posters and research figures
a 640 px copy (<name>.<width>.webp). Existing copies are rebuilt. Needs Pillow.
"""
from pathlib import Path
from PIL import Image

WIDTHS = {'publications': 400, 'projects': 400, 'media': 640, 'research': 640}

for folder, width in WIDTHS.items():
    for src in sorted(Path('assets', folder).glob('*.jpg')):
        im = Image.open(src).convert('RGB')
        full = src.with_suffix('.webp')
        im.save(full, 'WEBP', quality=75, method=6)
        print(f'{full}  {src.stat().st_size // 1024} KB -> {full.stat().st_size // 1024} KB')
        if im.width > width:
            im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
        out = src.with_name(f'{src.stem}.{width}.webp')
        im.save(out, 'WEBP', quality=75, method=6)
        print(f'{out}  {src.stat().st_size // 1024} KB -> {out.stat().st_size // 1024} KB')
