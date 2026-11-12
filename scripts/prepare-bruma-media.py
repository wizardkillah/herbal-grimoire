"""Prepare Bruma's portraits and clips from the green-screen originals (the "Merlin" cat set).

Usage, from the project root:
    python scripts/prepare-bruma-media.py "C:/ruta/a/Imagenes Merlin"

Stills become transparent WebP; clips become WebM with an alpha channel (VP9), cropped to a square
around the cat. Needs Pillow and the ffmpeg binary kept under .media-review/tools.
"""
from pathlib import Path
import json
import subprocess
import sys

from PIL import Image

source = Path(sys.argv[1])
out = Path('public/media/bruma')
out.mkdir(parents=True, exist_ok=True)
ffmpeg = next(Path('.media-review/tools').rglob('ffmpeg*.exe'))

# Pose -> ending of the original file name.
STILLS = {
    'calma': 'e2501677.png',
    'habla': '5bf23c46.png',
    'piensa': '701c8b6b.png',
    'saluda': '7a5b44f8.png',
    'duerme': 'd6bb3bb5.png',
    'camina': 'b6c22377.png',
}
# Pose -> (ending of the original file name, left edge and width of the 720 px tall crop).
CLIPS = {
    'calma': ('2181c0dd.mp4', 400, 720),
    'habla': ('daa6636e.mp4', 280, 720),
    'piensa': ('c868f086.mp4', 300, 720),
    'saluda': ('8eeca1f4.mp4', 380, 720),
    'duerme': ('626b3da4.mp4', 140, 1000),
    'camina': ('5aa984d6.mp4', 200, 860),
}
ICON = '5ebc90b9.png'


def find(ending):
    return next(path for path in source.iterdir() if path.name.endswith(ending))


def backdrop(image):
    """Average colour of the top-left corner, as the hex key for ffmpeg."""
    red, green, blue = image.convert('RGB').crop((8, 8, 40, 40)).resize((1, 1), Image.BOX).getpixel((0, 0))
    return f'0x{red:02x}{green:02x}{blue:02x}'


def keying(color):
    return f'chromakey={color}:0.16:0.10,despill=type=green:mix=0.6:expand=0.1'


manifest = []
for pose, ending in STILLS.items():
    original = find(ending)
    keyed = out / '_keyed.png'
    subprocess.run([str(ffmpeg), '-hide_banner', '-loglevel', 'error', '-y', '-i', str(original), '-vf', f'{keying(backdrop(Image.open(original)))},format=rgba', '-frames:v', '1', str(keyed)], check=True)
    image = Image.open(keyed).convert('RGBA')
    image = image.crop(image.getchannel('A').point(lambda v: 255 if v > 24 else 0).getbbox())
    keyed.unlink()
    image.thumbnail((520, 520), Image.LANCZOS)
    target = out / f'{pose}.webp'
    image.save(target, 'WEBP', quality=88, method=6)
    manifest.append({'asset': f'bruma/{target.name}', 'source': original.name, 'bytes': target.stat().st_size})
    print(f'{target.name}: {image.size} {target.stat().st_size / 1024:.0f} KB', flush=True)

for pose, (ending, left, width) in CLIPS.items():
    original = find(ending)
    # Sample the backdrop colour from the top-left corner of the first frame.
    probe = out / '_probe.png'
    subprocess.run([str(ffmpeg), '-hide_banner', '-loglevel', 'error', '-y', '-i', str(original), '-frames:v', '1', str(probe)], check=True)
    color = backdrop(Image.open(probe))
    probe.unlink()
    target = out / f'{pose}.webm'
    # The clip backdrops are a duller green than the stills, so they are keyed by RGB distance: a chroma key would also remove the black fur.
    filters = f'crop={width}:720:{left}:0,colorkey={color}:0.27:0.10,despill=type=green:mix=0.6:expand=0.1,scale=360:-2,format=yuva420p'
    subprocess.run([
        str(ffmpeg), '-hide_banner', '-loglevel', 'error', '-y', '-i', str(original), '-an', '-vf', filters, '-r', '24',
        '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p', '-crf', '34', '-b:v', '0', '-auto-alt-ref', '0', '-row-mt', '1', str(target),
    ], check=True)
    manifest.append({'asset': f'bruma/{target.name}', 'source': original.name, 'bytes': target.stat().st_size, 'duration': 5.04})
    print(f'{target.name}: key {color} {target.stat().st_size / 1024:.0f} KB', flush=True)

icon = Image.open(find(ICON)).convert('RGBA')
icon = icon.crop(Image.eval(icon.convert('L'), lambda v: 255 if v < 245 else 0).getbbox())
icon.thumbnail((192, 192), Image.LANCZOS)
icon.save(out / 'icono.png')
manifest.append({'asset': 'bruma/icono.png', 'source': find(ICON).name, 'bytes': (out / 'icono.png').stat().st_size})

manifest_path = Path('public/media/sources.json')
previous = [entry for entry in json.loads(manifest_path.read_text(encoding='utf-8')) if not entry['asset'].startswith('bruma/')]
manifest_path.write_text(json.dumps(previous + manifest, ensure_ascii=False, indent=2), encoding='utf-8')
