"""Efectos de sonido sintetizados con numpy (sin muestras de terceros: sin problemas de licencia).
Whooshes graves y suaves; los sonidos del QR (clics, bips, haz, bits, confirmaciones) son electrónicos: onda cuadrada + reducción de resolución.
Cada función devuelve audio mono a 44,1 kHz normalizado a RMS = 1; el nivel final lo fija mezclar.py."""
import numpy as np, wave
from pathlib import Path
SR=44100
def _t(d): return np.arange(int(d*SR))/SR
def _norm(x):
    a=x[np.abs(x)>1e-4]; return x/(np.sqrt(np.mean(a**2))+1e-12) if len(a) else x
def _noise(d,seed=1): return np.random.default_rng(seed).standard_normal(int(d*SR))
def _svf(x,fc,q=2.0,mode='band'):
    """Filtro de variable de estado; fc puede variar en el tiempo (array)."""
    f=2*np.sin(np.pi*np.clip(fc,20,SR/6)/SR); lo=bp=0.0; out=np.empty(len(x)); qq=1/q
    for i in range(len(x)):
        lo+=f[i]*bp; hi=x[i]-lo-qq*bp; bp+=f[i]*hi; out[i]=bp if mode=='band' else lo
    return out
def _sweep(d,f0,f1): t=np.linspace(0,1,int(d*SR)); return f0*(f1/f0)**t
def whoosh(d=1.0,up=True,q=1.6,f=(110,1100),g=2.0):
    """Más grave y suave: banda baja, cuerpo en graves y ataque lento."""
    t=np.linspace(0,1,int(d*SR)); fc=_sweep(d,*(f if up else f[::-1]))
    x=_svf(_noise(d,3),fc,q); x=x/(np.abs(x).max()+1e-9)
    body=np.sin(2*np.pi*np.cumsum(_sweep(d,55,105) if up else _sweep(d,105,55))/SR)*.6
    return _norm((x*.8+body)*np.sin(np.pi*t)**g)
def whoosh_through(d=1.4):
    t=np.linspace(0,1,int(d*SR)); x=_svf(_noise(d,5),_sweep(d,80,2400),1.6); x=x/(np.abs(x).max()+1e-9)
    body=np.sin(2*np.pi*np.cumsum(_sweep(d,45,130))/SR)*.7; e=t**2.5; e[-int(.04*SR):]*=np.linspace(1,0,int(.04*SR))
    return _norm((x*.8+body)*e)
def _sq(f,t): return np.sign(np.sin(2*np.pi*f*t))
def _crush(x,bits=6,div=3):
    y=np.repeat(x[::div],div)[:len(x)]; q=2**(bits-1); return np.round(y*q)/q
def _soft(x,f=5500): return _svf(x,np.full(len(x),float(f)),0.7,'low')
def _bip(f,d,dec,bits=5,div=2,tot=None):
    n=int((tot or d)*SR); t=np.arange(n)/SR; x=_sq(f,t)*np.exp(-t/dec)*np.minimum(1,t/.001)*(t<d); return _soft(_crush(x,bits,div))
def tick(f=2200,d=.045): return _norm(_bip(f,d,.011))

def pop(d=.12):
    t=_t(d); x=np.sin(2*np.pi*np.cumsum(_sweep(d,600,1300))/SR)*np.exp(-t/.03)*np.minimum(1,t/.002); return _norm(_crush(x,6,2))

def tap(d=.16):
    t=_t(d); ph=2*np.pi*np.cumsum(_sweep(d,170,55))/SR; x=np.sin(ph)*np.exp(-t/.05); x[:int(.002*SR)]+=_noise(.002,4)[:int(.002*SR)]*.4; return _norm(x)
def _nota(f,d,dec,t0=0.0,tot=.6):
    n=int(tot*SR); t=np.arange(n)/SR-t0; m=t>=0; x=np.zeros(n)
    x[m]=(np.sin(2*np.pi*f*t[m])+.3*np.sin(4*np.pi*f*t[m]))*np.exp(-t[m]/dec)*np.minimum(1,t[m]/.004); return x
def confirm():
    x=np.zeros(int(.5*SR))
    for k,f in enumerate((880,1320,1760)): b=_bip(f,.12,.07,6,2); i=int(k*.05*SR); x[i:i+len(b)]+=b
    return _norm(x)

def enviado():
    x=np.zeros(int(.7*SR))
    for k,f in enumerate((660,990,1320,1980)): b=_bip(f,.2,.1,6,2); i=int(k*.06*SR); x[i:i+len(b)]+=b*(1+.15*k)
    return _norm(x)

def swoosh(d=.8): return whoosh(d,True,1.5,(200,1200),2.0)
def tilt(d=1.0): return whoosh(d,True,1.4,(80,500),1.5)
def impact(d=.9):
    t=_t(d); x=np.sin(2*np.pi*np.cumsum(_sweep(d,55,36))/SR)*np.exp(-t/.28)+_svf(_noise(d,6),_sweep(d,900,120),1.0,'low')*np.exp(-t/.08)*.5; return _norm(x)
def scratch(d=.3):
    t=np.linspace(0,1,int(d*SR)); x=_svf(_noise(d,7),_sweep(d,4000,1500),3.0); return _norm(x/(np.abs(x).max()+1e-9)*(np.abs(np.sin(3*np.pi*t))**1.5)*(1-t))
def splat(d=.22): t=_t(d); return _norm(_svf(_noise(d,8),np.full(int(d*SR),900.),1.0,'low')*np.exp(-t/.06))
def thud(d=.3):
    t=_t(d); return _norm(np.sin(2*np.pi*np.cumsum(_sweep(d,95,45))/SR)*np.exp(-t/.09)+_svf(_noise(d,9),np.full(int(d*SR),500.),1.0,'low')*np.exp(-t/.02)*.4)
def snap(d=.2): t=_t(d); return _norm(_bip(900,d,.025)*.9+np.sin(2*np.pi*np.cumsum(_sweep(d,140,70))/SR)*np.exp(-t/.05))

def lock(d=.25):
    x=np.zeros(int(d*SR)); a=_bip(1500,.06,.02); b=_bip(2250,.06,.02); x[:len(a)]+=a; x[int(.07*SR):int(.07*SR)+len(b)]+=b; return _norm(x)

def error(d=.4):
    x=np.zeros(int(d*SR)); t=_t(.1)
    for k in (0,.16):
        p=((2*((120*t)%1)-1))*np.exp(-t/.07); x[int(k*SR):int(k*SR)+len(p)]+=p
    return _norm(_svf(x,np.full(len(x),1400.),.8,'low'))

def beam(d=1.3):
    n=int(d*SR); t=np.arange(n)/SR; rng=np.random.default_rng(21); notas=np.array([220,330,440,660,880.]); paso=int(.065*SR)
    f=np.repeat(rng.choice(notas,n//paso+1),paso)[:n]; sq=np.sign(np.sin(2*np.pi*np.cumsum(f)/SR))*.5
    saw=(2*((np.cumsum(_sweep(d,180,520))/SR)%1)-1)*np.sign(np.sin(2*np.pi*30*t))*.4
    return _norm(_soft(_crush(sq+saw,6,2),4500)*np.minimum(1,np.minimum(t/.12,(d-t)/.2)))

def shimmer(d=.8):
    """Lluvia de datos: ráfagas de bips digitales sobre un fondo suave."""
    n=int(d*SR); rng=np.random.default_rng(11); x=np.zeros(n+int(.1*SR))
    for _ in range(max(3,int(d*14))):
        b=_bip(rng.choice([1200,1800,2400,3000,3600]),.04,.015)*rng.uniform(.3,1); i=int(rng.uniform(0,max(.01,d-.08))*SR); x[i:i+len(b)]+=b
    return _norm(x[:n]*np.minimum(1,(d-np.arange(n)/SR)/.1))

def crear(nombre,d=None):
    f={'whoosh_in':lambda:whoosh(d or 1.0,True),'whoosh_out':lambda:whoosh(d or 1.0,False),'whoosh_through':lambda:whoosh_through(d or 1.4),
       'tilt':lambda:tilt(d or 1.0),'swoosh':lambda:swoosh(d or .8),'beam':lambda:beam(d or 1.3),'shimmer':lambda:shimmer(d or .8),
       'tick':tick,'pop':pop,'tap':tap,'confirm':confirm,'enviado':enviado,'impact':impact,'scratch':scratch,'splat':splat,'thud':thud,'snap':snap,'lock':lock,'error':error}
    return f[nombre]()
# nivel de cada efecto respecto a la voz (dB): lo que se oye de fondo y lo que destaca
GANANCIA={'whoosh_in':-12,'whoosh_out':-13,'whoosh_through':-10,'tilt':-17,'tick':-18,'error':-15,'pop':-17,'tap':-14,'confirm':-14,'enviado':-12,
          'swoosh':-15,'impact':-11,'scratch':-15,'splat':-16,'shimmer':-19,'lock':-16,'snap':-15,'beam':-19,'thud':-13}
def guardar(x,ruta):
    w=wave.open(str(ruta),'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(x/ (np.abs(x).max()+1e-9)*.9,-1,1)*32767).astype(np.int16).tobytes()); w.close()
if __name__=='__main__':
    out=Path(__file__).parent/'efectos'; out.mkdir(exist_ok=True)
    for n in GANANCIA: guardar(crear(n),out/f'{n}.wav'); print('efecto',n)
