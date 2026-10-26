// comun: etiquetas con fondo propio y línea guía que se dibuja. etiquetas([[inicio,fin,'TEXTO','bad'?], ...])
function etiquetas(LB){
  const lb=document.getElementById('lbls');
  LB.forEach(([a,b,txt,c])=>{
    const col=c==='bad'?'var(--bad)':'var(--amber)';
    const e=document.createElement('div');e.className='lb';e.textContent=txt;e.style.color=col;
    const l=document.createElement('div');l.className='lbl-line';l.style.background=col;
    const n=document.createElement('div');n.className='lbl-node';n.style.background=col;
    lb.append(l,n,e);sfx(a+.05,c==='bad'?'error':'tick',c==='bad'?.8:.8);
    tl.fromTo(l,{scaleY:0},{scaleY:1,duration:.3,ease:'power2.out'},Math.max(0,a-.2))
      .fromTo(n,{scale:0},{scale:1,duration:.2,ease:'back.out(2)'},a+.05)
      .fromTo(e,{autoAlpha:0},{autoAlpha:1,duration:.25},a)
      .to(e,{autoAlpha:0,duration:.2},b).to(l,{scaleY:0,duration:.2},b).to(n,{scale:0,duration:.15},b);
  });
}
