# Beispielbilder der Foto-App (Fassung 17 h)

Die Bilder zeigen dem Händler vor jedem Foto, wie das Auto im Bild stehen soll („So soll es aussehen“).

## Herkunft
- Die Bilder hat AutoScales am 25.11.2026 mit Canva-KI erzeugt, nur aus Textbeschreibungen. Es gab keine fremden Vorlagen und keine hochgeladenen Fotos.
- Laut den Canva AI Product Terms gehört das Ergebnis dem Nutzer und darf für jeden rechtmäßigen Zweck verwendet werden, auch geschäftlich.
- Alfred hat geprüft, dass keine Logos, keine Marken und keine Kennzeichen zu sehen sind und dass jede Ansicht richtig herum steht.
- Freigabe von Giannis (25.11.2026): „ich hätte gerne realistik grafiken wie dem angehängten beispielen“, danach „KI-Muster in Canva“ und „Ja, alle erzeugen“.
- Die Originale (1200 × 900, PNG) und die Canva-Quellen liegen in `~/Developer/autoscales-beispielbilder-ki/`.

## Inhalt
- `limousine/`, `kleinwagen/`, `coupe/`, `suv/`, `kompakt/`, `cabrio/`: je 8 Außenansichten. Die Dateinamen sind die Platz-Schlüssel der App: titel, front, dreiviertel_vr, dreiviertel_hr, heck, dreiviertel_hl, seite_l, seite_r.
- `innen/`: cockpit, tacho, vordersitze, ruecksitzbank, kofferraum. Sie gelten für alle Klassen.
- Seit 18 c hat jede der sechs Klassen eigene Bilder (bis 18 b nahmen Kompakt, SUV und Cabrio die Bilder der nächsten Form).
- Jedes Bild ist ein JPEG mit 800 × 600 Pixeln (4:3) und unter 100 KB. Umgerechnet mit `sips` in Qualität 72. Zusammen 53 Dateien mit 2.458.642 Byte. Das Coupé ist zweitürig (Giannis: „Coupé zweitürig“). Cockpit, Tacho, Vordersitze und Rücksitzbank haben ein eigenes Design mit digitalem Tacho (Kilometerstand 36240 km), weil die erste Fassung zu sehr nach VW aussah (Giannis: „es sieht zu sehr nach VW aus, dafür können wir ärger bekommen“). Alfred hat beim Cockpit einen Platzhaltertext von Canva und ein emblemartiges Zeichen wegretuschiert.

## SUV, Kompakt und Cabrio (Fassung 18 c)
- Am 27.11.2026 von Opus Studio 2 mit Canva-KI erzeugt, nach demselben Verfahren wie die übrigen: ein Bild mit 8 Ansichten je Klasse, Stil-Vorlage war das Limousinen-Bild vom 25.11. (beim Cabrio ohne Vorlage, damit es zweitürig wird), dann ausgeschnitten, freigestellt, auf 4:3 gesetzt und mit `sips` in Qualität 72 auf 800 × 600 umgerechnet. Nur Textbeschreibungen, keine fremden Vorlagen und keine hochgeladenen Fotos.
- Geprüft: keine Logos, keine Marken, keine Schrift, alle Kennzeichen leer. Beim Kompakt wurde Schein-Schrift auf dem vorderen Kennzeichen weiß gemacht. Das Cabrio ist ein Zweitürer mit offenem Verdeck. Am SUV-Grill bleibt eine leere Querleiste ohne Zeichen.
- Freigabe von Giannis (28.11.2026): „Beispielbilder sind fürs Erste okay, das können wir so nehmen.“
- 24 Dateien mit 1.028.008 Byte. Canva-Quellen und Originale (1200 × 900, PNG) in `~/Developer/autoscales-beispielbilder-ki/` (`canva/suv_8_ansichten.png`, `canva/kompakt_8_ansichten_ohne_deko.png`, `canva/cabrio3_8_ansichten.png`).
