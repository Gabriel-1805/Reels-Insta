// comun: subtítulos karaoke. Usa CAPS = [{w,s,e,f}] (palabra, inicio, fin, fin de cláusula). Las [palabras] llevan recuadro.
const cap=document.getElementById('cap');
const G=[];let cur=[];
CAPS.forEach(x=>{cur.push(x);if(cur.length===3||x.f){G.push(cur);cur=[];}});
if(cur.length)G.push(cur);
G.forEach((g,gi)=>{
  const el=document.createElement('div');el.className='chunk';
  const sp=g.map(x=>{const s=document.createElement('span');s.textContent=x.w.replace(/[\[\]]/g,'');if(/\[.*\]/.test(x.w))s.className='key';el.appendChild(s);return s;});
  cap.appendChild(el);
  const s0=Math.max(0,g[0].s-0.08),nx=G[gi+1];
  const e0=Math.max(s0+.2,Math.min(g[g.length-1].e+0.25,nx?nx[0].s-0.02:1e9));
  tl.set(el,{autoAlpha:1},s0).set(el,{autoAlpha:0},e0);
  sp.forEach((s,j)=>tl.set(s,{color:'#fff',fontWeight:800},g[j].s));
});
