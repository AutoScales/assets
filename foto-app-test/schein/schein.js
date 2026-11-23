// Fahrzeugschein am Gerät lesen: findet die FIN (Feld E) im Foto. Alles läuft im Browser, nichts verlässt das Gerät.
// Schnittstelle für die Foto-App: window.ScheinLesen.lesen(blob, { zeitMs }) -> Promise<{ fin, ms, grund }>.
// Es verlässt nur die FIN das Modul. Gelesener Text (auch Halterdaten) wird nicht gespeichert und nicht zurückgegeben.
import { finSuchen } from './fin.mjs';

const BASIS = new URL('.', import.meta.url).href;
const DATEI = { det: 'det.onnx', rec: 'rec.onnx', tabelle: 'zeichen.txt' };
const KANTE = 2000;          // lange Bildkante für das Lesen
const BREIT = 4;             // nur Fundstellen lesen, die mindestens 4-mal so breit wie hoch sind (eine FIN ist ein langes Wort)
const SICHER = 0.8;        // darunter gilt eine gelesene FIN als nicht lesbar (lieber keine als eine falsche)
const pause = () => new Promise((r) => setTimeout(r, 0));   // gibt der Seite zwischen den Rechenschritten Luft
let leserP = null, weg = '';

function leser() {
  if (!leserP) leserP = (async () => {
    const [ort, ocr, tabelle] = await Promise.all([
      import(BASIS + 'ort.wasm.min.mjs'), import(BASIS + 'esearch-ocr.js'),
      fetch(BASIS + DATEI.tabelle).then((r) => { if (!r.ok) throw new Error('Zeichen-Tabelle fehlt'); return r.text(); }),
    ]);
    ort.env.wasm.numThreads = 1; ort.env.wasm.wasmPaths = BASIS;
    const start = (nebenher) => { ort.env.wasm.proxy = nebenher; return ocr.init({ ort, det: { input: BASIS + DATEI.det }, rec: { input: BASIS + DATEI.rec, decodeDic: tabelle.replace(/^\r?\n/, '') } }); };
    // Die Modelle rechnen in einem eigenen Arbeiter (Worker), damit Kamera und Knöpfe flüssig bleiben. Geht das nicht, rechnet die Seite selbst.
    try { const l = await start(true); weg = 'arbeiter'; return l; } catch (e) { const l = await start(false); weg = 'seite'; return l; }
  })().catch((e) => { leserP = null; throw e; });
  return leserP;
}

function bildLaden(blob) {
  return new Promise((ok, nein) => {
    const url = URL.createObjectURL(blob), img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); ok(img); };
    img.onerror = () => { URL.revokeObjectURL(url); nein(new Error('Bild nicht lesbar')); };
    img.src = url;
  });
}

// viertel: 0, 1 (90 Grad im Uhrzeigersinn), 3 (270 Grad)
function pixel(img, viertel) {
  const w0 = img.naturalWidth || img.width, h0 = img.naturalHeight || img.height;
  const f = Math.min(1, KANTE / Math.max(w0, h0)), w = Math.round(w0 * f), h = Math.round(h0 * f);
  const c = document.createElement('canvas'); const quer = viertel % 2 === 1;
  c.width = quer ? h : w; c.height = quer ? w : h;
  const x = c.getContext('2d', { willReadFrequently: true });
  x.translate(c.width / 2, c.height / 2); x.rotate(viertel * Math.PI / 2); x.drawImage(img, -w / 2, -h / 2, w, h);
  const d = x.getImageData(0, 0, c.width, c.height); c.width = c.height = 0; return d;
}

async function einmal(l, img, viertel, ende) {
  await pause();
  const stellen = await l.det(pixel(img, viertel));
  const lang = stellen.filter((s) => s.img && s.img.width >= BREIT * s.img.height);
  const zeilen = [];
  for (let i = 0; i < lang.length; i += 6) {
    await pause(); if (performance.now() > ende) return { zeit: true };
    for (const z of await l.rec(lang.slice(i, i + 6))) zeilen.push({ text: z.text, mean: z.mean });
  }
  const f = finSuchen(zeilen);
  return { fin: f.fin && f.mean >= SICHER ? f.fin : null };
}

async function lesen(blob, opt) {
  const zeitMs = (opt && opt.zeitMs) || 60000, t0 = performance.now(), ende = t0 + zeitMs;
  const fertig = (fin, grund) => ({ fin: fin || null, ms: Math.round(performance.now() - t0), grund: fin ? '' : grund });
  let zeit; const uhr = new Promise((ok) => { zeit = setTimeout(() => ok(fertig(null, 'zeit')), zeitMs); });
  const arbeit = (async () => {
    const [l, img] = await Promise.all([leser(), bildLaden(blob)]);
    for (const viertel of [0, 1, 3]) {                       // erst wie fotografiert, dann um 90 und 270 Grad gedreht
      if (performance.now() > ende) return fertig(null, 'zeit');
      const e = await einmal(l, img, viertel, ende);
      if (e.zeit) return fertig(null, 'zeit');
      if (e.fin) return fertig(e.fin, '');
    }
    return fertig(null, 'keine_fin');
  })().catch((e) => fertig(null, 'fehler: ' + String(e && e.message || e).slice(0, 80)));
  const erg = await Promise.race([arbeit, uhr]); clearTimeout(zeit); return erg;
}

// vorladen(): Modelle schon holen, bevor das Foto da ist (zum Beispiel beim Öffnen des Schein-Schritts)
window.ScheinLesen = { lesen, vorladen: () => leser().then(() => true, () => false), stand: 'schein-1', weg: () => weg };
