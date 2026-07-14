export interface HistoricalEvent {
  id: string;
  year: number; // actual historical year (may not be a keyframe year)
  displayYear: string;
  title: string;
  icon: string;
  lat: number;
  lng: number;
  summary: string;
  importance: "high" | "medium";
}

export const EVENTS: HistoricalEvent[] = [
  {
    id: "fall-of-rome",
    year: 476,
    displayYear: "476 AD",
    title: "Fall of the Western Roman Empire",
    icon: "🏛",
    lat: 44.4184,
    lng: 12.2035,
    summary:
      "The Germanic chieftain Odoacer deposes the last Western Roman emperor, Romulus Augustulus, ending over 500 years of Roman rule in the west.",
    importance: "high",
  },
  {
    id: "founding-baghdad",
    year: 762,
    displayYear: "762 AD",
    title: "Founding of Baghdad",
    icon: "🕌",
    lat: 33.3152,
    lng: 44.3661,
    summary:
      "The Abbasid caliph al-Mansur founds Baghdad as his new capital, which grows into the intellectual center of the Islamic Golden Age.",
    importance: "medium",
  },
  {
    id: "genghis-khan",
    year: 1206,
    displayYear: "1206 AD",
    title: "Genghis Khan unites the Mongols",
    icon: "🏹",
    lat: 47.9212,
    lng: 106.9057,
    summary:
      "Temüjin is proclaimed Genghis Khan at a great council, unifying the Mongol tribes and launching the conquests that build history's largest land empire.",
    importance: "high",
  },
  {
    id: "hastings",
    year: 1066,
    displayYear: "1066 AD",
    title: "Battle of Hastings",
    icon: "⚔",
    lat: 50.9111,
    lng: 0.4864,
    summary:
      "William, Duke of Normandy, defeats King Harold II, beginning the Norman conquest of England and reshaping its language and aristocracy.",
    importance: "high",
  },
  {
    id: "magna-carta",
    year: 1215,
    displayYear: "1215 AD",
    title: "Magna Carta signed",
    icon: "📜",
    lat: 51.4448,
    lng: -0.5599,
    summary:
      "English barons force King John to accept limits on royal power at Runnymede, a founding document for constitutional law.",
    importance: "medium",
  },
  {
    id: "fall-constantinople",
    year: 1453,
    displayYear: "1453 AD",
    title: "Fall of Constantinople",
    icon: "🏰",
    lat: 41.0082,
    lng: 28.9784,
    summary:
      "Ottoman forces under Mehmed II capture Constantinople, ending the Byzantine Empire and marking a symbolic close of the Middle Ages.",
    importance: "high",
  },
  {
    id: "columbus",
    year: 1492,
    displayYear: "1492 AD",
    title: "Columbus reaches the Americas",
    icon: "🚢",
    lat: 24.03,
    lng: -74.47,
    summary:
      "Christopher Columbus makes landfall in the Bahamas, opening sustained contact between Europe and the Americas.",
    importance: "high",
  },
  {
    id: "french-revolution",
    year: 1789,
    displayYear: "1789 AD",
    title: "French Revolution begins",
    icon: "⚡",
    lat: 48.8566,
    lng: 2.3522,
    summary:
      "The storming of the Bastille in Paris ignites a decade of revolution that topples the French monarchy and reshapes Europe.",
    importance: "high",
  },
  {
    id: "waterloo",
    year: 1815,
    displayYear: "1815 AD",
    title: "Battle of Waterloo",
    icon: "🎖",
    lat: 50.6801,
    lng: 4.4093,
    summary:
      "A coalition led by Wellington and Blücher defeats Napoleon Bonaparte, ending his rule and the Napoleonic Wars for good.",
    importance: "medium",
  },
  {
    id: "hiroshima",
    year: 1945,
    displayYear: "1945 AD",
    title: "Atomic bombing of Hiroshima",
    icon: "☢",
    lat: 34.3853,
    lng: 132.4553,
    summary:
      "The United States drops the first atomic bomb used in war on Hiroshima, hastening the end of the Second World War.",
    importance: "high",
  },
  {
    id: "berlin-wall",
    year: 1989,
    displayYear: "1989 AD",
    title: "Fall of the Berlin Wall",
    icon: "🧱",
    lat: 52.516,
    lng: 13.3777,
    summary:
      "East Germans breach the Berlin Wall, a symbolic end to the Cold War division of Europe ahead of Soviet collapse in 1991.",
    importance: "high",
  },
];
