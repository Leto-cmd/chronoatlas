"use client";

import { useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import LoadingSequence from "@/components/LoadingSequence";
import Timeline from "@/components/Timeline";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";
import { getEmpireInfo, EmpireInfo } from "@/lib/empires";
import { EVENTS, HistoricalEvent } from "@/lib/events";
import { SearchEntry, snappedYearFor } from "@/lib/search";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
});

type Phase = "landing" | "loading" | "atlas";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("landing");
  const [year, setYear] = useState(117);
  const [selectedEmpire, setSelectedEmpire] = useState<EmpireInfo | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);
  const flyToRef = useRef<((lng: number, lat: number, zoom: number) => void) | null>(null);

  const handleExplore = useCallback(() => setPhase("loading"), []);
  const handleLoaded = useCallback(() => setPhase("atlas"), []);

  const handleSelectEmpire = useCallback((name: string) => {
    const info = getEmpireInfo(name);
    setSelectedEvent(null);
    setSelectedEmpire(
      info ?? {
        name,
        summary:
          "This territory appears in the border data, but a full dossier hasn't been written yet. Try Rome, the Mongol Empire, the Ottomans, or search for a civilization above.",
      }
    );
  }, []);

  const handleSelectEvent = useCallback((id: string) => {
    const ev = EVENTS.find((e) => e.id === id);
    if (!ev) return;
    setSelectedEmpire(null);
    setSelectedEvent(ev);
    flyToRef.current?.(ev.lng, ev.lat, 5.5);
  }, []);

  const handleSearchSelect = useCallback((entry: SearchEntry) => {
    setYear(snappedYearFor(entry));
    flyToRef.current?.(entry.lng, entry.lat, entry.zoom);
    if (entry.eventId) {
      const ev = EVENTS.find((e) => e.id === entry.eventId);
      setSelectedEmpire(null);
      setSelectedEvent(ev ?? null);
    } else if (entry.empireName) {
      const info = getEmpireInfo(entry.empireName);
      setSelectedEvent(null);
      setSelectedEmpire(info ?? null);
    }
  }, []);

  return (
    <main className="relative w-full h-dvh overflow-hidden bg-bg">
      {phase === "landing" && <Hero onExplore={handleExplore} />}

      {phase === "loading" && <LoadingSequence onDone={handleLoaded} />}

      {phase === "atlas" && (
        <div className="absolute inset-0">
          <MapView
            year={year}
            onSelectEmpire={handleSelectEmpire}
            onSelectEvent={handleSelectEvent}
            registerFlyTo={(fn) => {
              flyToRef.current = fn;
            }}
          />

          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between">
            <div className="relative">
              <SearchBar onSelect={handleSearchSelect} />
              <Sidebar
                empire={selectedEmpire}
                event={selectedEvent}
                onClose={() => {
                  setSelectedEmpire(null);
                  setSelectedEvent(null);
                }}
              />
              <div className="pointer-events-auto absolute top-3 right-3 sm:top-6 sm:right-6 z-10">
                {!selectedEmpire && !selectedEvent && (
                  <span className="font-display text-lg text-text/90 text-shadow-glow hidden sm:inline">
                    ChronoAtlas
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <Timeline year={year} onChange={setYear} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
