"""Encode extra workshop clips from the originals in `Grimorio Herbal/` into public/media.

Same settings as the first four clips: H.264, 960 px wide, 24 fps, no audio, progressive start.
Needs the ffmpeg binary kept under .media-review/tools. Run from the project root.
"""
from pathlib import Path
import json
import subprocess

root = Path('Grimorio Herbal')
out = Path('public/media')
ffmpeg = next(Path('.media-review/tools').rglob('ffmpeg*.exe'))
videos = json.loads(Path('.media-review/videos.json').read_text(encoding='utf-8'))

# Target file -> number in the review contact sheet (.media-review/videos.jpg).
selection = {
    'mago-mezcla-2.mp4': 4,
    'mago-mezcla-3.mp4': 12,
    'mago-logro-2.mp4': 1,
    'mago-logro-3.mp4': 14,
    'mago-ajuste.mp4': 15,
    'herbolaria-mezcla-2.mp4': 6,
    'herbolaria-mezcla-3.mp4': 10,
    'herbolaria-logro-2.mp4': 8,
    'herbolaria-ajuste.mp4': 5,
}

manifest_path = out / 'sources.json'
manifest = [entry for entry in json.loads(manifest_path.read_text(encoding='utf-8')) if entry['asset'] not in selection]
for target, number in selection.items():
    video = videos[number - 1]
    subprocess.run([
        str(ffmpeg), '-hide_banner', '-loglevel', 'error', '-y', '-i', str(root / video['file']),
        '-an', '-vf', 'scale=960:-2', '-r', '24', '-c:v', 'libx264', '-preset', 'slow', '-crf', '25',
        '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(out / target),
    ], check=True)
    size = (out / target).stat().st_size
    manifest.append({'asset': target, 'source': video['file'], 'bytes': size, 'duration': video['duration']})
    print(f'{target}: {size / 1024:.0f} KB', flush=True)

manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
