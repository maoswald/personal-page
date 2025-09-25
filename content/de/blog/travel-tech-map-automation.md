---
title: "Reisekarten automatisieren"
date: 2024-04-10
summary: "GPS-Tracks, Journale und Kulturrecherche in einer lebendigen Karte zusammenführen."
tags: ["reise", "automation", "karten"]
categories: ["Travel"]
cover: "/images/travel-map-automation.svg"
type: "post"
affiliate_disclosure: false
---

Die Reisekarte auf dieser Seite baut sich aus strukturierten Inhalten und GPS-Logs selbst. So funktioniert die Pipeline:

- **Log-Erfassung.** Garmin inReach exportiert nach jeder Passage CSV-Dateien.
- **Transformation.** Ein kleines Python-Skript wandelt Tracks in GeoJSON um und reichert Einträge mit Tags an.
- **Publishing.** Hugo liest die Daten über Front Matter und `data/travel.yaml` ein und rendert Marker mit Leaflet.

Automatisierung hält das Storytelling frisch und schafft Zeit für echte Erkundung.
