// comun: registro de señales de sonido. El audio se mezcla fuera del navegador (comun/sonido/mezclar.py) usando estos tiempos.
// sfx(tiempo,'nombre',volumen,duración?) · cam() y tilt() registran sus «whoosh» solos.
const CUES=[],CAMS=[];
const sfx=(t,n,v=1,d)=>{CUES.push({t:+t.toFixed(3),n,v:+v.toFixed(2),...(d?{d:+d.toFixed(2)}:{})});};
window.__cues=()=>{
  const out=CUES.slice();let z=1;
  CAMS.slice().sort((a,b)=>a.t-b.t).forEach(c=>{const dz=c.s-z;z=c.s;
    if(c.s>=20)out.push({t:+c.t.toFixed(3),n:'whoosh_through',v:1,d:+c.dur.toFixed(2)});
    else if(c.dur>=1&&Math.abs(dz)>.25)out.push({t:+c.t.toFixed(3),n:dz>0?'whoosh_in':'whoosh_out',v:+Math.min(1,.45+Math.abs(dz)/2).toFixed(2),d:+Math.min(c.dur,1.4).toFixed(2)});});
  return {tot:TOT,cues:out.sort((a,b)=>a.t-b.t)};
};
