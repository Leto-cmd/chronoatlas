// Years for which we have real historical border data (GeoJSON keyframes).
// Sourced + simplified from the historical-basemaps project.
export const KEYFRAME_YEARS: number[] = [
  -500, -400, -323, -300, -200, -100, -1, 100, 200, 300, 400, 500, 600, 700,
  800, 900, 1000, 1100, 1200, 1279, 1300, 1400, 1492, 1500, 1530, 1600, 1650,
  1700, 1715, 1783, 1800, 1815, 1880, 1900, 1914, 1920, 1930, 1938, 1945,
  1960, 1994, 2000, 2010,
];

export const MIN_YEAR = -500;
export const MAX_YEAR = 2025;

/** Finds the nearest keyframe year with real data for a given slider year. */
export function nearestKeyframe(year: number): number {
  let closest = KEYFRAME_YEARS[0];
  let bestDist = Math.abs(year - closest);
  for (const y of KEYFRAME_YEARS) {
    const d = Math.abs(year - y);
    if (d < bestDist) {
      bestDist = d;
      closest = y;
    }
  }
  return closest;
}

/** "500 BC", "1453", "2010" — matches the brief's display convention. */
export function formatYear(year: number): string {
  if (year < 0) return `${Math.abs(year)} BC`;
  return `${year}`;
}

// Must match next.config.ts — fetch() calls aren't rewritten by Next's
// basePath handling the way <Link>/<Image> are, so we prefix manually.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function yearToFilename(year: number): string {
  return `${BASE_PATH}/geojson/year_${year}.geojson`;
}
