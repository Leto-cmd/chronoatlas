"use client";

import { AnimatePresence, motion } from "framer-motion";
import { EmpireInfo } from "@/lib/empires";
import { HistoricalEvent } from "@/lib/events";
import { formatYear } from "@/lib/years";
import type { TerritorySelection } from "@/components/MapView";

export interface TerritoryPanel {
  selection: TerritorySelection;
  info: EmpireInfo | null;
}

interface SidebarProps {
  territory: TerritoryPanel | null;
  event: HistoricalEvent | null;
  onClose: () => void;
  onJumpYear: (year: number) => void;
}

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="py-2.5 border-b border-ink/10 last:border-b-0">
      <div className="text-[10px] tracking-[0.18em] uppercase text-text-muted mb-1">
        {label}
      </div>
      <div className="text-sm text-ink">{value}</div>
    </div>
  );
}

export default function Sidebar({ territory, event, onClose, onJumpYear }: SidebarProps) {
  const open = Boolean(territory || event);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ y: 48, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 48, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="pointer-events-auto absolute
            right-3 bottom-3 left-3 sm:left-auto sm:right-6 sm:bottom-6 sm:top-6
            w-auto sm:w-[380px]
            rounded-2xl border border-ink/25 bg-panel backdrop-blur-md
            shadow-[0_10px_40px_rgba(60,48,30,0.25)]
            overflow-hidden flex flex-col z-20"
        >
          <div className="flex items-start justify-between px-6 pt-6 pb-4">
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-seal mb-1.5">
                {event ? "Event" : "Civilization"}
              </div>
              <h2 className="font-display text-2xl leading-tight text-ink">
                {territory?.info?.name ?? territory?.selection.name ?? event?.title}
              </h2>
              {territory && !territory.info && (
                <div className="mt-1 text-xs text-text-muted italic">
                  From the historical border atlas
                </div>
              )}
              {event && (
                <div className="mt-1.5 font-mono text-sm text-seal">
                  {event.displayYear}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              aria-label="Close panel"
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:text-ink hover:bg-ink/5 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="px-6 pb-6 overflow-y-auto">
            {event && (
              <div className="flex items-start gap-4">
                <span className="text-3xl leading-none">{event.icon}</span>
                <p className="text-sm leading-relaxed text-ink/90">
                  {event.summary}
                </p>
              </div>
            )}

            {territory && (
              <>
                <p className="text-sm leading-relaxed text-ink/90 mb-2">
                  {territory.info
                    ? territory.info.summary
                    : territory.selection.partOf
                      ? `${territory.selection.name} appears in the historical border atlas for this year as part of ${territory.selection.partOf}. Select a curated civilization such as Rome, the Han or the Ottomans for a full dossier, or scrub the timeline to watch its borders change.`
                      : `${territory.selection.name} appears in the historical border atlas for this year. Select a curated civilization such as Rome, the Han or the Ottomans for a full dossier, or scrub the timeline to watch its borders change.`}
                </p>

                <div className="mt-2">
                  <Row label="Part of" value={territory.selection.partOf} />
                  <Row label="Capital" value={territory.info?.capital} />
                  <Row label="Government" value={territory.info?.government} />
                  <Row label="Language" value={territory.info?.language} />
                  <Row label="Religion" value={territory.info?.religion} />
                  <Row label="Founded" value={territory.info?.founded} />
                  <Row label="Collapsed" value={territory.info?.collapsed} />
                  <Row label="Peak Area" value={territory.info?.peakArea} />
                </div>

                {territory.info?.leaders && territory.info.leaders.length > 0 && (
                  <div className="mt-4">
                    <div className="text-[10px] tracking-[0.18em] uppercase text-text-muted mb-2">
                      Famous Leaders
                    </div>
                    <ul className="space-y-1.5">
                      {territory.info.leaders.map((l) => (
                        <li key={l} className="text-sm text-ink/90 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-seal" />
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {territory.info?.contextYear && (
                  <button
                    onClick={() => onJumpYear(territory.info!.contextYear!)}
                    className="mt-5 w-full py-2 rounded-lg border border-ink/20 bg-ink/[0.04] text-xs tracking-[0.14em] uppercase text-ink/80 hover:bg-ink/10 transition-colors"
                  >
                    Show at its peak · {formatYear(territory.info.contextYear)}
                  </button>
                )}
              </>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
