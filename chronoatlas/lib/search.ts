import { nearestKeyframe } from "./years";

export interface SearchEntry {
  id: string;
  label: string;
  subtitle: string;
  year: number; // the historical year to jump the timeline to
  lat: number;
  lng: number;
  zoom: number;
  empireName?: string; // opens the sidebar for this empire (key into EMPIRES)
  eventId?: string; // opens this event's popup (key into EVENTS)
}

const RAW: Omit<SearchEntry, "id">[] = [
  { label: "Rome", subtitle: "Capital of the Roman Empire", year: 117, lat: 41.9028, lng: 12.4964, zoom: 4.5, empireName: "Roman Empire" },
  { label: "Roman Empire", subtitle: "Peak under Trajan, 117 AD", year: 117, lat: 41.9028, lng: 12.4964, zoom: 3.2, empireName: "Roman Empire" },
  { label: "Napoleon", subtitle: "Napoleonic France, 1812", year: 1815, lat: 48.8566, lng: 2.3522, zoom: 3.5, empireName: "France" },
  { label: "Mongol Empire", subtitle: "Under Genghis and his heirs", year: 1279, lat: 47.9212, lng: 106.9057, zoom: 2.8, empireName: "Mongol Empire" },
  { label: "Genghis Khan", subtitle: "Unification of the Mongols, 1206", year: 1206, lat: 47.9212, lng: 106.9057, zoom: 3.5, eventId: "genghis-khan" },
  { label: "Constantinople", subtitle: "Fall of Constantinople, 1453", year: 1400, lat: 41.0082, lng: 28.9784, zoom: 4.5, eventId: "fall-constantinople" },
  { label: "Byzantine Empire", subtitle: "Constantinople, 1000 AD", year: 1000, lat: 41.0082, lng: 28.9784, zoom: 3.5, empireName: "Byzantine Empire" },
  { label: "Ottoman Empire", subtitle: "Peak under Suleiman, 1600", year: 1600, lat: 41.0082, lng: 28.9784, zoom: 3, empireName: "Ottoman Empire" },
  { label: "Han Dynasty", subtitle: "Chang'an, 100 AD", year: 100, lat: 34.3416, lng: 108.9398, zoom: 3.5, empireName: "Han" },
  { label: "Charlemagne", subtitle: "Crowned Emperor, 800 AD", year: 800, lat: 50.775, lng: 6.084, zoom: 3.8, empireName: "Carolingian Empire" },
  { label: "Aztec Empire", subtitle: "Tenochtitlan, 1500", year: 1500, lat: 19.4326, lng: -99.1332, zoom: 4.5, empireName: "Aztec Empire" },
  { label: "Inca Empire", subtitle: "Cusco, 1500", year: 1500, lat: -13.5319, lng: -71.9675, zoom: 4, empireName: "Inca Empire" },
  { label: "Mughal Empire", subtitle: "Agra, 1700", year: 1700, lat: 27.1767, lng: 78.0081, zoom: 3.5, empireName: "Mughal Empire" },
  { label: "Abbasid Caliphate", subtitle: "Baghdad, 800 AD", year: 800, lat: 33.3152, lng: 44.3661, zoom: 3.5, empireName: "Abbasid Caliphate" },
  { label: "Ming Empire", subtitle: "Beijing, 1500", year: 1500, lat: 39.9042, lng: 116.4074, zoom: 3.5, empireName: "Ming Empire" },
  { label: "Qing Empire", subtitle: "Beijing, 1783", year: 1783, lat: 39.9042, lng: 116.4074, zoom: 3.5, empireName: "Qing Empire" },
  { label: "Soviet Union", subtitle: "Moscow, 1960", year: 1960, lat: 55.7558, lng: 37.6173, zoom: 2.8, empireName: "USSR" },
  { label: "Battle of Hastings", subtitle: "1066 AD", year: 1066, lat: 50.9111, lng: 0.4864, zoom: 6, eventId: "hastings" },
  { label: "Magna Carta", subtitle: "Runnymede, 1215", year: 1215, lat: 51.4448, lng: -0.5599, zoom: 6, eventId: "magna-carta" },
  { label: "Columbus", subtitle: "Arrival in the Americas, 1492", year: 1492, lat: 24.03, lng: -74.47, zoom: 4, eventId: "columbus" },
  { label: "Fall of Rome", subtitle: "476 AD", year: 476, lat: 44.4184, lng: 12.2035, zoom: 4.5, eventId: "fall-of-rome" },
  { label: "French Revolution", subtitle: "Paris, 1789", year: 1789, lat: 48.8566, lng: 2.3522, zoom: 5, eventId: "french-revolution" },
  { label: "Hiroshima", subtitle: "1945 AD", year: 1945, lat: 34.3853, lng: 132.4553, zoom: 6, eventId: "hiroshima" },
  { label: "Waterloo", subtitle: "1815 AD", year: 1815, lat: 50.6801, lng: 4.4093, zoom: 6, eventId: "waterloo" },
];

export const SEARCH_INDEX: SearchEntry[] = RAW.map((r, i) => ({
  id: `s${i}`,
  ...r,
}));

export function searchEntries(query: string): SearchEntry[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return SEARCH_INDEX.filter(
    (e) =>
      e.label.toLowerCase().includes(q) || e.subtitle.toLowerCase().includes(q)
  ).slice(0, 8);
}

export function snappedYearFor(entry: SearchEntry): number {
  return nearestKeyframe(entry.year);
}
