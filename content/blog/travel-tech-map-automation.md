---
title: "Automating Travel Maps"
date: 2024-04-10
summary: "Syncing GPS tracks, journal entries, and cultural research into one living map."
tags: ["travel", "automation", "maps"]
categories: ["Travel"]
cover: "/images/travel-map-automation.svg"
affiliate_disclosure: false
---

The travel map on this site builds itself from structured content and GPS logs. Here's the pipeline:

- **Log capture.** Garmin inReach exports to CSV after each passage.
- **Transformation.** A small Python script converts tracks to GeoJSON and enriches entries with tags.
- **Publishing.** Hugo ingests the data via front matter and `data/travel.yaml`, rendering markers with Leaflet.

Automation keeps storytelling fresh and frees up time for actual exploration.
