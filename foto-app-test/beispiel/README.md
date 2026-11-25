# Beispielbilder der Foto-App (Fassung 17 h)

Die Bilder zeigen dem Händler vor jedem Foto, wie das Auto im Bild stehen soll („So soll es aussehen“).

## Herkunft
- Die Bilder hat AutoScales am 25.11.2026 mit Canva-KI erzeugt, nur aus Textbeschreibungen. Es gab keine fremden Vorlagen und keine hochgeladenen Fotos.
- Laut den Canva AI Product Terms gehört das Ergebnis dem Nutzer und darf für jeden rechtmäßigen Zweck verwendet werden, auch geschäftlich.
- Alfred hat geprüft, dass keine Logos, keine Marken und keine Kennzeichen zu sehen sind und dass jede Ansicht richtig herum steht.
- Freigabe von Giannis (25.11.2026): „ich hätte gerne realistik grafiken wie dem angehängten beispielen“, danach „KI-Muster in Canva“ und „Ja, alle erzeugen“.
- Die Originale (1200 × 900, PNG) und die Canva-Quellen liegen in `~/Developer/autoscales-beispielbilder-ki/`.

## Inhalt
- `limousine/`, `kleinwagen/`, `coupe/`: je 8 Außenansichten. Die Dateinamen sind die Platz-Schlüssel der App: titel, front, dreiviertel_vr, dreiviertel_hr, heck, dreiviertel_hl, seite_l, seite_r.
- `innen/`: cockpit, tacho, vordersitze, ruecksitzbank, kofferraum. Sie gelten für alle Klassen.
- Andere Klassen bekommen die Bilder der nächsten Form: Kompakt nimmt Kleinwagen, SUV nimmt Limousine, Cabrio nimmt Coupé.
- Jedes Bild ist ein JPEG mit 800 × 600 Pixeln (4:3) und unter 100 KB. Umgerechnet mit `sips` in Qualität 72, das Tacho-Bild in 62. Zusammen 29 Dateien mit 1.460.596 Byte. Das Coupé ist zweitürig (Giannis: „Coupé zweitürig“).
