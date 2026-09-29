// Deterministic, curated color assignment so the same civilization keeps a
// consistent tint across years, while staying legible on a parchment map.
// Colors are deliberately desaturated — like watercolor washes on an old
// atlas plate — rather than the saturated neon of a screen-first theme.

const GOLDEN_ANGLE = 137.508;

// Manual overrides for the marquee civilizations so they read as
// thematically "right" (Rome = faded imperial red, Egypt = ocher, etc).
const OVERRIDES: Record<string, string> = {
  "Roman Empire": "#c07a68",
  "Western Roman Empire": "#c07a68",
  "Eastern Roman Empire": "#7f94a3",
  "Byzantine Empire": "#7f94a3",
  Rome: "#c07a68",
  "Roman Republic": "#c99380",
  "Han": "#c9a86a",
  "Han Empire": "#c9a86a",
  Qin: "#b3a179",
  "Parthian Empire": "#a08bb0",
  Parthia: "#a08bb0",
  "Mongol Empire": "#b98a74",
  Mongols: "#b98a74",
  "Ottoman Empire": "#8aa58c",
  "Ottoman Sultanate": "#8aa58c",
  "Holy Roman Empire": "#c2b17e",
  "Abbasid Caliphate": "#93a98a",
  "Umayyad Caliphate": "#a3b295",
  "Carolingian Empire": "#9aa3b8",
  "Frankish Kingdom": "#9aa3b8",
  Franks: "#9aa3b8",
  "Aztec Empire": "#c29268",
  "Mexihcah (Triple Alliance)": "#c29268",
  "Inca Empire": "#c8b37e",
  "Mughal Empire": "#96ad9d",
  "Qing Empire": "#c4ae7d",
  "Ming Empire": "#bd8a86",
  "Ming Chinese Empire": "#bd8a86",
  USSR: "#b08379",
  "United States": "#93a1b6",
  "United States of America": "#93a1b6",
  France: "#9aa8bc",
  Spain: "#c4ab79",
  "Russian Empire": "#a494b3",
  "British Raj": "#b9a98e",
  "Achaemenid Empire": "#bd9a7a",
  "Sasanian Empire": "#ad8f7e",
  "Mauryan Empire": "#b9a67c",
  "Gupta Empire": "#b1a882",
  "Tang Empire": "#c39e78",
  "Khmer Empire": "#ad9a85",
  "Egypt": "#cdb384",
  "Ptolemaic Kingdom": "#cdb384",
  "Macedon and Hellenic League": "#a8a2b8",
  "Empire of Alexander": "#a8a2b8",
  "German Empire": "#a4a494",
  "Austria Hungary": "#ab9d94",
  "Austrian Empire": "#ab9d94",
  "Napoleonic France": "#9aa8bc",
};

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/** Muted fill wash for a territory — stable for a given name. */
export function colorForName(name: string | null | undefined): string {
  if (!name) return "#b7ab96"; // unnamed / unclaimed land
  if (OVERRIDES[name]) return OVERRIDES[name];

  const seed = hashString(name);
  const hue = (seed * GOLDEN_ANGLE) % 360;
  const saturation = 14 + (seed % 12); // 14-26%
  const lightness = 62 + (seed % 10); // 62-72%
  return `hsl(${hue.toFixed(1)}, ${saturation}%, ${lightness}%)`;
}

/** Ink used to draw the borders themselves — like a fine pen line. */
export function inkForName(name: string | null | undefined): string {
  if (!name) return "#6f665a";
  const seed = hashString(name);
  const hue = (seed * GOLDEN_ANGLE) % 360;
  return `hsl(${hue.toFixed(1)}, 18%, 36%)`;
}

/** Page-level parchment tones for the basemap background. */
export const PAPER = {
  sea: "#cfc4ac",
  seaDeep: "#c4b9a1",
  land: "#ddd2b8",
  paper: "#e9dfc8",
} as const;
