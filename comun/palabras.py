"""Palabras clave con recuadro: lista fija + regla por cláusula.
1) Si la cláusula tiene palabras de la lista (máx. 2), se marcan esas.
2) Si no, se marca la palabra de contenido más larga (>=5 letras, que no sea conector).
3) Si solo hay conectores («Por eso,», «Sin embargo,») no se marca nada."""
import re
STOP=set("""a al algo ante aun aunque cada como con cual cuando de del desde donde el ella ellos en entre era es esa ese eso esta este esto
estos fue ha hay la las le les lo los mas más me mi muy ni no nos o otra otro para pero por porque que qué se sea ser si sí sin sobre son su
sus te tiene tienen todo todos tu tus un una uno unos y ya yo embargo entonces además luego tanto modo""".split())
def limpia(w): return re.sub(r'[^\wáéíóúüñ]','',w.lower())
def marcar(caps,claves,max_lista=2,min_letras=5):
    cls,cur=[],[]
    for c in caps:
        cur.append(c)
        if c.get('f'): cls.append(cur);cur=[]
    if cur: cls.append(cur)
    res=[]
    for c in cls:
        idx=[i for i,x in enumerate(c) if limpia(x['w']) in claves][:max_lista]; origen='lista'
        if not idx:
            cand=[(len(limpia(x['w'])),-i) for i,x in enumerate(c) if limpia(x['w']) not in STOP and len(limpia(x['w']))>=min_letras]
            if cand: idx=[-max(cand)[1]]; origen='regla'
            else: origen='ninguna'
        for i in idx: c[i]['w']='['+c[i]['w']+']'
        res.append((origen,' '.join(x['w'] for x in c),[c[i]['w'] for i in idx]))
    return res
