"""Fetch attributed Wikimedia photographs for the educational ingredient catalogue.
Run from repository root. Existing downloads are cached; no runtime API dependency.
"""
import concurrent.futures, hashlib, html, json, re, time, urllib.parse, urllib.request
from pathlib import Path
from PIL import Image
ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / '.media-review' / 'ingredients'
DEST = ROOT / 'public' / 'media' / 'ingredients'
CACHE.mkdir(parents=True, exist_ok=True)
DEST.mkdir(parents=True, exist_ok=True)
UA = 'GrimorioHerbal/1.0 (educational image attribution; local prototype)'
SUBJECTS = {
'matico':'Buddleja globosa', 'cedron':'Aloysia citrodora', 'boldo':'Peumus boldus', 'muna':'Minthostachys mollis', 'canelo':'Drimys winteri',
'lavanda':'Lavandula angustifolia','calendula':'Calendula officinalis','jazmin':'Jasminum sambac','hibisco':'Hibiscus sabdariffa','romero':'Rosemary','jengibre':'Ginger','canela':'Cinnamon',
'naranja':'Orange (fruit)','maqui':'Aristotelia chilensis','miel':'Honey','rocio':'Drinking water','manzanilla':'Matricaria chamomilla','valeriana':'Valeriana officinalis','menta':'Peppermint','eucalipto':'Eucalyptus globulus','tomillo':'Thymus vulgaris','llanten':'Plantago major','bailahuen':'Haplopappus baylahuen','paico':'Dysphania ambrosioides','quillay':'Quillaja saponaria','ajo':'Garlic',
 'te_verde':'Green tea','te_negro':'Black tea','te_blanco':'White tea','te_oolong':'Oolong','rooibos':'Rooibos','mate':'Yerba mate','rosa_t':'Rosa × centifolia','azahar':'Orange blossom','lim_c':'Lemon','bergamota':'Bergamot orange','pomelo_c':'Grapefruit','cardamomo':'Elettaria cardamomum','anis_t':'Illicium verum','clavo_t':'Clove','pimienta_r':'Schinus molle','vanilla_t':'Vanilla planifolia','stevia_t':'Stevia rebaudiana','panela_t':'Panela',
'lim_o':'Lemon','nar_o':'Orange (fruit)','framb':'Raspberry','maracuya':'Passion fruit (fruit)','albahaca':'Ocimum basilicum','hierbabuena':'Spearmint',
'pisco':'Pisco','aguard':'Aguardiente','chicha':'Chicha','mosto':'Must','ron':'Rum','vodka':'Vodka','gin':'Gin','tequila':'Tequila','vino_t':'Red wine','vino_b':'White wine','cerveza_a':'Beer','kombucha':'Kombucha','limeta':'Lime (fruit)','pomelo_art':'Grapefruit','yuzu':'Yuzu','nar_am':'Bitter orange','mandarina':'Mandarin orange','hinojo':'Fennel','azafran':'Saffron','alc_neut':'Ethanol','grappa':'Grappa','agua_c':'Drinking water','cera':'Beeswax','alc_b':'Ethanol','vinagre':'Apple cider vinegar','a75':'Drinking water','a85':'Drinking water','a100':'Drinking water','leche':'Milk','leche_av':'Oat milk','lco_b':'Coconut milk','agua_f':'Drinking water','hielo':'Ice cube','jlim':'Lemon juice','jarabe':'Simple syrup','tonica':'Tonic water','jnar':'Orange juice','champan':'Champagne','cerveza_b':'Beer','ron_a':'Rum',
'melisa':'Melissa officinalis','ortiga':'Urtica dioica','ruda':'Ruta chalepensis','salvia':'Salvia officinalis','tilo':'Tilia cordata','una_gato':'Uncaria tomentosa','sangre_grado':'Croton lechleri','chanca_piedra':'Phyllanthus niruri','hercampuri':'Gentianella alborosea','maca':'Lepidium meyenii','yacon':'Smallanthus sonchifolius'}
def get(url):
    cache = CACHE / (hashlib.sha256(url.encode()).hexdigest() + '.json')
    if cache.exists(): return json.loads(cache.read_text(encoding='utf-8'))
    for attempt in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent':UA}), timeout=25) as r: value=json.load(r)
            cache.write_text(json.dumps(value, ensure_ascii=False), encoding='utf-8')
            return value
        except Exception:
            if attempt == 2: raise
            time.sleep(2 + attempt * 3)
def api(host, **params):
    return get('https://' + host + '/w/api.php?' + urllib.parse.urlencode({'action':'query','format':'json',**params}))
def plain(value): return html.unescape(re.sub('<[^>]+>', '', value or '')).strip()
def collect(subject, override=None):
    stage = 'page lookup'
    try:
        overrides = {'Quillaja saponaria': 'Quillaja saponaria kz01.jpg', 'Lepidium meyenii': 'Kluse - Lepidium meyenii - Maca 05 ies.jpg', 'Ethanol': 'Ethanol in hand.jpg', 'Uncaria tomentosa': 'Corteza y espina curva de uña de gato (Uncaria tomentosa).jpg'}
        reviewed = Path(__file__).resolve().parent.parent / 'src/game/ingredient-images.json'
        if reviewed.exists():
            overrides.update({v['subject']:v['file'] for v in json.loads(reviewed.read_text(encoding='utf-8')).values()})
        if override or subject in overrides:
            filename = override or overrides[subject]
        else:
            pages=api('en.wikipedia.org',titles=subject,redirects=1,prop='pageimages',piprop='original').get('query',{}).get('pages',{})
            page=next(iter(pages.values()))
            original=page.get('original',{}).get('source')
            if not original: return subject, {'error':'No page image'}
            filename=urllib.parse.unquote(urllib.parse.urlparse(original).path.split('/')[-1])
        stage = 'license metadata'
        pages=api('commons.wikimedia.org',titles='File:'+filename,prop='imageinfo',iiprop='url|size|extmetadata',iiurlwidth=960 if subject in ['Quillaja saponaria', 'Simple syrup', 'Uncaria tomentosa'] else 1280).get('query',{}).get('pages',{})
        file=next(iter(pages.values())); info=file.get('imageinfo',[{}])[0]; meta=info.get('extmetadata',{})
        license=plain(meta.get('LicenseShortName',{}).get('value'))
        if not info.get('url') or not license or any(x in license.lower() for x in ['fair use','non-free','nc','nd']):return subject, {'error':'Missing or unsupported license', 'file':filename, 'license':license}
        source=info.get('thumburl',info['url'])
        if '.svg' in source.lower(): return subject, {'error':'Not a photograph', 'file':filename}
        key=hashlib.sha256(info['url'].encode()).hexdigest()[:16]
        ext=urllib.parse.urlparse(source).path.rsplit('.',1)[-1].lower()
        if ext not in ['jpg','jpeg','png','webp']:return subject, {'error':'Unsupported format', 'file':filename}
        path=DEST / (key+'.'+ext)
        stage = 'download'
        valid = False
        if path.exists():
            try:
                with Image.open(path) as im: im.verify()
                valid = True
            except Exception: pass
        if not valid:
            time.sleep(4)
            try:
                with urllib.request.urlopen(urllib.request.Request(source,headers={'User-Agent':UA}),timeout=40) as r: path.write_bytes(r.read())
            except Exception:
                time.sleep(3)
                with urllib.request.urlopen(urllib.request.Request(info['url'],headers={'User-Agent':UA}),timeout=40) as r: path.write_bytes(r.read())
                info['thumbwidth'], info['thumbheight'] = info.get('width'), info.get('height')
        with Image.open(path) as im:
            im.load()
            actual_width, actual_height = im.size
        return subject, {'src':'/media/ingredients/'+path.name,'sourceUrl':info.get('descriptionurl'), 'originalUrl':info['url'],'author':plain(meta.get('Artist',{}).get('value')),'license':license,'licenseUrl':meta.get('LicenseUrl',{}).get('value',''),'width':actual_width,'height':actual_height,'description':plain(meta.get('ImageDescription',{}).get('value')), 'file':filename,'subject':subject}
    except Exception as error: return subject, {'error':str(error), 'stage':stage}
if __name__ == '__main__':
    out={}
    with concurrent.futures.ThreadPoolExecutor(max_workers=1) as pool:
        for subject, value in pool.map(collect, sorted(set(SUBJECTS.values()))):
            out[subject]=value
            print(subject + ': ' + value.get('error','OK'),flush=True)
            (CACHE/'subjects.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
    manifest={id:out[subject] for id,subject in SUBJECTS.items()}
    (CACHE/'candidates.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
    print('Coverage:',sum('src' in x for x in manifest.values()),'/',len(manifest))
