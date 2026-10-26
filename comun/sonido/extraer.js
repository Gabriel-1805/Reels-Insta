// Saca las señales de sonido (cues) de un index.html sin navegador.
//   node comun/sonido/extraer.js episodios/ep01-qr/index.html > episodios/ep01-qr/cues.json
// Necesita: npm install --no-save gsap jsdom (en la raíz del repo)
const {JSDOM}=require(require.resolve('jsdom',{paths:[process.cwd()]}));const fs=require('fs');
const html=fs.readFileSync(process.argv[2],'utf8').replace(/<script src=[^>]*><\/script>/,'');
const w=new JSDOM(html,{runScripts:'outside-only',pretendToBeVisual:true}).window;
w.eval(fs.readFileSync(require.resolve('gsap/dist/gsap.min.js',{paths:[process.cwd()]}),'utf8'));
w.eval(html.match(/<script>([\s\S]*?)<\/script>/)[1]);
process.stdout.write(JSON.stringify(w.__cues()));
