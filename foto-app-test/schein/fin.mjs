// FIN (Fahrzeug-Identifizierungsnummer, Feld E) aus gelesenen Textzeilen finden und pruefen.
// Pruefziffer in Feld 3 der Zulassungsbescheinigung Teil I: Buchstabenwerte nach ISO 3779,
// Gewichte 9..2, 10, 9..2 von links, Summe mod 11, Rest 10 = "X" (an zwei echten Paaren belegt, arbeit/pz_test.mjs).
const WERT = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9, S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9 };
const GEWICHT = [9, 8, 7, 6, 5, 4, 3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2];

export function pruefziffer(fin) {
  let s = 0;
  for (let i = 0; i < 17; i++) { const c = fin[i]; const v = c >= '0' && c <= '9' ? +c : WERT[c]; if (v === undefined) return null; s += v * GEWICHT[i]; }
  const r = s % 11; return r === 10 ? 'X' : String(r);
}

function sauber(t) { return String(t || '').toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/[OQ]/g, '0').replace(/I/g, '1'); }

function plausibel(f) {
  if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(f)) return false;
  if (!/^\d{3}$/.test(f.slice(14))) return false;            // Stellen 15 bis 17 sind Ziffern
  const z = f.replace(/\D/g, '').length; if (z < 5 || z > 15) return false;
  if (!/[A-Z]/.test(f.slice(0, 3))) return false;            // Herstellerkennung traegt Buchstaben
  return true;
}

// zeilen: [{ text, mean }] -> { fin, sicher, pz, kandidaten }
export function finSuchen(zeilen) {
  const kand = new Map();
  const ziffern = new Set();
  for (const z of zeilen) {
    const roh = String(z.text || '').trim();
    if (/^[0-9X]$/i.test(roh)) ziffern.add(roh.toUpperCase());
    const m = roh.match(/^\(?3\)?\s*([0-9X])$/i); if (m) ziffern.add(m[1].toUpperCase());
    for (const teil of [roh, ...roh.split(/[^A-Za-z0-9]+/)]) {
      const s = sauber(teil);
      if (s.length < 17 || s.length > 19) continue;            // nur ein Wort, das eine FIN sein kann (mit Feldzeichen davor)
      const mitFeld = s.length === 18 && s[0] === 'E' && plausibel(s.slice(1));   // Feldzeichen E klebt vor der FIN
      for (let i = mitFeld ? 1 : 0; i + 17 <= s.length; i++) {
        const f = s.slice(i, i + 17);
        if (!plausibel(f)) continue;
        const alt = kand.get(f);
        const eintrag = { fin: f, mean: z.mean || 0, genau: s.length === 17 || mitFeld, pz: pruefziffer(f) };
        if (!alt || (eintrag.genau && !alt.genau) || eintrag.mean > alt.mean) kand.set(f, eintrag);
      }
    }
  }
  const liste = [...kand.values()].map((k) => ({ ...k, pzPasst: ziffern.has(k.pz) }));
  liste.sort((a, b) => (b.pzPasst - a.pzPasst) || (b.genau - a.genau) || (b.mean - a.mean));
  const beste = liste[0] || null;
  return { fin: beste ? beste.fin : null, mean: beste ? beste.mean : 0, sicher: !!(beste && beste.pzPasst), pz: beste ? beste.pz : null, kandidaten: liste.slice(0, 5) };
}
