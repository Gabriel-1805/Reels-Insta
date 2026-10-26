// propio del episodio: el QR, la coreografía de cámara, las etiquetas y las escenas
  const n=21,m=33,rnd=(()=>{let a=7;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}})();
  let f='',t='',d='';
  for(let r=0;r<n;r++)for(let c=0;c<n;c++){
    const R=`<rect x="${c*m}" y="${r*m}" width="${m-3}" height="${m-3}" rx="5"/>`;
    if((r<7&&c<7)||(r<7&&c>=n-7)||(r>=n-7&&c<7)){const a=r<7?r:r-(n-7),b=c<7?c:c-(n-7);if(a%6===0||b%6===0||(a>1&&a<5&&b>1&&b<5))f+=R;}
    else if((r<8&&c<8)||(r<8&&c>=n-8)||(r>=n-8&&c<8)){}
    else if(r===6||c===6){if((r===6&&c%2===0)||(c===6&&r%2===0))t+=R;}
    else if(rnd()>.5)d+=R;
  }
  const S7=7*m;
  const hl=[[0,0],[(n-7)*m,0],[0,(n-7)*m]].map(([x,y])=>`<rect x="${x-14}" y="${y-14}" width="${S7+25}" height="${S7+25}" fill="none" stroke="#4B5BFF" stroke-width="7" rx="8"/>`+[[x-14,y-14],[x+S7+11,y-14],[x-14,y+S7+11],[x+S7+11,y+S7+11]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r="13" fill="#4B5BFF"/>`).join('')).join('');
  const scr='<path d="M110 120 L330 330" stroke="#fff" stroke-width="13" stroke-linecap="round"/><path d="M200 80 L420 300" stroke="#fff" stroke-width="9" stroke-linecap="round"/><path d="M90 250 L250 420" stroke="#fff" stroke-width="11" stroke-linecap="round"/>';
  document.getElementById('qrsvg').innerHTML=`<defs><filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9"/></filter></defs><g id="dglow" fill="#FFB703" filter="url(#glow)" opacity="0">${d}</g><g id="f" class="m">${f}</g><g id="t" class="m">${t}</g><g id="d" class="m">${d}</g><g id="hl" opacity="0">${hl}</g><g id="scr" opacity="0">${scr}</g><ellipse id="stn" cx="470" cy="470" rx="105" ry="80" fill="#8a6a3b" opacity="0"/>`;
  const W='#qrwrap',NR=document.querySelectorAll('.m rect').length;
  const WIDE={x:0,y:0,s:1,r:0}, DIVE0=CTA-1.4;
  tl.set('#world',{x:0,y:0,scale:1,rotation:0,filter:'blur(0px)'},0);
  cam(0,SC[0][1],{x:0,y:0,s:1.08,r:0},'none');                                   // 0 gancho
  cam(T(1,0),SC[1][1]-SC[1][0],focus(538,911,1.2),'none');                         // 1 respuesta
  cam(T(2,0),1.3,focus(307,680,2.2),'power3.inOut'); blur(T(2,0)+.1,.9);           // 2 cuadrícula
  cam(T(2,0)+1.3,T(2,.8)-T(2,0)-1.3,focus(560,900,2.2),'none');
  cam(T(2,.8),1.3,WIDE);
  cam(T(3,.2),1.2,focus(307,680,2.3),'power3.inOut'); blur(T(3,.2)+.1,.8,6);         // 3 esquinas
  cam(T(3,.38),1.1,focus(769,680,2.3));
  cam(T(3,.55),1.1,focus(307,1142,2.3));
  cam(T(3,.7),1.4,{x:0,y:0,s:1.1,r:0});
  cam(T(4,0),1.4,focus(640,911,1.5));                                              // 4 respaldo
  cam(T(4,0)+1.4,T(4,.95)-T(4,0)-1.4,focus(480,911,1.5),'none');
  cam(T(5,0),1.3,focus(538,911,1.15));                                             // 5 casos límite
  cam(C(12),1.0,WIDE);
  cam(C(14,.62),1.2,focus(307,680,1.8));
  cam(T(7,0),1.2,WIDE,'power3.inOut');                                             // 7 rapidez
  cam(C(19),CL[19][1]-CL[19][0],focus(538,911,1.2),'none');
  cam(T(8,0),1.2,focus(538,911,1.3));                                              // 8 cierre
  cam(T(8,0)+1.2,DIVE0-T(8,0)-1.2,focus(538,911,1.4),'none');
  cam(DIVE0,1.4,focus(307,680,64),'power3.in');                                    // zoom-through al CTA
  tl.to('#world',{filter:'blur(10px)',duration:1.4,ease:'power2.in'},DIVE0);
  tl.to('#bg-grid',{x:0,y:0,scale:1,duration:1.6,ease:'power2.out'},CTA).to('#dust',{x:0,y:0,scale:1,duration:1.6,ease:'power2.out'},CTA);
  etiquetas([[1.9,3.25,'✓ DAÑADO Y SE LEE'],[C(1,.08),CL[1][1],'¿CÓMO LEE LO QUE FALTA?'],[C(2,.3),CL[2][1],'CORRECCIÓN DE ERRORES'],
   [T(2,.1),T(2,.55),'NEGRO = 1  ·  BLANCO = 0'],[T(2,.58),T(2,.8),'1 0 1 1 0 0 1 0'],
   [C(5,.4),T(3,.19),'APUNTA CON LA CÁMARA'],[T(3,.21),T(3,.66),'ESQUINAS → POSICIÓN'],[T(3,.72),T(3,.97),'MÓDULOS → DATOS'],[T(4,.1),T(4,.97),'DATOS + RESPALDO'],
   [CL[9][0],CL[10][1],'RAYADO · SUCIO · TAPADO'],[CL[11][0],CL[11][1],'✓ TODAVÍA SE LEE'],[CL[13][0],CL[13][1],'✕ NO ES INDESTRUCTIBLE','bad'],
   [C(14,.05),C(14,.55),'L 7 % · M 15 % · Q 25 % · H 30 %'],[C(14,.66),CL[14][1],'✕ ESQUINA DAÑADA','bad'],
   [C(18,.5),CL[18][1],'EN SEGUNDOS'],[CL[19][0],CL[19][1],'SIN ENTENDER CADA CUADRADO'],
   [CL[20][0],CL[20][1],'NO ES MAGIA'],[C(21,.1),CL[21][1],'INFORMACIÓN + RESPALDO = ✓']]);
  // ---- escenas ----
  tl.from(W,{scale:.6,autoAlpha:0,duration:.8,ease:'power2.out'},0);
  tl.to('#scr',{opacity:1,duration:.4},.9).to('#stn',{opacity:.8,duration:.4},1.5).to('#scr,#stn',{opacity:0,duration:.4},T(1,.55));   // 0 daño
  tl.to('.m rect',{opacity:.12,duration:.3},T(2,0)).to('.m rect',{opacity:1,duration:.01,stagger:(.58*(SC[2][1]-SC[2][0]))/NR},T(2,.12));   // 2
  tl.to('#d rect,#t rect',{opacity:.15,duration:.4},T(3,.2)).to('#hl',{opacity:1,duration:.5},T(3,.22)).to('#hl',{opacity:0,duration:.3},T(3,.97)).to('#d rect,#t rect',{opacity:1,duration:.4},T(3,.7));   // 3
  tl.to('#f rect',{opacity:.15,duration:.4},T(4,0)).to('#d',{fill:'#FFB703',duration:.4},T(4,.05)).to('#d rect:nth-child(3n)',{fill:'#4B5BFF',duration:.3,stagger:.02},T(4,.45));   // 4
  tl.to('#d',{fill:'#0B0F24',duration:.3},T(5,0)).to('#d rect:nth-child(3n)',{fill:'#0B0F24',duration:.3},T(5,0)).to('#f rect',{opacity:1,duration:.3},T(5,0));   // 5
  tl.to('#scr',{opacity:1,duration:.35},CL[9][0]+.3).to('#stn',{opacity:.8,duration:.35},CL[10][0]+.1).to('#p1',{opacity:1,duration:.4},C(10,.55))
    .to('#scr,#stn,#p1',{opacity:0,duration:.35},CL[12][0]).set('#p1',{x:-237,y:-237,scale:1.421},CL[12][0]+.5)
    .to('#p1',{opacity:1,duration:.4},C(14,.66)).to('#p1',{opacity:0,duration:.4},CL[14][1]);
  tl.to('#beam',{opacity:1,duration:.2},C(18,.1)).to('#beam',{y:815,duration:1.5,ease:'power1.inOut'},C(18,.1)+.1)   // 7 haz de escaneo
    .to('#beam',{y:0,duration:1.5,ease:'power1.inOut'},CL[19][0]).to('#beam',{opacity:0,duration:.3},CL[19][0]+1.6);
  tl.to('#d',{fill:'#FFB703',duration:.4},C(21,.15)).to('#d rect:nth-child(3n)',{fill:'#4B5BFF',duration:.3,stagger:.02},C(21,.3));   // 8

  // ================= FASE 2 =================
  // perspectiva: el QR llega torcido, las esquinas lo «enganchan» y se endereza; luego sigue inclinado en 3D
  const t3=T(3,.7);
  enganchar(t3,{rx:36,ry:-10,rz:12});
  tilt(T(5,0),1.2,{rx:0,ry:0,rz:0});
  tilt(T(7,0),1.3,{rx:34,ry:8,rz:0});
  tilt(T(8,0),1.2,{rx:0,ry:0,rz:0});
  // brillo en los módulos de datos (copia desenfocada debajo)
  tl.to('#dglow',{opacity:.9,duration:.5},T(4,.05)).to('#dglow',{opacity:0,duration:.3},T(5,0)).to('#dglow',{opacity:.9,duration:.5},C(21,.15));
  // bloques de respaldo que llegan a reconstruir la zona tapada
  const bk=document.createElement('div');bk.id='bk';bk.className='abs';document.getElementById('qrwrap').appendChild(bk);
  for(let i=0;i<9;i++){const q=document.createElement('div');q.className='b';q.style.left=(331+(i%3)*58)+'px';q.style.top=(331+Math.floor(i/3)*58)+'px';bk.appendChild(q);}
  tl.fromTo('#bk .b',{x:i=>([-1,0,1][i%3])*260,y:i=>([-1,0,1][Math.floor(i/3)])*260,scale:.3,opacity:0},{x:0,y:0,scale:1,opacity:1,duration:.55,ease:'back.out(1.5)',stagger:.06},CL[11][0])
    .to('#bk .b',{opacity:0,duration:.3},CL[12][0]);

  // ================= FASE 2b: celular que escanea, escenario y zoom a la pantalla =================
  document.getElementById('vfqr').innerHTML=`<svg viewBox="0 0 693 693" width="200" height="200"><g fill="#0B0F24">${f}${t}${d}</g></svg>`;
  tl.set('#cel',{transformPerspective:1000},0);
  // S3: el celular entra desde abajo apuntando al QR; el haz sale de su cámara y barre el código
  tl.fromTo('#cel',{y:900,rotationZ:12},{y:0,rotationZ:0,duration:1.1,ease:'power3.out'},C(5,0)-.2);
  const ts=C(5,.35);
  tl.to('#cono',{opacity:1,duration:.3},ts).to('#cono',{opacity:0,duration:.3},T(3,.19));
  tl.to('#beam',{opacity:1,duration:.2},ts).to('#beam',{y:815,duration:1.3,ease:'power1.inOut'},ts+.1).to('#beam',{opacity:0,duration:.2},ts+1.4).to('#beam',{y:0,duration:.01},ts+1.65);
  // vista amplia: el haz vuelve suave y los bits viajan del QR al celular
  const tw=T(3,.7);
  tl.to('#cono',{opacity:.7,duration:.4},tw).to('#cono',{opacity:0,duration:.3},T(3,.96));
  const bits=document.getElementById('bits');
  for(let i=0;i<8;i++){const q=document.createElement('div');q.className='bit';q.textContent=i%2?'1':'0';q.style.left=(250+i*80)+'px';q.style.top='1040px';bits.appendChild(q);}
  tl.fromTo('#bits .bit',{y:0,x:0,opacity:0},{y:i=>216+(i%3)*10,x:i=>640-(250+i*80),opacity:1,duration:.7,stagger:.12,ease:'power1.in'},tw+.2)
    .to('#bits .bit',{opacity:0,duration:.25},T(3,.97));
  // el celular sale (se ve siempre su pantalla: la cámara trasera apunta al QR)
  tl.to('#cel',{y:900,duration:.8,ease:'power2.in'},T(3,.97));
  // S6: vuelve con la pantalla al frente y la cámara se mete en ella: lo que lee
  tl.fromTo('#cel',{y:900},{y:-370,duration:1.1,ease:'power3.out'},T(6,0));
  cam(T(6,0),1.5,focus(540,1230,2.7),'power3.inOut'); blur(T(6,0)+.1,.9);
  cam(T(6,0)+1.5,SC[6][1]-T(6,0)-1.7,focus(540,1235,2.9),'none');
  tl.fromTo('#dec',{opacity:0,y:20},{opacity:1,y:0,duration:.4},C(15,.25))
    .fromTo('.row:nth-child(1)',{opacity:0,y:30},{opacity:1,y:0,duration:.45},CL[16][0])
    .fromTo('.row:nth-child(2)',{opacity:0,y:30},{opacity:1,y:0,duration:.45},CL[17][0])
    .fromTo('.row:nth-child(3)',{opacity:0,y:30},{opacity:1,y:0,duration:.45},C(17,.55));
  tl.to('#cel',{y:900,duration:1.0,ease:'power2.in'},T(7,0));
  // el visor «engancha» el código: las cuatro esquinas de enfoque se cierran
  tl.fromTo('.vfc',{scale:1.6,opacity:0},{scale:1,opacity:1,duration:.35,ease:'back.out(2)',stagger:.06},ts+.9);

  // ================= SONIDO (señales del episodio) =================
  sfx(.05,'pop',.8);sfx(.9,'scratch',.9);sfx(1.5,'splat',.8);
  sfx(T(2,.12),'shimmer',.8,.58*(SC[2][1]-SC[2][0]));
  sfx(C(5,0)-.2,'swoosh',.9,1.0);sfx(ts+.1,'beam',.9,1.3);sfx(ts+.9,'lock',.9);sfx(T(3,.22),'lock',.8);
  for(let i=0;i<8;i+=2)sfx(tw+.2+i*.12,'tick',.4);
  sfx(t3+1.1,'snap',1);
  sfx(T(3,.97),'swoosh',.5,.8);
  sfx(T(4,.05),'shimmer',.6,.8);sfx(T(4,.45),'shimmer',.5,.8);
  sfx(CL[9][0]+.3,'scratch',.8);sfx(CL[10][0]+.1,'splat',.8);sfx(C(10,.55),'thud',.9);
  for(let i=0;i<3;i++)sfx(CL[11][0]+.25+i*.2,'pop',.45);
  sfx(C(14,.66),'thud',.9);
  sfx(T(6,0),'swoosh',.9,1.1);sfx(C(15,.25),'confirm',.9);sfx(CL[16][0],'tick',1);sfx(CL[17][0],'tick',1);sfx(C(17,.55),'tick',1);
  sfx(T(7,0),'swoosh',.5,1.0);sfx(C(18,.1)+.1,'beam',.9,1.5);sfx(CL[19][0],'beam',.9,1.5);
  sfx(C(21,.15),'shimmer',.6,.8);
