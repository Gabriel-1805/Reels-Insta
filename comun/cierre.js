// comun: cierre. «Sígueme» → aparece el perfil; «envíaselo» → hoja de compartir; «amigo» → se elige un contacto; después «Enviado».
// Los tiempos salen de las palabras reales de CAPS (si no las encuentra, usa valores de reserva).
(()=>{
  const limpia=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\W/g,'').toLowerCase();
  const cuando=(re,def)=>{const x=CAPS.find(c=>re.test(limpia(c.w)));return x?x.s:def;};
  const tS=cuando(/^(sigueme|seguime)/,CTA+.1), tE0=cuando(/^enviaselo/,tS+1.2), tA0=cuando(/^amigo/,tE0+1.5);
  // si la voz va muy rápida, cada paso espera a que el anterior se vea (≥ 1 s para el perfil, ≥ 0,9 s para elegir contacto)
  const tE=Math.max(tE0,tS+1.3), tA=Math.max(tA0,tE+1.05), tSend=Math.min(tA+.9,TOT-1.0);
  // avatares originales, alternando chico / chica
  const AV=[['chico','#f2c9a5','#2b1b14','#4B5BFF','Mati'],['chica','#8d5a3b','#1c1c1c','#FFB703','Sofi'],['chico','#e0ac82','#6b3f1d','#2fb8a3','Nacho'],['chica','#f2c9a5','#a0522d','#e0556f','Vale']];
  const cara=(t,piel,pelo,camisa)=>`<svg viewBox="0 0 100 100" width="140" height="140"><circle cx="50" cy="50" r="50" fill="#2b3148"/>${t==='chica'?`<path d="M20 78 Q14 26 50 20 Q86 26 80 78 Z" fill="${pelo}"/>`:''}<ellipse cx="50" cy="98" rx="34" ry="26" fill="${camisa}"/><rect x="43" y="60" width="14" height="14" rx="5" fill="${piel}"/><circle cx="50" cy="46" r="21" fill="${piel}"/>${t==='chica'?`<path d="M29 44 Q50 14 71 44 Q50 34 29 44Z" fill="${pelo}"/>`:`<path d="M28 44 Q28 22 50 22 Q72 22 72 44 Q62 34 50 36 Q38 34 28 44Z" fill="${pelo}"/>`}<circle cx="43" cy="48" r="2.6" fill="#1a1410"/><circle cx="57" cy="48" r="2.6" fill="#1a1410"/><path d="M43 56 Q50 62 57 56" stroke="#1a1410" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`;
  const am=document.getElementById('amigos');
  AV.forEach((a,i)=>{const d=document.createElement('div');d.className='amigo';d.style.left=(12+i*225)+'px';d.innerHTML=`<div class="circ">${cara(a[0],a[1],a[2],a[3])}</div><b>${a[4]}</b>`+(i===0?'<div id="chk">✓</div>':'');am.appendChild(d);});
  const ring=(id,t0)=>tl.fromTo(id,{scale:.2,opacity:1},{scale:1.4,opacity:0,duration:.6},t0);
  // llegada: viene del zoom-through de la escena anterior
  tl.from('#mock',{scale:1.45,opacity:0,filter:'blur(10px)',duration:.8,ease:'power3.out'},CTA);
  // «Sígueme»: aparece el perfil y el botón pasa a «Siguiendo»
  tl.from('#perfil',{y:40,opacity:0,duration:.5,ease:'back.out(1.6)'},Math.max(CTA+.2,tS));
  ring('#ringS',tS+.55);
  tl.to('#sig1',{opacity:0,duration:.15},tS+.6).to('#sig2',{opacity:1,duration:.15},tS+.6).to('#seguir',{backgroundColor:'#3a3f5c',borderColor:'#3a3f5c',duration:.2},tS+.6);
  // «envíaselo»: se toca el icono de compartir y sube la hoja
  ring('#ringI',tE-.35);
  tl.to('#ico3',{scale:1.3,stroke:'#FFB703',duration:.2},tE-.35).to('#ico3',{scale:1,duration:.2},tE-.15);
  tl.fromTo('#hoja',{y:700},{y:0,duration:.6,ease:'power3.out'},tE-.15).from('.amigo',{scale:0,duration:.3,stagger:.08},tE+.35);
  // «amigo»: se elige el primer contacto; luego Enviar → Enviado
  ring('#ringA',tA);
  tl.to('#chk',{opacity:1,duration:.25},tA+.15);
  ring('#ringE',tSend);
  tl.to('#env1',{opacity:0,duration:.15},tSend+.3).to('#env2',{opacity:1,duration:.15},tSend+.3).to('#enviar',{backgroundColor:'#3a3f5c',duration:.2},tSend+.3);
})();
