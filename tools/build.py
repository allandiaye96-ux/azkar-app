# -*- coding: utf-8 -*-
import json, re, sys
sys.path.insert(0,'/tmp/work')
import entries1, entries2, entries3, entries4
from entries1 import ENT
items={i['n']:i for i in json.load(open('/tmp/work/items.json',encoding='utf-8'))}

CATS=[('matin_soir','Matin et soir','☀️'),('apres_priere','Après la prière','🕌'),('coucher','Coucher et nuit','🌙'),
('reveil','Réveil','🌅'),('purete','Toilettes et ablutions','💧'),('maison','Maison et vêtements','🏠'),
('mosquee','Mosquée et appel à la prière','📢'),('priere','Pendant la prière','🤲'),('dhikr','Dhikr et istighfar','📿'),
('epreuves','Épreuves, angoisse et protection','🛡️'),('repas','Repas et jeûne','🍽️'),('voyage','Voyage et déplacements','🧭'),
('quotidien','Vie quotidienne et relations','🤝'),('meteo','Pluie, vent et lune','🌧️'),('malade','Malades et défunts','🕊️')]

COLL={'bukhari':'Al-Bukhari','muslim':'Muslim','abudawud':'Abu Dawud','tirmidhi':'At-Tirmidhi','nasai':"An-Nasa'i",'ibnmajah':'Ibn Majah'}
RUB=r'(?:مرات|مرّات|مرة|ثلاثاً|ثلاثا|ثَلاثاً|ثلاث|أربع|عشر|سبع|مائة|مئة|وثلاثين)'
def clean_ar(s):
    s=s.replace('\r','')
    lines=[l.strip() for l in s.split('\n')]
    out=[];soir=[];mode=out
    for l in lines:
        if not l: continue
        if re.match(r'^(وإذا أمس|وَإِذَا أَمْس|وإذا أمسي|وإذا أمسى)',l): mode=soir; continue
        bare=re.sub(r'[\u064B-\u065F\u0670\u0640]','',l)
        if bare.startswith('(') and re.search(RUB,bare) and bare.rstrip().endswith(')') and bare.count('(')==1: continue
        l=re.sub(r'\((?:[^()]*)\)',lambda m: '' if re.search(RUB,re.sub(r'[\u064B-\u065F\u0670\u0640]','',m.group(0))) else m.group(0),l).strip()
        if l: mode.append(l)
    def q(t):
        t=t.replace('((','﴿').replace('))','﴾').replace('{','﴿').replace('}','﴾')
        t=re.sub(r'\s*\*\s*',' ',t)
        return re.sub(r'\s+',' ',t).strip()
    return q(' '.join(out)), (q(' '.join(soir)) or None)
def clean_tr(s):
    s=re.sub(r'[\(\[][^)\]]*(?:times|Recite|three|each said)[^)\]]*[\)\]]','',s,flags=re.I)
    s=re.sub(r'\s*\n\s*',' ',s)
    return re.sub(r'\s+',' ',s).strip()
SRC=r"(Al-Bukhari|Bukhari|Muslim|Abu ?Dawud|At-Tirmidhi|An-Nasa'i|Ibn Majah|Ahmad|Al-Hakim|Ibn Hibban|Ibn As-Sunni|At-Tabarani|Al-Bayhaqi|Ad-Darimi|Ibn Khuzaymah|Malik|Al-Muwatta')"
def parse_refs(r):
    r=re.sub(r"(Sahih|Sahihul|Sahihut|Silsilat|Mukhtasar|Sharh)[A-Za-z'\- ]{0,30}?(At-\s?Tirmidhi|Tirmidhi|Abu Dawud|Ibn M[aā]jah|Ibn Mdjah|An-Nasa'i|Al-'Adab[A-Za-z\- ]*)[\s,]*[\d/ ,()no.]*","",r)
    r=r.replace("AbuDawud","Abu Dawud")
    out=[]
    for m in re.finditer(SRC+r"((?:(?!"+SRC.replace('(','(?:',1)+r")[^;\d]){0,45})((?:\d+\s*/\s*\d+(?:[-–]\d+)?)|(?:no\.?\s*\d+))?",r):
        name=m.group(1)
        if name=='Bukhari': name='Al-Bukhari'
        mid=m.group(2) or ''; loc=(m.group(3) or '')
        loc=re.sub(r'\s+','',loc).replace('no.','n°')
        if loc.startswith('n°'): loc='n° '+loc[2:]
        if 'Fath' in mid and loc: lab=f"{name} (Fath al-Bari {loc})"
        elif "'Amal" in mid and loc: lab=f"{name}, 'Amal al-yawm wal-layla {loc}"
        else: lab=(name+' '+loc).strip()
        if lab not in out: out.append(lab)
    return out[:8]

Q=json.load(open('/tmp/ref/quranjson/data/tanzil/simple.json',encoding='utf-8'))
def vv(c,a,b):
    AN=str.maketrans('0123456789','٠١٢٣٤٥٦٧٨٩')
    return ' '.join(v['text']+'\u00a0﴿'+str(v['verse']).translate(AN)+'﴾' for v in Q[str(c)] if a<=v['verse']<=b)
TAAWWUDH='أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ'
QURAN={'75':TAAWWUDH+'\n'+vv(2,255,255),'71':vv(2,255,255),'100':vv(2,255,255),
 '76':'\n'.join(vv(c,1,99) for c in (112,113,114)),'70':'\n'.join(vv(c,1,99) for c in (112,113,114)),'99':'\n'.join(vv(c,1,99) for c in (112,113,114)),
 '101':vv(2,285,286),'4':vv(3,190,200),'135':vv(57,3,3)}
RN=[a['text'] for c in json.load(open('/tmp/ref/adhkar-json/adhkar.json',encoding='utf-8')) for a in c['array']]
def rn(needle):
    t=next(x for x in RN if needle in x)
    t=re.sub(r'\((?:[^()]*)\)\s*\.?$','',t.strip()).strip()   # rubrique finale
    return re.sub(r'\s+',' ',t.replace('((','').replace('))','')).strip(' .')
azkar=[];seen=set()
for e in ENT:
    n=e['n']; it=items.get(n)
    if e['ar'] and e['ar'].startswith('@'):
        src=items[e['ar'][1:]]; ar,ars=clean_ar(src['arabic']); tr=clean_tr(src['translit'])
    else:
        ar,ars=(e['ar'],e['ars']) if e['ar'] else clean_ar(it['arabic'])
        if e['ars']: ars=e['ars']
        tr=e['tr'] or clean_tr(it['translit'])
    if tr and (tr.startswith('[') or len(tr)<2): tr=clean_tr(it['translit'])
    if n=='74':
        a=it['arabic']; k=re.search('ستخير',a).start(); k=a.rfind('الل',0,k); ar=re.sub(r'\s+',' ',a[k:]).strip(); j=re.search(r'رض[ِ]?ن[ِ]?ي ب[ِ]?ه[ِ]?',ar); ar=ar[:j.end()] if j else ar
        t=it['translit']; tr=clean_tr(t[t.find('Allāhumm'):])
    if n=='217':
        a=re.sub(r'\s+',' ',it['arabic']); ar=a.split('يَقُولُ:',1)[-1].strip()
        mm=it['meaning']; tr=mm[:mm.find('waḥdah.')+7] if 'waḥdah.' in mm else tr
    if n=='138': ar=ar.split('، وَاتْفُلْ')[0].split(' وَاتْفُلْ')[0]
    if n=='82': ar=rn('عَافِنِي فِي بَدَنِي')
    if n=='90':
        ar=ar.replace('[أَمْسَـينا]','').replace('  ',' '); ars=ar.replace('أَصْـبَحْنا','أَمْسَيْنا',1)
    quran = n in QURAN
    if quran: ar=QURAN[n]; ars=None
    zid=e['id'] or ('z'+n)
    assert zid not in seen, zid; seen.add(zid)
    ver=[dict(label=f"{COLL[c]} n°{k}",url=f"https://sunnah.com/{c}:{k}") for c,k in e['v'] if k]
    azkar.append(dict(id=zid,cat=e['g'],title=e['t'],arabic=ar,arabicSoir=ars,translit=tr,fr=e['fr'],count=e['c'],when=e['w'],
        benefit=e['b'],quran=quran,note=e['note'],warn=e['warn'],hisn=n,hisnUrl=f"https://sunnah.com/hisn:{n}",
        refs=parse_refs(it['ref']) if it else [],verified=ver,refNote=it['ref'][:600] if it else ''))
cats=[dict(id=a,label=b,icon=c,count=sum(1 for z in azkar if z['cat']==a)) for a,b,c in CATS]
assert all(z['cat'] in {c['id'] for c in cats} for z in azkar)
js=("// Données générées à partir de Hisn al-Muslim (Sa'id al-Qahtani) — texte arabe et références de l'ouvrage,\n"
    "// traductions françaises rédigées pour l'application, numéros de hadith vérifiés listés dans `verified`.\n"
    "export const categories = "+json.dumps(cats,ensure_ascii=False,indent=1)+";\n\nexport const azkar = "+json.dumps(azkar,ensure_ascii=False,indent=1)+";\n")
open(sys.argv[1],'w',encoding='utf-8').write(js)
print(len(azkar),'azkar'); [print(c['id'],c['count']) for c in cats]
