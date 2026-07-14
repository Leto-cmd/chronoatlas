// Deterministic, curated color assignment so the same civilization keeps a
// consistent hue across years, while staying legible on a dark navy map.

const GOLDEN_ANGLE = 137.508;

// Manual overrides for the marquee civilizations mentioned in the brief, so
// they read as thematically "right" (Rome = imperial red/gold, etc).
const OVERRIDES: Record<string, string> = {
  "Roman Empire": "#C4453A",
  "Western Roman Empire": "#C4453A",
  "Eastern Roman Empire": "#3A6FC4",
  "Byzantine Empire": "#3A6FC4",
  "Han": "#D9A441",
  "Han Empire": "#D9A441",
  "Parthian Empire": "#8B5FBF",
  "Mongol Empire": "#B5442E",
  "Mongols": "#B5442E",
  "Ottoman Empire": "#3A9B6C",
  "Ottoman Sultanate": "#3A9B6C",
  "Holy Roman Empire": "#C9A227",
  "Abbasid Caliphate": "#2F8F5B",
  "Umayyad Caliphate": "#4E9B4E",
  "Carolingian Empire": "#6C7FD1",
  "Aztec Empire": "#C46B2E",
  "Inca Empire": "#D4AF37",
  "Mughal Empire": "#4E9B85",
  "Qing Empire": "#C4A23A",
  "Ming Empire": "#C43A5C",
  "USSR": "#B5342E",
  "United States": "#3A6FC4",
  "United States of America": "#3A6FC4",
  "France": "#4C7FD9",
  "Spain": "#D9A441",
  "Russian Empire": "#7A4EC4",
};

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/** Returns an HSL color string, stable for a given territory name. */
export function colorForName(name: string | null | undefined): string {
  if (!name) return "hsl(220, 8%, 32%)"; // unnamed / unclaimed territory
  if (OVERRIDES[name]) return OVERRIDES[name];

  const seed = hashString(name);
  const hue = (seed * GOLDEN_ANGLE) % 360;
  const saturation = 55 + (seed % 15); // 55-70%
  const lightness = 46 + (seed % 10); // 46-56%
  return `hsl(${hue.toFixed(1)}, ${saturation}%, ${lightness}%)`;
}
