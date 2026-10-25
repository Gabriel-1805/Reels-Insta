// comun: polvo flotante + cámara virtual (focus, cam, blur) con paralaje del fondo
(()=>{let a=11;const r=()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
  const dust=document.getElementById('dust');
  for(let i=0;i<26;i++){const e=document.createElement('div');e.className='dot';const z=3+r()*5;e.style.cssText=`left:${r()*1080}px;top:${r()*1920}px;width:${z}px;height:${z}px;opacity:${.2+r()*.35}`;dust.appendChild(e);}})();
tl.to('.dot',{y:i=>-(120+(i%5)*70),duration:TOT,ease:'none'},0);
// focus(px,py,S): lleva el punto (px,py) del mundo al centro de la pantalla con zoom S
const focus=(px,py,S)=>({x:-S*(px-540),y:-S*(py-960),s:S,r:0});
const cl=(v,a)=>Math.max(-a,Math.min(a,v));
function cam(t0,dur,st,ease='power2.inOut'){
  const ps=Math.min(st.s,6);
  tl.to('#world',{x:st.x,y:st.y,scale:st.s,rotation:st.r,duration:dur,ease},t0)
    .to('#bg-grid',{x:cl(st.x*.25,220),y:cl(st.y*.25,220),scale:1+(ps-1)*.2,duration:dur,ease},t0)
    .to('#dust',{x:cl(st.x*.5,400),y:cl(st.y*.5,400),scale:1+(ps-1)*.4,duration:dur,ease},t0);
}
const blur=(t0,dur,px=7)=>tl.to('#world',{filter:`blur(${px}px)`,duration:dur/2,ease:'power1.out'},t0).to('#world',{filter:'blur(0px)',duration:dur/2,ease:'power1.in'},t0+dur/2);
// tilt(inicio,duración,{rx,ry,rz}): inclina el mundo en 3D (perspectiva) y activa la niebla de profundidad si hay inclinación
tl.set('#tilt',{transformPerspective:1400,rotationX:0,rotationY:0,rotationZ:0},0);
const tilt=(t0,dur,s,ease='power2.inOut')=>tl.to('#tilt',{rotationX:s.rx||0,rotationY:s.ry||0,rotationZ:s.rz||0,duration:dur,ease},t0).to('#fog',{opacity:s.rx?1:0,duration:dur,ease:'none'},t0);
// enganchar(inicio,{rx,ry,rz},dur): el mundo llega torcido y se endereza con un rebote suave (como al «fijar» las esquinas); deja la inclinación rx
function enganchar(t0,s,dur=1.0){tilt(t0,dur,s);return tl.to('#tilt',{rotationZ:0,rotationY:0,duration:.9,ease:'back.out(1.4)'},t0+dur+.1);}
