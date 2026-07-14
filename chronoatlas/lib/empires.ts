export interface EmpireInfo {
  name: string;
  capital?: string;
  government?: string;
  language?: string;
  religion?: string;
  founded?: string;
  collapsed?: string;
  peakArea?: string;
  leaders?: string[];
  summary: string;
}

// Keyed by the exact NAME property used in the historical-basemaps GeoJSON,
// so a click on a polygon can look its info straight up.
export const EMPIRES: Record<string, EmpireInfo> = {
  "Roman Empire": {
    name: "Roman Empire",
    capital: "Rome",
    government: "Empire",
    language: "Latin",
    religion: "Roman polytheism, later Christianity",
    founded: "27 BC",
    collapsed: "476 AD (West)",
    peakArea: "~5,000,000 km²",
    leaders: ["Augustus", "Trajan", "Marcus Aurelius", "Constantine I"],
    summary:
      "Grew from a small city-state into the dominant power of the Mediterranean, ruling through a mix of military conquest, engineering and law that still shapes the modern world.",
  },
  "Western Roman Empire": {
    name: "Western Roman Empire",
    capital: "Ravenna",
    government: "Empire",
    language: "Latin",
    founded: "395 AD",
    collapsed: "476 AD",
    leaders: ["Honorius", "Valentinian III", "Romulus Augustulus"],
    summary:
      "The western half of the Roman Empire after the 395 split, worn down by economic strain and repeated incursions until its last emperor was deposed in 476.",
  },
  "Eastern Roman Empire": {
    name: "Eastern Roman Empire",
    capital: "Constantinople",
    government: "Empire",
    language: "Greek, Latin",
    founded: "395 AD",
    collapsed: "1453 AD",
    leaders: ["Theodosius I", "Justinian I", "Heraclius"],
    summary:
      "The wealthier eastern half of the Roman Empire, which endured for a thousand years after Rome fell in the west and is known to historians as the Byzantine Empire.",
  },
  "Byzantine Empire": {
    name: "Byzantine Empire",
    capital: "Constantinople",
    government: "Empire",
    language: "Greek",
    religion: "Eastern Orthodox Christianity",
    founded: "330 AD",
    collapsed: "1453 AD",
    peakArea: "~3,500,000 km²",
    leaders: ["Justinian I", "Basil II", "Constantine XI"],
    summary:
      "The continuation of Rome in the east, a fortress-capital civilization that preserved classical learning and Orthodox Christianity for a millennium before falling to the Ottomans.",
  },
  "Han": {
    name: "Han Empire",
    capital: "Chang'an / Luoyang",
    government: "Imperial dynasty",
    language: "Old Chinese",
    religion: "Confucianism, Taoism, folk religion",
    founded: "206 BC",
    collapsed: "220 AD",
    peakArea: "~6,000,000 km²",
    leaders: ["Emperor Gaozu", "Emperor Wu", "Emperor Guangwu"],
    summary:
      "One of the great classical empires, contemporaneous with Rome, whose bureaucracy, silk trade and cultural identity gave China's majority ethnic group its name.",
  },
  "Han Empire": {
    name: "Han Empire",
    capital: "Chang'an / Luoyang",
    government: "Imperial dynasty",
    founded: "206 BC",
    collapsed: "220 AD",
    leaders: ["Emperor Gaozu", "Emperor Wu"],
    summary:
      "One of the great classical empires, contemporaneous with Rome, whose bureaucracy and silk trade gave China's majority ethnic group its name.",
  },
  "Parthian Empire": {
    name: "Parthian Empire",
    capital: "Ctesiphon",
    government: "Feudal monarchy",
    language: "Parthian, Aramaic",
    religion: "Zoroastrianism",
    founded: "247 BC",
    collapsed: "224 AD",
    peakArea: "~2,800,000 km²",
    leaders: ["Mithridates I", "Mithridates II", "Orodes II"],
    summary:
      "Rome's great eastern rival, controlling the trade routes of the Iranian plateau and famous for the horse archers that humiliated Crassus at Carrhae.",
  },
  "Sasanian Empire": {
    name: "Sasanian Empire",
    capital: "Ctesiphon",
    religion: "Zoroastrianism",
    founded: "224 AD",
    collapsed: "651 AD",
    leaders: ["Ardashir I", "Khosrow I", "Khosrow II"],
    summary:
      "The last pre-Islamic Persian empire, a cultural and military superpower whose long wars with Byzantium exhausted both sides just before the Arab conquests.",
  },
  "Mauryan Empire": {
    name: "Mauryan Empire",
    capital: "Pataliputra",
    religion: "Hinduism, later Buddhism under Ashoka",
    founded: "322 BC",
    collapsed: "185 BC",
    leaders: ["Chandragupta Maurya", "Ashoka the Great"],
    summary:
      "The first empire to unify nearly the entire Indian subcontinent, reaching its moral and territorial peak under Ashoka, who embraced Buddhism after the bloody conquest of Kalinga.",
  },
  "Gupta Empire": {
    name: "Gupta Empire",
    capital: "Pataliputra",
    founded: "320 AD",
    collapsed: "550 AD",
    leaders: ["Chandragupta I", "Samudragupta", "Chandragupta II"],
    summary:
      "Presided over a golden age of Indian science, mathematics and art, including the concept of zero and the foundations of classical Sanskrit literature.",
  },
  "Umayyad Caliphate": {
    name: "Umayyad Caliphate",
    capital: "Damascus",
    religion: "Islam",
    founded: "661 AD",
    collapsed: "750 AD",
    leaders: ["Muawiyah I", "Abd al-Malik"],
    summary:
      "The first hereditary caliphate, which expanded Islamic rule from Spain to Central Asia faster than almost any empire in history before being overthrown by the Abbasids.",
  },
  "Abbasid Caliphate": {
    name: "Abbasid Caliphate",
    capital: "Baghdad",
    religion: "Islam",
    founded: "750 AD",
    collapsed: "1258 AD",
    leaders: ["Al-Mansur", "Harun al-Rashid", "Al-Ma'mun"],
    summary:
      "Shifted the center of the Islamic world to Baghdad and presided over the Islamic Golden Age, translating and expanding on Greek, Persian and Indian scholarship.",
  },
  "Tang Empire": {
    name: "Tang Empire",
    capital: "Chang'an",
    founded: "618 AD",
    collapsed: "907 AD",
    leaders: ["Emperor Taizong", "Empress Wu Zetian", "Emperor Xuanzong"],
    summary:
      "Often considered the high point of pre-modern Chinese civilization, with Chang'an as the largest city on Earth and cosmopolitan trade along the Silk Road.",
  },
  "Carolingian Empire": {
    name: "Carolingian Empire",
    capital: "Aachen",
    founded: "800 AD",
    collapsed: "888 AD",
    leaders: ["Charlemagne", "Louis the Pious"],
    summary:
      "Briefly reunited most of Western Europe under Charlemagne, who was crowned Roman Emperor by the Pope in 800, laying cultural groundwork for medieval Europe.",
  },
  "Mongol Empire": {
    name: "Mongol Empire",
    capital: "Karakorum",
    founded: "1206 AD",
    collapsed: "1368 AD",
    peakArea: "~24,000,000 km²",
    leaders: ["Genghis Khan", "Ögedei Khan", "Kublai Khan"],
    summary:
      "The largest contiguous land empire ever assembled, unified by Genghis Khan in 1206 and stretching from Korea to Hungary within a single lifetime.",
  },
  "Mongols": {
    name: "Mongol Empire",
    capital: "Karakorum",
    founded: "1206 AD",
    collapsed: "1368 AD",
    leaders: ["Genghis Khan", "Ögedei Khan"],
    summary:
      "The largest contiguous land empire ever assembled, unified by Genghis Khan in 1206 and stretching from Korea to Hungary within a single lifetime.",
  },
  "Holy Roman Empire": {
    name: "Holy Roman Empire",
    capital: "No fixed capital (Aachen, Regensburg, Vienna)",
    founded: "800 / 962 AD",
    collapsed: "1806 AD",
    leaders: ["Otto I", "Frederick Barbarossa", "Charles V"],
    summary:
      "A loose, elective confederation of Central European states under an emperor — famously neither holy, nor Roman, nor much of an empire, yet it endured for a thousand years.",
  },
  "Ottoman Empire": {
    name: "Ottoman Empire",
    capital: "Istanbul (Constantinople)",
    religion: "Islam",
    founded: "1299 AD",
    collapsed: "1922 AD",
    leaders: ["Osman I", "Mehmed II", "Suleiman the Magnificent"],
    summary:
      "Rose from a small Anatolian principality to conquer Constantinople in 1453 and rule three continents, becoming one of the longest-lived empires in history.",
  },
  "Ottoman Sultanate": {
    name: "Ottoman Empire",
    capital: "Istanbul",
    founded: "1299 AD",
    collapsed: "1922 AD",
    leaders: ["Mehmed II", "Suleiman the Magnificent"],
    summary:
      "In its final decades, the once-vast Ottoman state — the 'Sick Man of Europe' — before its dissolution after the First World War.",
  },
  "Ming Empire": {
    name: "Ming Empire",
    capital: "Nanjing, later Beijing",
    founded: "1368 AD",
    collapsed: "1644 AD",
    leaders: ["Hongwu Emperor", "Yongle Emperor"],
    summary:
      "Restored native Chinese rule after Mongol Yuan rule, building the Forbidden City and sending Zheng He's treasure fleets as far as East Africa.",
  },
  "Ming Chinese Empire": {
    name: "Ming Empire",
    capital: "Beijing",
    founded: "1368 AD",
    collapsed: "1644 AD",
    leaders: ["Yongle Emperor", "Wanli Emperor"],
    summary:
      "Restored native Chinese rule after Mongol Yuan rule, building the Forbidden City and sending Zheng He's treasure fleets as far as East Africa.",
  },
  "Qing Empire": {
    name: "Qing Empire",
    capital: "Beijing",
    founded: "1644 AD",
    collapsed: "1912 AD",
    leaders: ["Kangxi Emperor", "Qianlong Emperor", "Puyi (last emperor)"],
    summary:
      "China's last imperial dynasty, founded by Manchu conquerors, which nearly tripled the territory of the Ming before collapsing into the 1912 republic.",
  },
  "Aztec Empire": {
    name: "Aztec Empire",
    capital: "Tenochtitlan",
    founded: "1428 AD",
    collapsed: "1521 AD",
    leaders: ["Itzcoatl", "Moctezuma II"],
    summary:
      "A triple alliance of city-states centered on the lake-built capital of Tenochtitlan, ended abruptly by Hernán Cortés and Spanish conquest in 1521.",
  },
  "Inca Empire": {
    name: "Inca Empire",
    capital: "Cusco",
    founded: "1438 AD",
    collapsed: "1533 AD",
    leaders: ["Pachacuti", "Huayna Capac", "Atahualpa"],
    summary:
      "The largest empire in pre-Columbian America, linked by an extraordinary road network through the Andes, conquered by Francisco Pizarro in the 1530s.",
  },
  "Mughal Empire": {
    name: "Mughal Empire",
    capital: "Agra, later Delhi",
    founded: "1526 AD",
    collapsed: "1857 AD",
    leaders: ["Babur", "Akbar", "Aurangzeb"],
    summary:
      "Descendants of Timur and Genghis Khan who built one of the wealthiest empires in history across the Indian subcontinent, patrons of the Taj Mahal.",
  },
  "Safavid Empire": {
    name: "Safavid Empire",
    capital: "Isfahan",
    religion: "Shia Islam",
    founded: "1501 AD",
    collapsed: "1736 AD",
    leaders: ["Ismail I", "Abbas the Great"],
    summary:
      "Established Shia Islam as Iran's state religion and rebuilt Persian identity between the Ottoman and Mughal empires.",
  },
  "Khmer Empire": {
    name: "Khmer Empire",
    capital: "Angkor",
    founded: "802 AD",
    collapsed: "1431 AD",
    leaders: ["Jayavarman II", "Suryavarman II", "Jayavarman VII"],
    summary:
      "Southeast Asia's great temple-building civilization, responsible for Angkor Wat, once the largest urban settlement on Earth.",
  },
  "Srivijaya Empire": {
    name: "Srivijaya Empire",
    capital: "Palembang",
    founded: "650 AD",
    collapsed: "1200s AD",
    summary:
      "A maritime trading empire that controlled the Strait of Malacca for centuries, spreading Buddhism across the Malay archipelago.",
  },
  "Timurid Empire": {
    name: "Timurid Empire",
    capital: "Samarkand",
    founded: "1370 AD",
    collapsed: "1507 AD",
    leaders: ["Timur (Tamerlane)", "Shah Rukh"],
    summary:
      "Built by the conqueror Timur, who claimed descent from Genghis Khan, and later flourished as a center of Persianate art, science and astronomy.",
  },
  "Golden Horde": {
    name: "Golden Horde",
    capital: "Sarai",
    founded: "1242 AD",
    collapsed: "1502 AD",
    leaders: ["Batu Khan"],
    summary:
      "The westernmost khanate of the Mongol Empire, ruling over Rus' principalities and the Pontic steppe for over two centuries.",
  },
  "Khanate of the Golden Horde": {
    name: "Golden Horde",
    capital: "Sarai",
    founded: "1242 AD",
    collapsed: "1502 AD",
    leaders: ["Batu Khan"],
    summary:
      "The westernmost khanate of the Mongol Empire, ruling over Rus' principalities and the Pontic steppe for over two centuries.",
  },
  "United States of America": {
    name: "United States of America",
    capital: "Washington, D.C.",
    government: "Federal republic",
    founded: "1776 AD",
    leaders: ["George Washington", "Abraham Lincoln"],
    summary:
      "Declared independence from Britain in 1776 and expanded across a continent to become a leading global power by the 20th century.",
  },
  "United States": {
    name: "United States",
    capital: "Washington, D.C.",
    government: "Federal republic",
    founded: "1776 AD",
    summary:
      "Emerged from thirteen British colonies to become a leading global power over the 19th and 20th centuries.",
  },
  "Russian Empire": {
    name: "Russian Empire",
    capital: "Saint Petersburg",
    founded: "1721 AD",
    collapsed: "1917 AD",
    leaders: ["Peter the Great", "Catherine the Great", "Nicholas II"],
    summary:
      "Expanded from Muscovy into the largest contiguous empire in modern history, spanning Eastern Europe to the Pacific, ended by the 1917 revolution.",
  },
  "Austrian Empire": {
    name: "Austrian Empire",
    capital: "Vienna",
    founded: "1804 AD",
    collapsed: "1867 AD",
    summary:
      "The Habsburg realm reorganized as a formal empire in response to Napoleon, later transformed into Austria-Hungary in 1867.",
  },
  "Austria Hungary": {
    name: "Austria-Hungary",
    capital: "Vienna / Budapest",
    founded: "1867 AD",
    collapsed: "1918 AD",
    summary:
      "A dual monarchy joining Austrian and Hungarian crowns, one of Europe's great powers until it fractured along ethnic lines at the end of World War I.",
  },
  "USSR": {
    name: "Soviet Union",
    capital: "Moscow",
    government: "One-party socialist state",
    founded: "1922 AD",
    collapsed: "1991 AD",
    leaders: ["Vladimir Lenin", "Joseph Stalin", "Mikhail Gorbachev"],
    summary:
      "The world's first communist state and a 20th-century superpower, dissolving in 1991 into fifteen independent republics.",
  },
  "France": {
    name: "France",
    capital: "Paris",
    summary:
      "One of Europe's oldest continuous states, evolving from a medieval kingdom into a revolutionary republic and, briefly under Napoleon, an empire that dominated the continent.",
  },
  "Spain": {
    name: "Spain",
    capital: "Madrid",
    summary:
      "United under the Catholic Monarchs in 1492, Spain built the first global empire, controlling territory across the Americas, Europe and the Pacific.",
  },
};

// A few narrative aliases so search / event pins can resolve to curated entries
// even when the underlying GeoJSON uses a slightly different property name.
export const EMPIRE_ALIASES: Record<string, string> = {
  "Han Dynasty": "Han",
  "Byzantine": "Byzantine Empire",
  "Ottoman": "Ottoman Empire",
  "Napoleonic France": "France",
  "Soviet Union": "USSR",
};

export function getEmpireInfo(rawName: string): EmpireInfo | undefined {
  return (
    EMPIRES[rawName] ??
    (EMPIRE_ALIASES[rawName] ? EMPIRES[EMPIRE_ALIASES[rawName]] : undefined)
  );
}
