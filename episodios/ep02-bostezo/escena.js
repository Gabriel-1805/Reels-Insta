// propio del episodio: el bostezo contagioso. Personajes y objetos dibujados con HTML/CSS (originales).
const M=document.getElementById('esc');
const D=(p,css,cls)=>{const e=document.createElement('div');e.style.cssText='position:absolute;'+css;if(cls)e.className=cls;p.appendChild(e);return e;};
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\W/g,'').toLowerCase();
const tw_=(re,def)=>{const x=CAPS.find(c=>re.test(norm(c.w)));return x?x.s:def;};
// ---- escenario ----
D(M,'left:-400px;top:1330px;width:4600px;height:520px;background:linear-gradient(180deg,#1b2552,#0e1330 70%,rgba(11,15,36,0))');
// ---- personas ----
function persona(id,cx,cy,o){
  const g=D(M,`left:${cx}px;top:${cy}px;width:0;height:0`);g.id=id;
  const cara=D(g,'left:0;top:0;width:0;height:0');cara.id=id+'-cara';
  if(o.largo)D(cara,`left:-205px;top:-190px;width:410px;height:560px;border-radius:205px 205px 80px 80px;background:${o.pelo}`);
  // torso: hombros inclinados que se funden con el suelo; escote y cuello en una sola pieza
  D(g,`left:-330px;top:236px;width:660px;height:470px;border-radius:330px 330px 0 0 / 190px 190px 0 0;background:linear-gradient(180deg,${o.camisa} 68%,${o.camisa}00)`);
  D(g,`left:-84px;top:222px;width:168px;height:104px;border-radius:50%;background:${o.piel2}`);
  D(g,`left:-56px;top:110px;width:112px;height:150px;border-radius:12px 12px 40px 40px;background:${o.piel2}`);
  D(g,'left:-50px;top:140px;width:100px;height:46px;border-radius:50%;background:rgba(0,0,0,.14)');
  D(cara,`left:-172px;top:-172px;width:344px;height:344px;border-radius:50%;background:${o.piel}`);
  D(cara,`left:-192px;top:-20px;width:44px;height:70px;border-radius:50%;background:${o.piel2}`);D(cara,`left:148px;top:-20px;width:44px;height:70px;border-radius:50%;background:${o.piel2}`);
  D(cara,`left:-178px;top:-190px;width:356px;height:128px;border-radius:180px 180px 60px 60px;background:${o.pelo}`);
  D(cara,`left:-14px;top:18px;width:28px;height:34px;border-radius:50%;background:${o.piel2}`);
  for(const x of[-104,60])D(cara,`left:${x}px;top:-52px;width:44px;height:8px;border-radius:4px;background:${o.pelo}`);
  const parp=[];for(const x of[-100,64]){D(cara,`left:${x}px;top:-20px;width:36px;height:36px;border-radius:50%;background:#1a1410`);parp.push(D(cara,`left:${x-4}px;top:-24px;width:44px;height:44px;border-radius:50%;background:${o.piel}`));}
  const boca=D(cara,'left:-52px;top:70px;width:104px;height:86px;border-radius:50%;background:#120a24;overflow:hidden');D(boca,'left:22px;bottom:4px;width:60px;height:34px;border-radius:50%;background:#e0556f');
  return{g,cara,boca,parp};
}
function animal(id,cx,cy,t){
  const g=D(M,`left:${cx}px;top:${cy}px;width:0;height:0`);g.id=id;const c=t==='chimp'?'#7a5238':'#d9a066',c2=t==='chimp'?'#e3b894':'#f0c892';
  D(g,`left:-260px;top:230px;width:520px;height:420px;border-radius:260px 260px 0 0;background:${c}`);
  if(t==='chimp'){D(g,'left:-250px;top:-110px;width:96px;height:96px;border-radius:50%;background:#6b4430');D(g,'left:154px;top:-110px;width:96px;height:96px;border-radius:50%;background:#6b4430');}
  else{const e1=D(g,'left:-215px;top:-140px;width:96px;height:210px;border-radius:50%;background:#8b5a2b');const e2=D(g,'left:119px;top:-140px;width:96px;height:210px;border-radius:50%;background:#8b5a2b');tl.set(e1,{rotation:16},0).set(e2,{rotation:-16},0);}
  D(g,`left:-155px;top:-160px;width:310px;height:330px;border-radius:50%;background:${c}`);
  D(g,`left:-100px;top:10px;width:200px;height:${t==='chimp'?150:130}px;border-radius:50%;background:${c2}`);
  if(t==='dog')D(g,'left:-30px;top:5px;width:60px;height:40px;border-radius:50%;background:#1a1410');
  const parp=[];for(const x of[-85,49]){D(g,`left:${x}px;top:-50px;width:36px;height:36px;border-radius:50%;background:#1a1410`);parp.push(D(g,`left:${x-4}px;top:-54px;width:44px;height:44px;border-radius:50%;background:${c}`));}
  const boca=D(g,'left:-46px;top:60px;width:92px;height:80px;border-radius:50%;background:#120a24;overflow:hidden');D(boca,'left:18px;bottom:4px;width:56px;height:30px;border-radius:50%;background:#e0556f');
  return{g,boca,parp};
}
const A=persona('pa',540,820,{piel:'#f2c9a5',piel2:'#e0ac82',pelo:'#2b1b14',camisa:'#4B5BFF'});
const B=persona('pb',1380,820,{piel:'#c68863',piel2:'#b27650',pelo:'#6b3f1d',camisa:'#FFB703',largo:true});
const CH=animal('chimp',2300,820,'chimp'), DG=animal('dog',2900,820,'dog');
tl.set([A.boca,B.boca,CH.boca,DG.boca],{scaleY:.12,transformOrigin:'50% 0%'},0).set([...A.parp,...B.parp,...CH.parp,...DG.parp],{scaleY:0,transformOrigin:'50% 0%'},0);
// bostezo: la boca se abre, los ojos se cierran, se vuelve a cerrar
const DUR_BOST={m:1.45,f:2.1}; // duración de las muestras reales (comun/sonido/muestras); c y d son sintéticos
function bostezar(p,t0,d,gen,snd=.9){
  d=DUR_BOST[gen]||d;
  tl.to(p.boca,{scaleY:1,duration:d*.35,ease:'power2.out'},t0).to(p.boca,{scaleY:.12,duration:d*.3,ease:'power2.in'},t0+d*.7)
    .to(p.parp,{scaleY:1,duration:d*.3,ease:'power1.out'},t0+d*.1).to(p.parp,{scaleY:0,duration:d*.25},t0+d*.75);
  if(snd)sfx(t0,'bostezo_'+gen,snd,d);
}
// onda del bostezo: tres anillos que viajan y se desvanecen
function onda(t0,x0,x1,y=935,vol=.5){
  const r=[0,1,2].map(()=>D(M,`left:${x0-70}px;top:${y-70}px;width:140px;height:140px;border:7px solid #FFB703;border-radius:50%;opacity:0`));
  tl.fromTo(r,{x:0,scale:.3,opacity:.9},{x:x1-x0,scale:2.4,opacity:0,duration:1.5,ease:'power1.out',stagger:.22,immediateRender:false},t0);sfx(t0,'swoosh',vol,1.2);
}
// ---- cerebro (dentro de la cabeza de «tú») ----
const br=D(M,'left:1230px;top:700px;width:300px;height:240px;opacity:0');br.id='cerebro';
const N=[[90,100],[130,70],[170,70],[210,100],[100,150],[140,130],[180,130],[220,150],[120,185],[160,170],[200,185],[150,100]],E=[[0,1],[1,2],[2,3],[0,4],[1,11],[2,11],[3,7],[4,5],[5,6],[6,7],[5,11],[6,11],[4,8],[8,9],[9,10],[10,7],[5,9],[6,9]];
br.innerHTML=`<svg viewBox="0 0 300 240" width="300" height="240"><path class="cerebro-f" d="M60 120 C40 60 100 20 150 40 C200 10 270 50 250 120 C280 160 240 215 190 200 C170 230 110 230 100 200 C50 215 20 160 60 120 Z"/>${E.map(([a,b])=>`<line class="enlace" x1="${N[a][0]}" y1="${N[a][1]}" x2="${N[b][0]}" y2="${N[b][1]}"/>`).join('')}${N.map(([x,y])=>`<circle class="nodo" cx="${x}" cy="${y}" r="9"/>`).join('')}</svg>`;
// ---- iconos y objetos ----
const bat=D(M,'left:1300px;top:470px;width:160px;height:80px;border:7px solid #FFB703;border-radius:16px;opacity:0');D(bat,'left:6px;top:6px;width:134px;height:56px;border-radius:8px;background:#FFB703');D(bat,'left:158px;top:18px;width:12px;height:32px;border-radius:4px;background:#FFB703');
const ojo=D(M,'left:1130px;top:470px;width:120px;height:70px;border-radius:50%;background:#fff;opacity:0');D(ojo,'left:40px;top:10px;width:50px;height:50px;border-radius:50%;background:#4B5BFF');D(ojo,'left:55px;top:25px;width:20px;height:20px;border-radius:50%;background:#0B0F24');
const oido=D(M,'left:1470px;top:470px;width:120px;height:90px;opacity:0');for(let i=0;i<3;i++)D(oido,`left:${i*26}px;top:${i*10}px;width:${50+i*26}px;height:${70-i*20}px;border:7px solid #FFB703;border-left:0;border-radius:0 100% 100% 0;`);
// sala de los científicos: una «ventana» entre los dos personajes, a la que entra la cámara
const por=D(M,'left:750px;top:410px;width:420px;height:300px;border-radius:26px;overflow:hidden;border:6px solid #4B5BFF;box-shadow:0 0 40px #4B5BFF88;opacity:0');por.id='portal';
D(por,'left:0;top:0;width:420px;height:300px;background:linear-gradient(180deg,#26356f,#141c44)');D(por,'left:0;top:222px;width:420px;height:78px;background:linear-gradient(180deg,#0e1330,#0b0f24)');
const piz=D(por,'left:105px;top:24px;width:210px;height:100px;border-radius:8px;background:#0f1a3a;border:3px solid #8a93b8');
const gar=[[16,22,120],[16,46,90],[16,70,140]].map(([x,y,w])=>D(piz,`left:${x}px;top:${y}px;width:${w}px;height:5px;border-radius:3px;background:#FFB703`));
function cientifico(cx,o){
  D(por,`left:${cx-52}px;top:150px;width:104px;height:140px;border-radius:44px 44px 0 0;background:#e9ecf5`);D(por,`left:${cx-4}px;top:150px;width:8px;height:140px;background:#c9cde0`);
  const h=D(por,`left:${cx}px;top:150px;width:0;height:0`);
  D(h,`left:-14px;top:-26px;width:28px;height:34px;background:${o.piel2};border-radius:8px`);
  D(h,`left:-38px;top:-100px;width:76px;height:80px;border-radius:50%;background:${o.piel}`);
  D(h,`left:-42px;top:-108px;width:84px;height:${o.calvo?24:40}px;border-radius:42px 42px 14px 14px;background:${o.pelo}`);
  if(o.moño)D(h,`left:-14px;top:-126px;width:28px;height:28px;border-radius:50%;background:${o.pelo}`);
  const cejas=[],pup=[];
  for(const x of[-26,6]){cejas.push(D(h,`left:${x}px;top:-72px;width:20px;height:4px;border-radius:2px;background:#1a1410`));
    D(h,`left:${x-2}px;top:-66px;width:24px;height:24px;border-radius:50%;border:3px solid #1a1410;background:#ffffff33;box-sizing:border-box`);pup.push(D(h,`left:${x+6}px;top:-58px;width:8px;height:8px;border-radius:50%;background:#1a1410`));}
  D(h,'left:-2px;top:-62px;width:8px;height:3px;background:#1a1410');
  const boca=D(h,'left:-9px;top:-36px;width:18px;height:8px;border-radius:50%;background:#7a3b3b');
  const q=D(h,'left:-14px;top:-168px;width:28px;text-align:center;font-size:44px;font-weight:800;color:#FFB703;opacity:0');q.textContent='?';
  return{h,cejas,pup,boca,q};
}
const S1=cientifico(110,{piel:'#e8b894',piel2:'#d3a07c',pelo:'#9aa0b4'}),S2=cientifico(310,{piel:'#c68863',piel2:'#b27650',pelo:'#2b1b14',moño:true});
const red=D(M,'left:715px;top:830px;width:500px;height:6px;opacity:0;background:repeating-linear-gradient(90deg,#4B5BFF 0 22px,transparent 22px 40px)');
const pts=[0,1,2].map(i=>D(M,`left:${708+i*0}px;top:${823}px;width:20px;height:20px;border-radius:50%;background:#FFB703;opacity:0`));
const inter=D(M,'left:900px;top:430px;width:120px;text-align:center;font-size:170px;font-weight:800;color:#FFB703;opacity:0');inter.textContent='?';
// ================= COREOGRAFÍA =================
const tCh=tw_(/^chimpances/,CL[12][0]+1.5), tDg=tw_(/^perros/,CL[12][0]+2.6);
const DIVE0=CTA-1.4;
{const f0=focus(540,930,2.3);tl.set('#world',{x:f0.x,y:f0.y,scale:2.3,rotation:0,filter:'blur(0px)'},0);}
// S0 gancho: primer plano de la boca; luego plano general con «alguien» y «tú»
cam(0,3.7,focus(540,930,2.5),'none');
bostezar(A,.3,2.6,'m');onda(1.0,540,540,935,.35);
cam(3.9,1.5,focus(960,950,.8),'power3.inOut');blur(4.0,1.0,6);
bostezar(A,4.9,2.3,'m');onda(5.4,540,1380);
bostezar(B,7.6,2.4,'f');
cam(5.5,3.6,focus(960,930,.86),'none');
// S1 «tu cerebro»: la cámara entra en la cabeza; la piel se vuelve transparente y se ve el cerebro
cam(C(2,.4),1.3,focus(1380,860,1.3));
cam(T(1,0),1.3,focus(1380,820,2.6),'power3.inOut');blur(T(1,0)+.1,.9);
tl.to('#pb-cara',{opacity:.1,duration:.8},T(1,0)+.4).to('#cerebro',{opacity:1,duration:.6},T(1,0)+.5);
const nodos=[...document.querySelectorAll('#cerebro .nodo')],enl=[...document.querySelectorAll('#cerebro .enlace')];
tl.to(nodos,{fill:'#FFB703',duration:.25,stagger:(CL[4][1]-CL[4][0]-.8)/12},CL[4][0]).to(enl,{stroke:'#FFB703',duration:.25,stagger:(CL[4][1]-CL[4][0]-.8)/18},CL[4][0]+.2);
for(let i=0;i<6;i++)sfx(CL[4][0]+i*.55,'tick',.5);
tl.to('#cerebro',{opacity:0,duration:.5},T(2,0)).to('#pb-cara',{opacity:1,duration:.5},T(2,0));
// S2 «bostezo contagioso» / «no necesitas estar cansado»
cam(T(2,0),1.3,focus(960,930,.82),'power3.inOut');blur(T(2,0)+.1,.9);
bostezar(A,CL[5][0]+.3,2.0,'m');onda(CL[5][0]+.8,540,1380);bostezar(B,CL[5][0]+1.9,2.2,'f');
tl.fromTo(bat,{opacity:0,scale:.5},{opacity:1,scale:1,duration:.4,ease:'back.out(2)'},CL[6][0]+.1);sfx(CL[6][0]+.1,'pop',.6);
tl.to(bat,{opacity:0,duration:.3},T(3,0)-.1);
// S3 «ver o escuchar» + «investigan»
cam(T(3,0),1.3,focus(960,900,.9));
tl.fromTo(ojo,{opacity:0,scale:.5},{opacity:1,scale:1,duration:.4,ease:'back.out(2)'},CL[7][0]+.4).fromTo(oido,{opacity:0,scale:.5},{opacity:1,scale:1,duration:.4,ease:'back.out(2)'},C(7,.55));sfx(CL[7][0]+.4,'pop',.6);sfx(C(7,.55),'pop',.6);
onda(CL[7][0]+.7,540,1380,935,.35);bostezar(B,C(7,.7),2.0,'f');
tl.to([ojo,oido],{opacity:0,duration:.3},CL[8][0]-.4);
const tP=CL[8][0];
tl.to(por,{opacity:1,duration:.4},tP-.35);sfx(tP-.35,'pop',.7);
cam(tP-.3,1.0,focus(960,560,3.0),'power3.inOut');blur(tP-.2,.8,6);
cam(tP+.8,CL[8][1]-.3-(tP+.8),focus(960,560,3.35),'none');
// los científicos piensan: cejas de intriga, miradas, cabeza ladeada, garabatos y «?»
for(const S of[S1,S2]){tl.set(S.h,{transformOrigin:'50% 100%'},0);}
tl.to(S1.cejas[0],{rotation:16,y:-3,duration:.4},tP+.6).to(S1.cejas[1],{rotation:-16,y:-3,duration:.4},tP+.6).to(S2.cejas[0],{rotation:16,y:-3,duration:.4},tP+.8).to(S2.cejas[1],{rotation:-16,y:-3,duration:.4},tP+.8);
tl.to([...S1.pup,...S2.pup],{x:-4,y:-3,duration:.3},tP+.7).to([...S1.pup,...S2.pup],{x:4,y:-3,duration:.4},tP+1.4);
tl.to(S1.h,{rotation:6,duration:.9,ease:'power1.inOut'},tP+.9).to(S2.h,{rotation:-6,duration:.9,ease:'power1.inOut'},tP+1.1);
gar.forEach((g,i)=>{tl.set(g,{transformOrigin:'0% 50%'},0).fromTo(g,{scaleX:0},{scaleX:1,duration:.35,ease:'power1.out'},tP+.7+i*.25);sfx(tP+.7+i*.25,'tick',.4);});
tl.fromTo(S1.q,{opacity:0,scale:.3},{opacity:1,scale:1,duration:.35,ease:'back.out(2.5)'},tP+.9).fromTo(S2.q,{opacity:0,scale:.3},{opacity:1,scale:1,duration:.35,ease:'back.out(2.5)'},tP+1.35);sfx(tP+.9,'pop',.6);sfx(tP+1.35,'pop',.6);
tl.to(por,{opacity:0,duration:.4},CL[8][1]+.15);
cam(CL[8][1]-.3,1.3,focus(960,860,1.0),'power3.inOut');blur(CL[8][1]-.2,.9,5);
// S4 imitación / percepción social / sin explicación definitiva
tl.to(red,{opacity:1,duration:.4},CL[9][0]+.2);
pts.forEach((p,i)=>{tl.fromTo(p,{x:0,opacity:1},{x:490,opacity:1,duration:1.4,ease:'none'},CL[9][0]+.5+i*.45).fromTo(p,{x:490},{x:0,duration:1.4,ease:'none'},CL[9][0]+2.0+i*.45);});
for(let i=0;i<4;i++)sfx(CL[9][0]+.5+i*.9,'tick',.45);
tl.to(pts,{opacity:0,duration:.2},CL[10][0]-.2).to(red,{opacity:0,duration:.3},CL[10][0]).fromTo(inter,{opacity:0,scale:.4},{opacity:1,scale:1,duration:.5,ease:'back.out(2)'},CL[10][0]+.3);sfx(CL[10][0]+.3,'pop',.7);
tl.to(inter,{opacity:0,duration:.3},T(5,0)-.1);
// S5 animales: pan hacia el chimpancé y el perro
cam(T(5,0),1.3,focus(960,930,.82),'power3.inOut');
cam(CL[12][0]-.3,1.4,focus(2600,900,.8),'power3.inOut');
bostezar(CH,tCh+.1,1.9,'c',.8);onda(tCh-.3,1380,2300,935,.45);
bostezar(DG,tDg+.1,1.9,'d',.8);onda(tDg-.3,2300,2900,935,.45);
// S6 pregunta al espectador y zoom-through en la boca de «tú»
cam(T(6,0),1.5,focus(1720,950,.36),'power3.inOut');blur(T(6,0)+.1,1.0,6);
onda(CL[13][0]+.2,540,1380,935,.3);onda(CL[13][0]+.7,1380,2300,935,.3);onda(CL[13][0]+1.2,2300,2900,935,.3);
cam(DIVE0-.8,.7,focus(1380,900,1.6));
tl.to(B.boca,{scaleY:1,duration:.5,ease:'power2.out'},DIVE0+.1).to(B.parp,{scaleY:1,duration:.4},DIVE0+.1);sfx(DIVE0+.1,'bostezo_f',.9,1.4);
cam(DIVE0,1.4,focus(1380,935,64),'power3.in');
tl.to('#world',{filter:'blur(10px)',duration:1.4,ease:'power2.in'},DIVE0);
tl.to('#bg-grid',{x:0,y:0,scale:1,duration:1.6,ease:'power2.out'},CTA).to('#dust',{x:0,y:0,scale:1,duration:1.6,ease:'power2.out'},CTA);
// ---- etiquetas ----
etiquetas([[1.2,3.3,'¿TE CONTAGIAS?'],[CL[1][0]+.3,C(1,.55),'ALGUIEN BOSTEZA'],[C(1,.6),CL[1][1],'TÚ TAMBIÉN'],[CL[2][0],CL[2][1],'¿QUÉ PASA EN TU CEREBRO?'],
 [CL[3][0]+.2,CL[3][1],'VES EL GESTO'],[CL[4][0],C(4,.6),'EL CEREBRO LO PROCESA'],[C(4,.62),CL[4][1],'RESPUESTA SIMILAR'],
 [CL[5][0],CL[5][1],'BOSTEZO CONTAGIOSO'],[CL[6][0],CL[6][1],'NO HACE FALTA ESTAR CANSADO'],
 [CL[7][0]+.4,C(7,.52),'VER'],[C(7,.55),CL[7][1],'ESCUCHAR'],[CL[8][0]+.5,CL[8][1],'SE SIGUE INVESTIGANDO'],
 [CL[9][0],C(9,.5),'IMITACIÓN'],[C(9,.52),CL[9][1],'PERCEPCIÓN SOCIAL'],[CL[10][0],CL[10][1],'SIN EXPLICACIÓN DEFINITIVA','bad'],
 [CL[11][0],CL[11][1],'NO SOLO HUMANOS'],[tCh,tDg-.2,'CHIMPANCÉS'],[tDg,CL[12][1],'PERROS'],
 [CL[13][0],CL[13][1],'LLEGASTE HASTA AQUÍ'],[CL[15][0],CL[15][1],'¿GANAS DE BOSTEZAR?']]);
