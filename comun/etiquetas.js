// comun: etiquetas con fondo propio. etiquetas([[inicio,fin,'TEXTO','bad'?], ...])
function etiquetas(LB){
  const lb=document.getElementById('lbls');
  LB.forEach(([a,b,txt,c])=>{const e=document.createElement('div');e.textContent=txt;e.style.color=c==='bad'?'var(--bad)':'var(--amber)';lb.appendChild(e);tl.fromTo(e,{autoAlpha:0},{autoAlpha:1,duration:.25},a).to(e,{autoAlpha:0,duration:.2},b);});
}
