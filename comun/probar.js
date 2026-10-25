// Banco de pruebas de la línea de tiempo (sin navegador). Uso:
//   npm install --no-save gsap jsdom      (una vez)
//   node comun/probar.js episodios/ep01-qr/index.html
// Comprueba: errores al ejecutar, duración, posiciones de cámara, animaciones que se pisan y determinismo.
// NO sustituye a mirar el preview: no ve imágenes.
const {JSDOM}=require('jsdom');const fs=require('fs');
const file=process.argv[2]||'index.html';
const html=fs.readFileSync(file,'utf8').replace(/<script src=[^>]*><\/script>/,'');
const w=new JSDOM(html,{runScripts:'outside-only',pretendToBeVisual:true}).window;
w.eval(fs.readFileSync(require.resolve('gsap/dist/gsap.min.js'),'utf8'));
try{w.eval(html.match(/<script>([\s\S]*?)<\/script>/)[1])}catch(e){console.log('ERROR al ejecutar:',e.message);process.exit(1)}
const id=Object.keys(w.__timelines)[0],tl=w.__timelines[id],g=w.gsap;
console.log('composición:',id,'| duración:',tl.duration().toFixed(2),'s');
const W=w.document.getElementById('world');
if(W){const T=tl.duration();for(let i=1;i<10;i++){const t=T*i/10;tl.time(t,false);console.log(('  '+t.toFixed(1)).slice(-5),'s | zoom',(+g.getProperty(W,'scale')).toFixed(2),'x',(+g.getProperty(W,'x')).toFixed(0),'y',(+g.getProperty(W,'y')).toFixed(0));}}
const ignora=['duration','ease','stagger','delay','onUpdate','snap','immediateRender','overwrite','repeat','yoyo','parent','data'];
const uso=new Map();let malos=0;
tl.getChildren(false,true,false).forEach(tw=>{const props=Object.keys(tw.vars||{}).filter(k=>!ignora.includes(k));
  tw.targets().forEach(el=>props.forEach(p=>{const pp=p==='autoAlpha'?'opacity':p;const o=uso.get(el)||{};(o[pp]=o[pp]||[]).push([tw.startTime(),tw.startTime()+tw.duration()]);uso.set(el,o);}));});
for(const [el,o] of uso)for(const [p,a] of Object.entries(o)){a.sort((x,y)=>x[0]-y[0]);for(let i=1;i<a.length;i++)if(a[i][0]<a[i-1][1]-0.001&&a[i][1]>a[i][0]){malos++;if(malos<=10)console.log('SOLAPE',el.id||el.className||el.tagName,p,a[i-1].map(x=>x.toFixed(2)).join('-'),'con',a[i].map(x=>x.toFixed(2)).join('-'));}}
console.log('animaciones que se pisan:',malos);
if(W){tl.time(tl.duration()*.5,false);const a=g.getProperty(W,'x');tl.time(1,false);tl.time(tl.duration()*.5,false);console.log('determinista:',a===g.getProperty(W,'x'));}
