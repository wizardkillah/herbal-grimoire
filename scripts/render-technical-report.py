"""Render the checked-in Markdown technical report as a standalone printable HTML."""
from pathlib import Path
import html,re
ROOT=Path(__file__).resolve().parent.parent
source=ROOT/'docs/Informe_Tecnico_Grimorio_Herbal.md'
def inline(text):
    text=html.escape(text)
    text=re.sub(r'`([^`]+)`',r'<code>\1</code>',text)
    text=re.sub(r'\*\*([^*]+)\*\*',r'<strong>\1</strong>',text)
    text=re.sub(r'\[([^]]+)\]\((https?://[^ )]+)\)',r'<a href="\2">\1</a>',text)
    return text
lines=source.read_text(encoding='utf-8').splitlines();out=[];toc=[];n=0
while n<len(lines):
 line=lines[n]
 if not line.strip():n+=1;continue
 if line.startswith('```'):
  chunk=[];n+=1
  while n<len(lines) and not lines[n].startswith('```'):chunk.append(lines[n]);n+=1
  out.append('<pre><code>'+html.escape('\n'.join(chunk))+'</code></pre>');n+=1;continue
 if line.startswith('|'):
  rows=[]
  while n<len(lines) and lines[n].startswith('|'):
   cells=[v.strip() for v in lines[n].strip().strip('|').split('|')]
   if not all(re.fullmatch(r'[: -]+',v) for v in cells):rows.append(cells)
   n+=1
  out.append('<div class="table-wrap"><table><thead><tr>'+''.join('<th>'+inline(c)+'</th>' for c in rows[0])+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+inline(c)+'</td>' for c in row)+'</tr>' for row in rows[1:])+'</tbody></table></div>');continue
 if line.startswith('#'):
  level=len(line)-len(line.lstrip('#'));text=line[level:].strip();id='section-'+str(len(toc)) if level==2 else 'title-'+str(n)
  out.append(f'<h{level} id="{id}">{inline(text)}</h{level}>')
  if level==2:toc.append((id,text))
  n+=1;continue
 if line.startswith('- '):
  items=[]
  while n<len(lines) and lines[n].startswith('- '):items.append('<li>'+inline(lines[n][2:])+'</li>');n+=1
  out.append('<ul>'+''.join(items)+'</ul>');continue
 paragraph=[]
 while n<len(lines) and lines[n].strip() and not lines[n].startswith(('#','|','```','- ')):
  paragraph.append(inline(lines[n]));n+=1
 out.append('<p>'+'<br>'.join(paragraph)+'</p>')
css="""*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#eaece4;color:#24362b;font:16px/1.7 Georgia,serif}header{background:#173126;color:#f4e9cb;padding:42px max(6vw,24px)}header small{font:12px system-ui;letter-spacing:3px;color:#c7c29b}header h1{font-size:40px;line-height:1.15;max-width:820px;margin:16px 0}header p{max-width:820px;color:#d0d7c5}header button{background:#dac78e;border:0;border-radius:6px;padding:12px 20px;cursor:pointer;color:#163025;font-weight:bold}main{display:grid;grid-template-columns:230px minmax(0,900px);gap:36px;max-width:1270px;margin:36px auto;padding:0 24px}nav{position:sticky;top:20px;align-self:start;font:13px/1.5 system-ui}nav a{display:block;padding:6px 0;color:#375b43;text-decoration:none}article{background:#fffdf6;padding:44px;border:1px solid #d1d8c6;border-radius:8px}article>h1{font-size:30px;line-height:1.2}h2{font:600 24px/1.3 system-ui;margin:42px 0 16px;color:#31583f;border-bottom:1px solid #bcc8b0;padding-bottom:12px}h3{font:600 19px/1.4 system-ui}a{color:#426646;overflow-wrap:anywhere}table{border-collapse:collapse;width:100%;font:13px/1.5 system-ui;margin:16px 0}th,td{border:1px solid #c5cebd;padding:11px;vertical-align:top}th{background:#e4eadb;text-align:left}tr:nth-child(even) td{background:#f5f7ef}.table-wrap{overflow-x:auto}pre{white-space:pre-wrap;background:#eaf0e1;padding:18px;border-radius:6px;font-size:12px;overflow-wrap:anywhere}code{font:12px/1.5 Consolas,monospace;overflow-wrap:anywhere}footer{text-align:center;padding:28px;font:12px system-ui;color:#61705c}@media(max-width:800px){main{display:block;padding:0 14px}nav{position:static;margin-bottom:24px}article{padding:22px}header h1{font-size:32px}}@page{size:A4;margin:18mm 16mm}@media print{body{background:white;font-size:10pt}header{background:white;color:#173126;padding:0;border-bottom:2px solid #496f4e;break-after:page}header p,header small{color:#40513f}header h1{font-size:32pt}header button,nav,footer{display:none}main{display:block;margin:0;padding:0}article{border:0;padding:0}h2{font-size:17pt;break-after:avoid}h3{break-after:avoid}p{orphans:3;widows:3}table{font-size:9pt}tr{break-inside:avoid}thead{display:table-header-group}.table-wrap{overflow:visible}a{color:inherit}pre{break-inside:avoid}}"""
page='<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Informe técnico · Grimorio Herbal</title><style>'+css+'</style></head><body><header><small>GRIMORIO HERBAL · DOCUMENTACIÓN DE PRODUCTO</small><h1>Un herbolario interactivo<br>con memoria y juego</h1><p>Informe técnico de arquitectura, catálogo, panel de Bruma, medios, validación y hoja de ruta.</p><p>13 de septiembre de 2026 · Prototipo local para PC y navegador</p><button onclick="window.print()">Imprimir / Guardar como PDF</button></header><main><nav aria-label="Índice del informe">'+''.join('<a href="#'+id+'">'+html.escape(t)+'</a>' for id,t in toc)+'</nav><article>'+''.join(out)+'</article></main><footer>Grimorio Herbal · Informe de implementación, no certificación clínica.</footer></body></html>'
(ROOT/'docs/Informe_Tecnico_Grimorio_Herbal.html').write_text(page,encoding='utf-8')
print('Informe HTML generado.')
