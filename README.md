# ChronoAtlas

Explore history spatially, not just chronologically. Drag the timeline and
watch real empire borders expand, contract, and disappear on a dark, glowing
world map.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build && npm run start` for a
production build (or just go to the github pages).


## What's implemented (MVP)

- **Landing hero** — animated CSS/SVG globe, starfield, "Explore" button,
  ambient timeline preview (`components/Hero.tsx`).
- **Loading sequence** — "Drawing map... / Loading civilizations... / Preparing
  timeline..." with a zooming-globe transition (`components/LoadingSequence.tsx`).
- **Interactive map** — MapLibre GL, dark raster basemap (labels stripped),
  with historical borders drawn as a colored GeoJSON overlay
  (`components/MapView.tsx`).
- **Timeline slider** — 500 BC to 2025, draggable, mouse-wheel, and native
  keyboard-arrow support, with small tick marks on every year that has real
  border data (`components/Timeline.tsx`).
- **Historical borders** — 43 keyframe years of real polity boundaries (see
  Data section), cross-faded in/out on year change rather than hard-cut.
- **Info panel** — click any territory or event pin to open a right-hand
  sidebar with curated details (`components/Sidebar.tsx`, `lib/empires.ts`).
- **Search** — jumps the timeline + camera + opens the info panel for ~24
  curated queries (empires, people, places) (`components/SearchBar.tsx`,
  `lib/search.ts`).
- **Event pins** — 11 curated events (Hastings, Magna Carta, fall of
  Constantinople, Columbus, Hiroshima, etc.) with map markers and popups
  (`lib/events.ts`).
- **Dark theme** — navy background (#0A0F1F), blue/gold glow accents,
  serif display type for headings, monospace for the year/data readouts.

## Data

Border geometry comes from the open-source `historical-basemaps` project
(github.com/aourednik/historical-basemaps), simplified with `mapshaper` and
copied into `public/geojson/`. There is no dataset of continuous, arbitrary-
year borders anywhere — real data only exists at specific keyframe years, so
the timeline snaps to the nearest keyframe (visible as tick marks) for what
it actually draws, while the year readout itself moves continuously. This
was a deliberate simplification: a general-purpose engine that geometrically
interpolates arbitrary historical polygons is a research project, not a
weekend build.

Empire/civilization descriptions in `lib/empires.ts` are curated by hand for
about 35 major civilizations (original writing, not scraped). Territories
without curated info still work -- clicking them opens the sidebar with just
the name and a note that a detailed entry isn't ready yet.

## Folder structure

```
chronoatlas/
  app/
    page.tsx          - phase orchestration (landing -> loading -> atlas)
    layout.tsx, globals.css
  components/
    Hero.tsx, LoadingSequence.tsx
    MapView.tsx, Timeline.tsx, SearchBar.tsx, Sidebar.tsx
  lib/
    years.ts           - keyframe years, formatting, nearest-keyframe logic
    empires.ts          - curated civilization info
    events.ts           - curated historical events
    search.ts           - curated search index
    colors.ts           - deterministic per-territory coloring
  public/geojson/       - 43 keyframe-year border files
```

## Known gaps / next steps

- Only ~35 civilizations have curated info panels; the rest show a generic
  fallback. Worth expanding since the underlying border data covers hundreds
  of named polities per year.
- The "2025" end of the timeline reuses 2010 borders (the last available
  keyframe) -- a current-day political boundary layer would need a separate
  modern dataset (e.g. Natural Earth).
- Stretch goals from the brief -- trade routes, population heatmap, religion/
  language layers, military campaign animations, "what happened here?",
  comparison mode, quiz mode -- are not built yet. The data model
  (Empire/Event) is intentionally simple so these can be layered on.
- No backend/auth -- everything is static data shipped with the app, per the
  MVP scope (Prisma/Supabase only becomes relevant for user accounts).
