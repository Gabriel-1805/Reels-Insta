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
  document.getElementById('qrsvg').innerHTML=`<g id="f" class="m">${f}</g><g id="t" class="m">${t}</g><g id="d" class="m">${d}</g><g id="hl" opacity="0">${hl}</g><g id="scr" opacity="0">${scr}</g><ellipse id="stn" cx="470" cy="470" rx="105" ry="80" fill="#8a6a3b" opacity="0"/>`;
  const W='#qrwrap',NR=document.querySelectorAll('.m rect').length;
  const WIDE={x:0,y:0,s:1,r:0}, DIVE0=CTA-1.4;
  tl.set('#world',{x:0,y:0,scale:1,rotation:0,filter:'blur(0px)'},0);
  cam(0,SC[0][1],{x:0,y:0,s:1.08,r:0},'none');                                   // 0 gancho
  cam(T(1,0),SC[1][1]-SC[1][0],focus(538,911,1.2),'none');                         // 1 respuesta
  cam(T(2,0),1.3,focus(307,680,2.2),'power3.inOut'); blur(T(2,0)+.1,.9);           // 2 cuadrícula
  cam(T(2,0)+1.3,T(2,.8)-T(2,0)-1.3,focus(560,900,2.2),'none');
  cam(T(2,.8),1.3,WIDE);
  cam(T(3,0),1.2,focus(307,680,2.3),'power3.inOut'); blur(T(3,0)+.1,.8,6);         // 3 esquinas
  cam(T(3,.22),1.1,focus(769,680,2.3));
  cam(T(3,.45),1.1,focus(307,1142,2.3));
  cam(T(3,.68),1.4,{x:0,y:0,s:1.1,r:0});
  cam(T(4,0),1.4,focus(640,911,1.5));                                              // 4 respaldo
  cam(T(4,0)+1.4,T(4,.95)-T(4,0)-1.4,focus(480,911,1.5),'none');
  cam(T(5,0),1.3,focus(538,911,1.15));                                             // 5 casos límite
  cam(C(12),1.0,WIDE);
  cam(C(14,.62),1.2,focus(307,680,1.8));
  cam(T(6,0),1.3,{x:0,y:-279,s:.4,r:0},'power3.inOut'); blur(T(6,0)+.1,.9);        // 6 resultado
  cam(T(6,0)+1.3,SC[6][1]-T(6,0)-2.5,{x:0,y:-292,s:.42,r:0},'none');
  cam(T(7,0),1.2,WIDE,'power3.inOut');                                             // 7 rapidez
  cam(C(19),CL[19][1]-CL[19][0],focus(538,911,1.2),'none');
  cam(T(8,0),1.2,focus(538,911,1.3));                                              // 8 cierre
  cam(T(8,0)+1.2,DIVE0-T(8,0)-1.2,focus(538,911,1.4),'none');
  cam(DIVE0,1.4,focus(307,680,64),'power3.in');                                    // zoom-through al CTA
  tl.to('#world',{filter:'blur(10px)',duration:1.4,ease:'power2.in'},DIVE0);
  tl.to('#bg-grid',{x:0,y:0,scale:1,duration:1.6,ease:'power2.out'},CTA).to('#dust',{x:0,y:0,scale:1,duration:1.6,ease:'power2.out'},CTA);
  etiquetas([[1.9,3.25,'✓ DAÑADO Y SE LEE'],[C(1,.08),CL[1][1],'¿CÓMO LEE LO QUE FALTA?'],[C(2,.3),CL[2][1],'CORRECCIÓN DE ERRORES'],
   [T(2,.1),T(2,.55),'NEGRO = 1  ·  BLANCO = 0'],[T(2,.58),T(2,.8),'1 0 1 1 0 0 1 0'],
   [T(3,.02),T(3,.6),'ESQUINAS → POSICIÓN'],[T(3,.68),T(3,.97),'MÓDULOS → DATOS'],[T(4,.1),T(4,.97),'DATOS + RESPALDO'],
   [CL[9][0],CL[10][1],'RAYADO · SUCIO · TAPADO'],[CL[11][0],CL[11][1],'✓ TODAVÍA SE LEE'],[CL[13][0],CL[13][1],'✕ NO ES INDESTRUCTIBLE','bad'],
   [C(14,.05),C(14,.55),'L 7 % · M 15 % · Q 25 % · H 30 %'],[C(14,.66),CL[14][1],'✕ ESQUINA DAÑADA','bad'],
   [C(18,.5),CL[18][1],'EN SEGUNDOS'],[CL[19][0],CL[19][1],'SIN ENTENDER CADA CUADRADO'],
   [CL[20][0],CL[20][1],'NO ES MAGIA'],[C(21,.1),CL[21][1],'INFORMACIÓN + RESPALDO = ✓']]);
  // ---- escenas ----
  tl.from(W,{scale:.6,autoAlpha:0,duration:.8,ease:'power2.out'},0);
  tl.to('#scr',{opacity:1,duration:.4},.9).to('#stn',{opacity:.8,duration:.4},1.5).to('#scr,#stn',{opacity:0,duration:.4},T(1,.55));   // 0 daño
  tl.to('.m rect',{opacity:.12,duration:.3},T(2,0)).to('.m rect',{opacity:1,duration:.01,stagger:(.58*(SC[2][1]-SC[2][0]))/NR},T(2,.12));   // 2
  tl.to('#d rect,#t rect',{opacity:.15,duration:.4},T(3,0)).to('#hl',{opacity:1,duration:.5},T(3,.03)).to('#hl',{opacity:0,duration:.3},T(3,.66)).to('#d rect,#t rect',{opacity:1,duration:.4},T(3,.68));   // 3
  tl.to('#f rect',{opacity:.15,duration:.4},T(4,0)).to('#d',{fill:'#FFB703',duration:.4},T(4,.05)).to('#d rect:nth-child(3n)',{fill:'#4B5BFF',duration:.3,stagger:.02},T(4,.45));   // 4
  tl.to('#d',{fill:'#0B0F24',duration:.3},T(5,0)).to('#d rect:nth-child(3n)',{fill:'#0B0F24',duration:.3},T(5,0)).to('#f rect',{opacity:1,duration:.3},T(5,0));   // 5
  tl.to('#scr',{opacity:1,duration:.35},CL[9][0]+.3).to('#stn',{opacity:.8,duration:.35},CL[10][0]+.1).to('#p1',{opacity:1,duration:.4},C(10,.55))
    .to('#scr,#stn,#p1',{opacity:0,duration:.35},CL[12][0]).set('#p1',{x:-237,y:-237,scale:1.421},CL[12][0]+.5)
    .to('#p1',{opacity:1,duration:.4},C(14,.66)).to('#p1',{opacity:0,duration:.4},CL[14][1]);
  tl.fromTo('.card:nth-child(1)',{y:60,opacity:0},{y:0,opacity:1,duration:.5},CL[16][0])                          // 6 tarjetas
    .fromTo('.card:nth-child(2)',{y:60,opacity:0},{y:0,opacity:1,duration:.5},CL[17][0])
    .fromTo('.card:nth-child(3)',{y:60,opacity:0},{y:0,opacity:1,duration:.5},C(17,.55));
  tl.to('#beam',{opacity:1,duration:.2},C(18,.1)).to('#beam',{y:815,duration:1.5,ease:'power1.inOut'},C(18,.1)+.1)   // 7 haz de escaneo
    .to('#beam',{y:0,duration:1.5,ease:'power1.inOut'},CL[19][0]).to('#beam',{opacity:0,duration:.3},CL[19][0]+1.6);
  tl.to('#d',{fill:'#FFB703',duration:.4},C(21,.15)).to('#d rect:nth-child(3n)',{fill:'#4B5BFF',duration:.3,stagger:.02},C(21,.3));   // 8
  tl.from('#fol',{y:-40,opacity:0,duration:.4},CTA+.1).to('#fol1',{opacity:0,duration:.2},C(22,.12)).to('#fol2',{opacity:1,duration:.2},C(22,.12))   // 9 CTA
    .from('#sheet',{y:300,opacity:0,duration:.6},CTA+.3).from('.av',{scale:0,duration:.3,stagger:.1},CTA+.9)
    .fromTo('#ring',{scale:.2,opacity:1},{scale:1.4,opacity:0,duration:.6},C(22,.42)).to('#sent',{opacity:1,duration:.3},C(22,.55));
