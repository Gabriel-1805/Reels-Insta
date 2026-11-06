// Lista los eventos de animación de un index.html (sin navegador) para el control de concordancia.
//   node comun/concordancia.js episodios/ep02-bostezo/index.html > eventos.json
// Necesita: npm install --no-save gsap jsdom
const {JSDOM}=require(require.resolve('jsdom',{paths:[process.cwd()]}));const fs=require('fs');
const html=fs.readFileSync(process.argv[2],'utf8').replace(/<script src=[^>]*><\/script>/,'').replace(/<script type="module">[\s\S]*?<\/script>/g,'');
const w=new JSDOM(html,{runScripts:'outside-only',pretendToBeVisual:true}).window;
w.eval(fs.readFileSync(require.resolve('gsap/dist/gsap.min.js',{paths:[process.cwd()]}),'utf8'));
w.eval(html.match(/<script>([\s\S]*?)<\/script>/)[1]);
const tl=Object.values(w.__timelines)[0];
const cat=el=>{const id=el.id||'',cl=(el.className&&el.className.baseVal!==undefined?el.className.baseVal:el.className)||'';
  if(['bg-grid','dust'].includes(id)||/\bdot\b/.test(cl))return'fondo';
  if(el.closest&&el.closest('.chunk'))return'subtitulo';
  if(el.closest&&el.closest('#lbls'))return'etiqueta';
  if(['world','tilt','fog','qrclip'].includes(id))return'camara';
  return'objeto';};
const ev=[];
tl.getChildren(false,true,false).forEach(tw=>{const t=tw.startTime();if(t<0.05)return;
  const els=tw.targets().filter(e=>e&&e.nodeType===1);if(!els.length)return;
  const c=cat(els[0]);const e0=els[0];ev.push({t:+t.toFixed(2),cat:c,dur:+tw.duration().toFixed(2),quien:e0.id||(e0.className&&e0.className.baseVal!==undefined?e0.className.baseVal:e0.className)||e0.tagName,n:els.length});});
process.stdout.write(JSON.stringify({duracion:tl.duration(),eventos:ev.sort((a,b)=>a.t-b.t)}));
