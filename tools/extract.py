import json,re,sys
b=json.load(open('/tmp/ref/4thel/hisnulmuslim/hisnulmuslim.json',encoding='utf-8'))
out=[]
for y in b:
    n=re.search(r'(\d+[a-z]?)\s*$',y['reference'].strip()).group(1)
    eng=y['english'].strip()
    pre,_,ref=eng.partition('Reference:')
    blocks=[x.strip() for x in re.split(r'\n\s*\n',pre) if x.strip()]
    translit=blocks[0] if blocks else ''
    meaning=' '.join(blocks[1:])
    out.append(dict(n=n,chapter=y['title'].replace('Chapter: ',''),arabic=y['arabic'].strip(),translit=translit,meaning=re.sub(r'\s+',' ',meaning),ref=re.sub(r'\s+',' ',ref).strip()))
json.dump(out,open('/tmp/work/items.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
print(len(out))
