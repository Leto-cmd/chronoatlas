# ChronoAtlas

**History isn't a list of dates — it's a map that won't sit still.**

Drag a timeline from 500 BC to today and watch real empire borders bloom, fracture, and vanish across a dark world map. Rome at its height. The Mongols at a gallop. The Ottomans at their peak. Same globe, different century.

→ [Open the atlas](https://leto-cmd.github.io/chronoatlas/)

---

## Features

- **Living borders** — 43 keyframe years of real polity geometry, cross-faded as you scrub
- **Timeline that actually works** — drag, scroll-wheel, or arrow keys; tick marks mark years with data
- **Click any territory** — curated stories for dozens of civilizations in a side panel
- **Search the past** — jump straight to Rome, Genghis, Hastings, Hiroshima, and more
- **Event pins** — landmark moments drop onto the map with short context
- **Cinematic entry** — starfield hero, loading sequence, then the atlas

## Quick start

```bash
cd chronoatlas
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # static export → out/
```

## Stack

Next.js · MapLibre GL · Framer Motion · Tailwind · TypeScript

Borders ship as static GeoJSON — no backend required.

## Data

Border geometry is from [historical-basemaps](https://github.com/aourednik/historical-basemaps), simplified with mapshaper and kept in `chronoatlas/public/geojson/`.

Continuous year-by-year borders don't exist as a public dataset. The timeline moves smoothly; the map snaps to the nearest keyframe (those tick marks). Civilization blurbs in `lib/empires.ts` are hand-written for major polities — everything else still appears on the map with a lighter info panel.

## Project layout

```
chronoatlas/
├── app/            # pages + global styles
├── components/     # Hero, Map, Timeline, Search, Sidebar…
├── lib/            # years, empires, events, search, colors
└── public/geojson/ # 43 keyframe border files
```

## Roadmap

- Deeper coverage for the hundreds of named polities in the border data
- Modern (post-2010) political boundaries
- Trade routes, campaigns, comparison mode, and more layers on top of the same core

---

Made for exploring space through time — not just reading about it.
