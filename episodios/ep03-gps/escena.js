// Ep. 03 · ¿Cómo sabe el GPS dónde estás? Todo dibujado con HTML/CSS (originales). Los tiempos salen de CL[k] (tiempos.json).
const M=document.getElementById('esc');
const D=(p,css,cls)=>{const e=document.createElement('div');e.style.cssText='position:absolute;'+css;if(cls)e.className=cls;p.appendChild(e);return e;};
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\W/g,'').toLowerCase();
const palabra=(re,desde,def)=>{const x=CAPS.find(c=>c.s>=desde-.02&&re.test(norm(c.w)));return x?x.s:(def??desde);};   // inicio de la primera palabra que cumple re desde el instante «desde»
const rnd=(s=>()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296})(11);
const COL={a:'#4B5BFF',b:'#FFB703',c:'#2fb8a3',d:'#e0556f'};
// ---------- mapa genérico: manzanas, calles y parques ----------
function mapa(parent,w,h,tono=1){
  const m=D(parent,`left:0;top:0;width:${w}px;height:${h}px;overflow:hidden;background:#0f1a3d`);const bl=[];
  const cw=64,ch=64;
  for(let r=0;r<Math.ceil(h/ch);r++)for(let c=0;c<Math.ceil(w/cw);c++){
    const park=rnd()<.12,bw=cw-14-rnd()*10,bh=ch-14-rnd()*10,x=c*cw+7,y=r*ch+7;
    D(m,`left:${x}px;top:${y}px;width:${bw}px;height:${bh}px;border-radius:10px;background:${park?'#16483f':'#1b2a5c'};opacity:${tono}`);bl.push([x+bw/2,y+bh/2,park]);}
  D(m,`left:0;top:${Math.round(h*.45)}px;width:${w}px;height:10px;background:#34458c;opacity:${tono}`);D(m,`left:${Math.round(w*.4)}px;top:0;width:10px;height:${h}px;background:#34458c;opacity:${tono}`);
  m.bl=bl;return m;
}
// ---------- punto azul con anillos de pulso ----------
function punto(parent,x,y,k){
  const ani=[0,1,2].map(()=>D(parent,`left:${x-16*k}px;top:${y-16*k}px;width:${32*k}px;height:${32*k}px;border:${4*k}px solid #4B8BFF;border-radius:50%;opacity:0`));
  const dot=D(parent,`left:${x-14*k}px;top:${y-14*k}px;width:${28*k}px;height:${28*k}px;border:${5*k}px solid #fff;border-radius:50%;background:#2f6bff;box-shadow:0 0 ${18*k}px #2f6bff;opacity:0`);
  return{dot,ani};
}
// ---------- personajes de formas redondeadas (originales): cabeza grande, ojos ovalados, sonrisa pequeña, mejilla, manos redondas ----------
function bola(id,cx,cy,o){
  const k=o.k||1,g=D(M,`left:${cx}px;top:${cy}px;width:0;height:0`);g.id=id;
  if(o.piernas){D(g,`left:${-44*k}px;top:${180*k}px;width:${40*k}px;height:${170*k}px;border-radius:${20*k}px;background:${o.pantalon||'#2a3a7a'}`);D(g,`left:${4*k}px;top:${180*k}px;width:${40*k}px;height:${170*k}px;border-radius:${20*k}px;background:${o.pantalon||'#2a3a7a'}`);
    D(g,`left:${-54*k}px;top:${336*k}px;width:${56*k}px;height:${20*k}px;border-radius:${12*k}px;background:#141b3d`);D(g,`left:${2*k}px;top:${336*k}px;width:${56*k}px;height:${20*k}px;border-radius:${12*k}px;background:#141b3d`);}
  const bI=D(g,`left:${-96*k}px;top:${84*k}px;width:${34*k}px;height:${130*k}px`),bD=D(g,`left:${62*k}px;top:${84*k}px;width:${34*k}px;height:${130*k}px`);
  for(const b of[bI,bD]){D(b,`left:0;top:0;width:${34*k}px;height:${100*k}px;border-radius:${17*k}px;background:${o.ropa}`);D(b,`left:0;top:${96*k}px;width:${34*k}px;height:${34*k}px;border-radius:50%;background:${o.piel}`);}
  D(g,`left:${-66*k}px;top:${66*k}px;width:${132*k}px;height:${160*k}px;border-radius:${60*k}px ${60*k}px ${46*k}px ${46*k}px;background:${o.ropa}`);
  const cab=D(g,'left:0;top:0;width:0;height:0');
  D(cab,`left:${-56*k}px;top:${-56*k}px;width:${112*k}px;height:${112*k}px;border-radius:50%;background:${o.piel}`);
  D(cab,`left:${-60*k}px;top:${-62*k}px;width:${120*k}px;height:${62*k}px;border-radius:${60*k}px ${60*k}px ${22*k}px ${22*k}px;background:${o.pelo}`);
  for(const x of[-30,16])D(cab,`left:${x*k}px;top:${-4*k}px;width:${14*k}px;height:${19*k}px;border-radius:50%;background:#1a1410`);
  const ce=[-31,15].map(x=>D(cab,`left:${x*k}px;top:${-22*k}px;width:${16*k}px;height:${5*k}px;border-radius:${3*k}px;background:#1a1410`));
  const boca=D(cab,`left:${-13*k}px;top:${24*k}px;width:${26*k}px;height:${12*k}px;border-bottom:${4*k}px solid #7a3b3b;border-radius:0 0 ${26*k}px ${26*k}px`);
  D(cab,`left:${26*k}px;top:${18*k}px;width:${16*k}px;height:${12*k}px;border-radius:50%;background:rgba(240,110,110,.35)`);
  tl.set(cab,{transformOrigin:'50% 100%'},0);
  return{g,cab,bI,bD,ce,boca,k};
}
// ---------- celular de frente con pantalla ----------
function celular(id,cx,cy,k){
  const t=D(M,`left:${cx-190*k}px;top:${cy-360*k}px;width:${380*k}px;height:${720*k}px;border-radius:${54*k}px;background:#141b3d;border:${6*k}px solid #3d4a95`);t.id=id;
  const p=D(t,`left:${12*k}px;top:${12*k}px;width:${344*k}px;height:${684*k}px;border-radius:${38*k}px;overflow:hidden;background:#0b0f24`);
  D(t,`left:${135*k}px;top:${20*k}px;width:${100*k}px;height:${22*k}px;border-radius:${11*k}px;background:#05070f;z-index:3`);
  return{t,p,cx,cy,k};
}
// ---------- satélite ----------
function sat(cx,cy,k,color){
  const g=D(M,`left:${cx}px;top:${cy}px;width:0;height:0`);
  for(const s of[-1,1])D(g,`left:${s>0?46*k:-136*k}px;top:${-18*k}px;width:${90*k}px;height:${36*k}px;border-radius:${6*k}px;background:repeating-linear-gradient(90deg,#3a52d8 0 ${14*k}px,#1d2b78 ${14*k}px ${16*k}px);border:${2*k}px solid #7f8fff`);
  D(g,`left:${-46*k}px;top:${-32*k}px;width:${92*k}px;height:${64*k}px;border-radius:${16*k}px;background:${color};border:${3*k}px solid #ffffff55`);
  D(g,`left:${-6*k}px;top:${-48*k}px;width:${12*k}px;height:${20*k}px;background:#cfd5ee`);D(g,`left:${-10*k}px;top:${-58*k}px;width:${20*k}px;height:${20*k}px;border-radius:50%;background:#fff`);
  return g;
}
const pin=(x,y,c)=>{const g=D(M,`left:${x}px;top:${y}px;width:0;height:0;opacity:0`);D(g,`left:-16px;top:-44px;width:32px;height:32px;border-radius:50%;background:${c};border:5px solid #fff`);D(g,'left:-11px;top:-14px;width:0;height:0;border-left:11px solid transparent;border-right:11px solid transparent;border-top:20px solid #fff');return g;};
const flecha=(x,y,len,ang,c)=>{const g=D(M,`left:${x}px;top:${y}px;width:0;height:0;opacity:0`);D(g,`left:0;top:-5px;width:${len-18}px;height:10px;border-radius:5px;background:${c}`);D(g,`left:${len-22}px;top:-16px;width:0;height:0;border-top:16px solid transparent;border-bottom:16px solid transparent;border-left:26px solid ${c}`);tl.set(g,{rotation:ang,transformOrigin:'0 50%'},0);return g;};
const equis=(x,y,s=120,c='#FF5A5F')=>{const e=D(M,`left:${x-s/2}px;top:${y-s/2}px;width:${s}px;height:${s}px;line-height:${s}px;text-align:center;font-size:${s}px;font-weight:800;color:${c};opacity:0`);e.textContent='✕';return e;};
const txt=(x,y,s,c,t,w=400)=>{const e=D(M,`left:${x-w/2}px;top:${y}px;width:${w}px;text-align:center;font-size:${s}px;font-weight:800;color:${c};opacity:0;white-space:nowrap`);e.textContent=t;return e;};
// =============== ESCENARIO A: celular con mapa, persona y cielo (x ≈ 540) ===============
D(M,'left:-300px;top:1490px;width:1500px;height:420px;background:linear-gradient(180deg,#1b2552,#0e1330 70%,rgba(11,15,36,0))');
const PA=celular('telA',540,1130,1);
const mA=mapa(PA.p,344,684),mA2=mapa(PA.p,344,684);mA2.style.opacity=0;
const dotA=punto(PA.p,172,342,1);
const barra=D(PA.p,'left:16px;top:70px;width:312px;height:56px;border-radius:28px;background:#e9ecf5;opacity:0');
const barraTxt=D(barra,'left:22px;top:12px;width:260px;overflow:hidden;white-space:nowrap;font-size:26px;font-weight:600;color:#0b0f24');barraTxt.textContent='¿Dónde estás?';
const PER=bola('per',185,1040,{k:1,piel:'#f2c9a5',pelo:'#2b1b14',ropa:COL.a,piernas:true});
const maleta=D(M,'left:236px;top:1262px;width:84px;height:104px;border-radius:14px;background:#8a5a2b;border:6px solid #5a3a18;opacity:0');D(maleta,'left:18px;top:-26px;width:36px;height:22px;border:6px solid #5a3a18;border-bottom:0;border-radius:12px 12px 0 0');
const lineaA=D(M,'left:250px;top:1018px;width:310px;height:5px;background:repeating-linear-gradient(90deg,#FFB703 0 14px,transparent 14px 26px);opacity:0');tl.set(lineaA,{rotation:20.8,transformOrigin:'0 50%'},0);
const qA=txt(540,800,120,'#FFB703','?',200);
// cámara de vigilancia en el cielo
const camG=D(M,'left:0;top:0;width:0;height:0;opacity:0');
D(camG,'left:520px;top:582px;width:40px;height:34px;background:#cfd5ee;border-radius:8px');D(camG,'left:465px;top:610px;width:150px;height:70px;border-radius:24px;background:#e9ecf5');D(camG,'left:578px;top:628px;width:34px;height:34px;border-radius:50%;background:#1a2350;border:5px solid #4B5BFF');
const cono=D(M,'left:440px;top:690px;width:300px;height:240px;background:linear-gradient(180deg,rgba(255,183,3,.4),rgba(255,183,3,0));clip-path:polygon(40% 0,60% 0,100% 100%,0 100%);opacity:0');
const xCam=equis(540,650,150);const xBar=equis(540,886,110);
// =============== ESCENARIO B: «tú» y tres amigos (x ≈ 2200) ===============
const U={x:2200,y:1100},FA={x:1880,y:984,r:340},FB={x:2662,y:884,r:510},FC={x:2200,y:1270,r:170};   // 1 km = 170 px
const wB=D(M,'left:1250px;top:330px;width:2200px;height:1500px;opacity:.55;-webkit-mask-image:radial-gradient(closest-side,#000 45%,transparent 100%);mask-image:radial-gradient(closest-side,#000 45%,transparent 100%)');mapa(wB,2200,1500,.8);
const TU=bola('tu',U.x,U.y,{k:.5,piel:'#e0ac82',pelo:'#6b3f1d',ropa:'#ff8a5b'});
const fa=bola('fa',FA.x,FA.y,{k:.62,piel:'#f2c9a5',pelo:'#2b1b14',ropa:COL.a}),fb=bola('fb',FB.x,FB.y,{k:.62,piel:'#c68863',pelo:'#1c1c1c',ropa:COL.b}),fc=bola('fc',FC.x,FC.y,{k:.62,piel:'#f2c9a5',pelo:'#a0522d',ropa:COL.c});
for(const f of[fa,fb,fc])f.g.style.opacity=0;
const qU=txt(U.x,U.y-130,84,'#FFB703','?',120);
const pins=[pin(FA.x,FA.y-48,COL.a),pin(FB.x,FB.y-48,COL.b),pin(FC.x,FC.y-48,COL.c)];
const linea=(x1,y1,x2,y2,c)=>{const dx=x2-x1,dy=y2-y1,l=Math.hypot(dx,dy),e=D(M,`left:${x1}px;top:${y1-3}px;width:${l}px;height:6px;background:repeating-linear-gradient(90deg,${c} 0 14px,transparent 14px 26px);opacity:0`);tl.set(e,{rotation:Math.atan2(dy,dx)*180/Math.PI,transformOrigin:'0 50%'},0);return e;};
const lineas=[linea(FA.x,FA.y,U.x,U.y,COL.a),linea(FB.x,FB.y,U.x,U.y,COL.b),linea(FC.x,FC.y,U.x,U.y,COL.c)];
const globo=(x,y,t)=>{const e=D(M,`left:${x-90}px;top:${y}px;width:180px;height:48px;line-height:48px;border-radius:24px;background:#fff;color:#0b0f24;text-align:center;font-size:24px;font-weight:800;opacity:0`);e.textContent=t;return e;};
const globos=[globo(FA.x,FA.y-130,'¿DISTANCIA?'),globo(FB.x,FB.y-130,'¿DISTANCIA?'),globo(FC.x+230,FC.y-30,'¿DISTANCIA?')];
const circ=(c,col)=>{const e=D(M,`left:${c.x-c.r}px;top:${c.y-c.r}px;width:${2*c.r}px;height:${2*c.r}px;border:8px solid ${col};border-radius:50%;opacity:0;box-sizing:border-box;box-shadow:0 0 0 0 rgba(255,255,255,0)`);return e;};
const cA=circ(FA,COL.a),cB=circ(FB,COL.b),cC=circ(FC,COL.c);
const kA=txt(1586,1154,64,COL.a,'2 km',200),kB=txt(2954,1302,64,COL.b,'3 km',200),kC=txt(2091,1400,64,COL.c,'1 km',200);
const ringsU=[0,1].map(()=>D(M,`left:${U.x-60}px;top:${U.y-60}px;width:120px;height:120px;border:6px solid #FFB703;border-radius:50%;opacity:0`));
const brj=[flecha(FA.x+40,FA.y-10,70,-35,'#cfd5ee'),flecha(FB.x+40,FB.y-10,70,50,'#cfd5ee'),flecha(FC.x+40,FC.y-10,70,170,'#cfd5ee')];
const brjQ=[txt(FA.x+100,FA.y-70,60,'#cfd5ee','?',80),txt(FB.x+100,FB.y-70,60,'#cfd5ee','?',80),txt(FC.x+100,FC.y-70,60,'#cfd5ee','?',80)];
const brjX=[equis(FA.x+70,FA.y-20,90),equis(FB.x+70,FB.y-20,90),equis(FC.x+70,FC.y-20,90)];
// =============== ESCENARIO D: satélites y celular (x ≈ 3900) ===============
const K=.85,PD=celular('telD',3900,1420,K),mD=mapa(PD.p,344*K,684*K);
const dotD=punto(PD.p,172*K,342*K,K);
const SX=[3560,3760,4040,4240],SY=700,SCOL=[COL.a,COL.b,COL.c,COL.d],sats=SX.map((x,i)=>sat(x,SY,.6,SCOL[i]));
const topD={x:3900,y:1420-360*K+4};
const lineasD=SX.map((x,i)=>linea(x,SY+30,topD.x,topD.y,SCOL[i]));
const paq=SX.map((x,i)=>D(M,`left:${x-12}px;top:${SY+18}px;width:24px;height:24px;border-radius:50%;background:${SCOL[i]};box-shadow:0 0 18px ${SCOL[i]};opacity:0`));
const badge=SX.map((x,i)=>{const e=D(M,`left:${x-26}px;top:${SY-120}px;width:52px;height:52px;line-height:52px;border-radius:50%;background:${SCOL[i]};color:#fff;text-align:center;font-size:34px;font-weight:800;opacity:0`);e.textContent=i+1;return e;});
const reloj=D(M,'left:3430px;top:1370px;width:150px;height:150px;border:8px solid #FFB703;border-radius:50%;opacity:0;background:#0b0f24');
D(reloj,'left:63px;top:63px;width:12px;height:12px;border-radius:50%;background:#FFB703;z-index:2');
const hora=D(reloj,'left:63px;top:30px;width:10px;height:44px;border-radius:5px;background:#e9ecf5');const minu=D(reloj,'left:64px;top:14px;width:8px;height:60px;border-radius:4px;background:#FFB703');tl.set([hora,minu],{transformOrigin:'50% 100%'},0);tl.set(hora,{rotation:-60},0);
const errT=txt(3505,1330,36,'#FF5A5F','± ERROR',240),okT=txt(3505,1330,52,'#4ade80','✓',120);
const pinD=pin(3900,1100,COL.b);
const flUp=flecha(3900,1100,350,-102,'#cfd5ee');const xUp=equis(3840,900,110);
const flDn=[0,1,2].map(i=>flecha(SX[i],SY+50,Math.hypot(3880+(i-1)*40-SX[i],1100-(SY+50)),Math.atan2(1100-(SY+50),3880+(i-1)*40-SX[i])*180/Math.PI,SCOL[i]));
const calc=D(M,'left:3835px;top:1330px;width:130px;height:170px;border-radius:18px;background:#e9ecf5;opacity:0');D(calc,'left:14px;top:14px;width:102px;height:34px;border-radius:6px;background:#0b0f24');
for(let i=0;i<9;i++)D(calc,`left:${14+(i%3)*36}px;top:${64+Math.floor(i/3)*32}px;width:30px;height:24px;border-radius:6px;background:#4B5BFF`);
const ojos=[[3560,1250],[4240,1250],[3560,1500],[4240,1500]].map(([x,y])=>{const e=D(M,`left:${x-50}px;top:${y-30}px;width:100px;height:60px;border-radius:50%;background:#fff;opacity:0`);D(e,'left:34px;top:12px;width:34px;height:34px;border-radius:50%;background:#1a2350');D(e,'left:44px;top:22px;width:14px;height:14px;border-radius:50%;background:#000');return e;});
const ojosX=[[3560,1250],[4240,1250],[3560,1500],[4240,1500]].map(([x,y])=>equis(x,y,100));
const okF=txt(3900,1590,90,'#4ade80','✓',120);
// =============== COREOGRAFÍA ===============
const pop=(e,t0,d=.4,snd='pop')=>{tl.fromTo(e,{opacity:0,scale:.4},{opacity:1,scale:1,duration:d,ease:'back.out(2)',immediateRender:false},t0);if(snd)sfx(t0,snd,.45);};
const fade=(e,t0,d=.35)=>tl.to(e,{opacity:1,duration:d},t0);
const sale=(e,t0,d=.3)=>tl.to(e,{opacity:0,duration:d},t0);
const pulso=(r,t0,n,esc=3.2)=>{for(let i=0;i<n;i++)tl.fromTo(r[i%r.length],{scale:1,opacity:.7},{scale:esc,opacity:0,duration:1.1,ease:'power1.out',immediateRender:false},t0+i*.55);};
const asentir=(p,t0)=>tl.to(p.cab,{rotation:7,duration:.18},t0).to(p.cab,{rotation:-4,duration:.18},t0+.18).to(p.cab,{rotation:0,duration:.18},t0+.36);
const revela=(e,t0,d=.5)=>{tl.set(e,{opacity:1},t0).fromTo(e,{scaleX:0},{scaleX:1,duration:d,ease:'power2.out',immediateRender:false},t0);};
const ondaV=(t0)=>{const r=[0,1,2].map(()=>D(M,'left:470px;top:570px;width:140px;height:140px;border:7px solid #FFB703;border-radius:50%;opacity:0'));tl.fromTo(r,{y:0,scale:.3,opacity:.9},{y:560,scale:2.4,opacity:0,duration:1.6,ease:'power1.out',stagger:.25,immediateRender:false},t0);sfx(t0,'swoosh',.45,1.2);};
tl.set(barraTxt,{transformOrigin:'0 50%'},0);
{const f=focus(540,1100,1.0);tl.set('#world',{x:f.x,y:f.y,scale:1,rotation:0,filter:'blur(0px)'},0);}
// ---- ESCENARIO A ----
const tPunto=palabra(/^puntito/,CL[0][0]),tPar=palabra(/^parado/,tPunto);
cam(0,CL[3][0]-.3,focus(540,1100,1.06),'none');
pop(dotA.dot,tPunto);pulso(dotA.ani,tPunto+.3,Math.max(1,Math.floor((CL[3][0]-.6-(tPunto+.3))/.55)));revela(lineaA,tPar);sfx(tPar,'tick',.5);
asentir(PER,CL[1][0]+.5);
cam(CL[3][0]-.2,1.2,focus(540,1130,1.55),'power3.inOut');
pop(qA,palabra(/^pensala/,CL[3][0]));pulso(dotA.ani,CL[4][0]+.3,3);sale(qA,CL[5][0]-.25);
const tCiu=palabra(/^ciudad/,CL[5][0]);tl.to(mA2,{opacity:1,duration:.7},tCiu);sfx(tCiu,'swoosh',.4,.7);pop(maleta,palabra(/^nunca/,tCiu));pulso(dotA.ani,tCiu+.9,2);
cam(CL[6][0]-.25,1.3,focus(540,770,.95),'power3.inOut');
fade(camG,palabra(/^camara/,CL[6][0]));fade(cono,palabra(/^mirando/,CL[6][0]));pop(xCam,CL[6][1]-.45,.4,'error');
const tDigas=palabra(/^digas/,CL[7][0]);
cam(CL[7][0]-.15,1.2,focus(540,1090,1.45),'power3.inOut');sale([camG,cono,xCam],CL[7][0]-.15);
fade(barra,tDigas-.1);tl.fromTo(barraTxt,{scaleX:0},{scaleX:1,duration:.9,ease:'none',immediateRender:false},tDigas);pop(xBar,palabra(/^estas/,tDigas),.4,'error');
cam(CL[8][0]-.15,1.3,focus(540,830,.9),'power3.inOut');sale([barra,xBar],CL[8][0]+.05);
ondaV(palabra(/^interesante/,CL[8][0])-.1);
// ---- ESCENARIO B ----
cam(CL[8][1]+.05,1.4,focus(2356,1070,.62),'power3.inOut');
pop(qU,palabra(/^perdido/,CL[9][0]));
const tAm=palabra(/^amigos/,CL[9][0]);pop(fa.g,tAm);pop(fb.g,tAm+.35);pop(fc.g,tAm+.7);
const tDis=palabra(/^distintos/,CL[10][0]);pins.forEach((p,i)=>pop(p,tDis+i*.25));sale(qU,tDis);
const tD=palabra(/^distancia/,CL[11][0]);lineas.forEach((l,i)=>revela(l,tD+i*.2,.5));globos.forEach((g,i)=>pop(g,tD+.1+i*.25));
const crec=(c,t0,k,kt)=>{tl.set(c,{opacity:1},t0).fromTo(c,{scale:.02},{scale:1,duration:.9,ease:'power2.out',immediateRender:false},t0);pop(kt,t0+.55);sfx(t0,'shimmer',.4,.9);};
const tDos=palabra(/^dos$/,CL[13][0]),tTres=palabra(/^tres$/,CL[15][0]),tUn=palabra(/^un$/,CL[17][0]);sale(globos,tDos-.3);
cam(tDos-.55,1.0,focus(2040,1042,.9),'power3.inOut');crec(cA,tDos,0,kA);
cam(tTres-.55,1.0,focus(2431,992,.72),'power3.inOut');crec(cB,tTres,0,kB);
cam(tUn-.55,1.0,focus(2200,1185,1.05),'power3.inOut');crec(cC,tUn,0,kC);
const tPist=palabra(/^pistas/,CL[18][0]);
cam(CL[18][0]-.1,1.4,focus(2200,1100,.9));
tl.to([cA,cB,cC],{boxShadow:'0 0 40px 8px rgba(255,255,255,.35)',duration:.5},tPist);tl.to([fa.g,fb.g,fc.g],{opacity:.3,duration:.5},tPist+.2);sale([...lineas,...pins],tPist);sale([kA,kB,kC],tPist);
pulso(ringsU,palabra(/^descubrir/,CL[18][0]),3,3.5);sfx(palabra(/^descubrir/,CL[18][0]),'lock',.6);
tl.to([cA,cB,cC],{boxShadow:'0 0 0 0 rgba(255,255,255,0)',duration:.4},CL[19][0]-.2);
cam(CL[19][0]-.1,1.3,focus(2356,1070,.68));
const tDir=palabra(/^direccion/,CL[19][0]);brj.forEach((b,i)=>{pop(b,tDir+i*.25,.35,null);pop(brjQ[i],tDir+i*.25,.35,null);});sfx(tDir,'pop',.45);
const tNin=palabra(/^ninguno/,CL[19][0]);brjX.forEach((x,i)=>pop(x,tNin+i*.15,.35,i?null:'error'));
tl.to('#world',{opacity:0,duration:.3},CL[19][1]+.05);
{const f=focus(3900,1130,1.0),ps=Math.min(f.s,6),cl_=(v,a)=>Math.max(-a,Math.min(a,v));
  tl.set('#world',{x:f.x,y:f.y,scale:f.s,rotation:0,filter:'blur(0px)'},CL[20][0]+.1);
  tl.set('#bg-grid',{x:cl_(f.x*.25,220),y:cl_(f.y*.25,220),scale:1+(ps-1)*.2},CL[20][0]+.1);tl.set('#dust',{x:cl_(f.x*.5,400),y:cl_(f.y*.5,400),scale:1+(ps-1)*.4},CL[20][0]+.1);}
// ---- ESCENA 3D (CL20 a CL27): sonidos y marcadores del HUD (los elementos 3D están en escena.capa3d.html) ----
const T0=CL[20][0];
sfx(T0+.1,'swoosh',.6,1.6);for(let j=0;j<5;j++)sfx(T0+3.7+j*.9,'tick',.4);
const hud=document.getElementById('crono'),aguja=document.getElementById('aguja'),form=document.getElementById('formula');
tl.set(aguja,{transformOrigin:'50% 100%'},0);
fade(hud,CL[24][0]+.1);tl.fromTo(aguja,{rotation:0},{rotation:300,duration:1.9,ease:'none',immediateRender:false},T0+8.5);sfx(T0+8.5,'tick',.5);sfx(T0+10.4,'confirm',.7);sale(hud,T0+11.4);
sfx(CL[25][0],'beam',.7,1.5);
fade(form,palabra(/^calcula/,CL[26][0]));sfx(palabra(/^calcula/,CL[26][0]),'lock',.5);
[12.9,13.9,14.9,15.9].forEach(t=>sfx(T0+t,'tick',.6));sfx(T0+12.2,'swoosh',.5,.9);sfx(T0+16.5,'shimmer',.7,1.4);sfx(T0+16.6,'confirm',.7);
sale(form,CL[27][0]+.1);
// eventos de la escena 3D (la herramienta de concordancia no ve dentro de WebGL: se declaran aquí)
window.__eventos3d=[[0.1,'los satélites suben'],[1.8,'llegan a su órbita'],[2.2,'la cámara 3D se aleja'],[3.7,'primera señal'],[4.6,'señales'],[5.5,'señales'],[6.4,'señales'],[7.3,'señales'],[8.5,'señal con cronómetro'],[10.4,'la señal llega'],[10.9,'rayo de luz'],[12.2,'cuarto satélite'],[12.9,'esfera 1'],[13.9,'esfera 2'],[14.9,'esfera 3'],[15.9,'esfera 4'],[16.5,'las esferas coinciden en el punto azul']].map(([t,q])=>({t:+(T0+t).toFixed(2),q}));
// ---- ESCENARIO D ----
tl.to('#world',{opacity:1,duration:.45},CL[27][1]-.1);
const tCuatro=palabra(/^cuatro/,CL[28][0]);
lineasD.forEach((l,i)=>revela(l,tCuatro+i*.3,.4));badge.forEach((b,i)=>pop(b,tCuatro+i*.3,.35));
paq.forEach((p,i)=>{tl.set(p,{opacity:1},tCuatro+.2+i*.3).fromTo(p,{x:0,y:0},{x:topD.x-SX[i],y:topD.y-(SY+30),duration:1.2,ease:'none',immediateRender:false},tCuatro+.2+i*.3).to(p,{opacity:0,duration:.15},tCuatro+1.4+i*.3);});
pop(pinD,palabra(/^ubicacion/,CL[28][0]));
const tCorr=palabra(/^corregir/,CL[28][0]),tRel=palabra(/^reloj/,tCorr);fade(reloj,tCorr-.2);tl.to(minu,{rotation:38,duration:.5},tCorr+.1);pop(errT,tCorr+.4,.35,'error');
tl.to(minu,{rotation:0,duration:.5},tRel);sale(errT,tRel-.05);pop(okT,tRel+.3,.4,'confirm');
cam(CL[29][0]-.2,1.2,focus(3900,1420,1.7),'power3.inOut');sale([reloj,okT,pinD],CL[29][0]);
const tPD=palabra(/^puntito/,CL[29][0]);pop(dotD.dot,tPD);pulso(dotD.ani,tPD+.3,3);
cam(CL[30][0]-.1,1.2,focus(3900,1130,1.0),'power3.inOut');
const tRec=palabra(/^reciben/,CL[31][0]);fade(flUp,tRec-.5);pop(xUp,tRec+.3,.4,'error');
sale([flUp,xUp],CL[32][0]-.2);const tEnv=palabra(/^envian/,CL[32][0]);flDn.forEach((f,i)=>{fade(f,tEnv+i*.25);});sfx(tEnv,'swoosh',.4,.8);pop(calc,palabra(/^calculos/,CL[32][0]));
sale([calc,...flDn],CL[33][0]);
cam(CL[33][0]-.1,1.3,focus(3900,1250,1.05),'power3.inOut');
const tSin=palabra(/^sin$/,CL[33][0]),tNad=palabra(/^nadie/,CL[33][0]);ojos.forEach((o,i)=>pop(o,tSin+i*.15,.35,null));sfx(tSin,'pop',.45);ojosX.forEach((x,i)=>pop(x,tNad+i*.15,.35,i?null:'error'));pop(okF,tNad+.7,.4,'confirm');
// ---- zoom-through al cierre: se entra en una manzana oscura del mapa del celular ----
const DIVE0=CTA-1.1,bk=mD.bl.filter(b=>!b[2]).sort((a,b)=>Math.hypot(a[0]-110*K,a[1]-560*K)-Math.hypot(b[0]-110*K,b[1]-560*K))[0];
cam(DIVE0,1.1,focus(3900-172*K+bk[0],1420-342*K+bk[1],64),'power3.in');
tl.to('#world',{filter:'blur(10px)',duration:1.1,ease:'power2.in'},DIVE0);
tl.to('#bg-grid',{x:0,y:0,scale:1,duration:1.6,ease:'power2.out'},CTA).to('#dust',{x:0,y:0,scale:1,duration:1.6,ease:'power2.out'},CTA);
// ---- etiquetas ----
etiquetas([[tPunto+.2,CL[0][1],'PUNTO AZUL'],[CL[1][0]+.2,CL[2][1],'NORMAL ✓'],[CL[4][0],CL[4][1],'¿CÓMO?'],[tCiu,CL[5][1],'CIUDAD NUEVA'],
 [palabra(/^camara/,CL[6][0]),CL[6][1],'SIN CÁMARA EN EL CIELO'],[tDigas,CL[7][1],'NO LE ESCRIBES NADA'],[palabra(/^interesante/,CL[8][0])-.3,CL[8][1],'MÁS INTERESANTE'],
 [tPist,CL[18][1],'3 PISTAS = 1 PUNTO'],[tDir,CL[19][1],'SIN DIRECCIÓN'],
 [palabra(/^gps/,CL[21][0]),CL[21][1],'GPS'],[CL[22][0],CL[22][1],'SATÉLITES'],[palabra(/^donde/,CL[23][0]),palabra(/^donde/,CL[23][0])+1.3,'POSICIÓN'],[palabra(/^hora/,CL[23][0]),CL[23][1],'HORA'],
 [CL[24][0]+.2,CL[24][1],'TIEMPO DE VIAJE'],[CL[25][0],CL[25][1],'VELOCIDAD DE LA LUZ ≈ 300.000 km/s'],[palabra(/^coinciden/,CL[27][0]),CL[27][1],'COINCIDEN EN UN PUNTO'],
 [tCuatro,tCorr-.1,'4 SATÉLITES'],[tCorr,CL[29][0]-.15,'AJUSTA SU RELOJ'],[tPD,CL[29][1],'TU UBICACIÓN'],[CL[30][0],CL[30][1],'ATENCIÓN'],
 [tRec-.2,CL[31][1],'NO RECIBEN TU UBICACIÓN','bad'],[tEnv,CL[32][1],'LOS CÁLCULOS SON DE TU TELÉFONO'],[tNad,CL[33][1],'NADIE TE VE']]);
