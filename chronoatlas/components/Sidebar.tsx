"use client";

import { AnimatePresence, motion } from "framer-motion";
import { EmpireInfo } from "@/lib/empires";
import { HistoricalEvent } from "@/lib/events";

interface SidebarProps {
  empire: EmpireInfo | null;
  event: HistoricalEvent | null;
  onClose: () => void;
}

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="py-2.5 border-b border-border/60">
      <div className="text-[10px] tracking-[0.18em] uppercase text-text-muted mb-1">
        {label}
      </div>
      <div className="text-sm text-text">{value}</div>
    </div>
  );
}

export default function Sidebar({ empire, event, onClose }: SidebarProps) {
  const open = Boolean(empire || event);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 40, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="pointer-events-auto absolute right-3 top-3 bottom-3 sm:right-6 sm:top-6 sm:bottom-6 w-[calc(100%-1.5rem)] sm:w-[380px] rounded-2xl border border-border bg-panel backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col z-20"
        >
          <div className="flex items-start justify-between px-6 pt-6 pb-4">
            <div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-accent-gold mb-1.5">
                {event ? "Event" : "Civilization"}
              </div>
              <h2 className="font-display text-2xl leading-tight text-text">
                {empire?.name ?? event?.title}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close panel"
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-text-muted hover:text-text hover:bg-white/5 transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="px-6 pb-6 overflow-y-auto">
            {event && (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl leading-none">{event.icon}</span>
                  <span className="font-mono text-accent-gold text-lg">
                    {event.displayYear}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-text/90">
                  {event.summary}
                </p>
              </>
            )}

            {empire && (
              <>
                <p className="text-sm leading-relaxed text-text/90 mb-2">
                  {empire.summary}
                </p>
                <div className="mt-2">
                  <Row label="Capital" value={empire.capital} />
                  <Row label="Government" value={empire.government} />
                  <Row label="Language" value={empire.language} />
                  <Row label="Religion" value={empire.religion} />
                  <Row label="Founded" value={empire.founded} />
                  <Row label="Collapsed" value={empire.collapsed} />
                  <Row label="Peak Area" value={empire.peakArea} />
                </div>
                {empire.leaders && empire.leaders.length > 0 && (
                  <div className="mt-4">
                    <div className="text-[10px] tracking-[0.18em] uppercase text-text-muted mb-2">
                      Famous Leaders
                    </div>
                    <ul className="space-y-1.5">
                      {empire.leaders.map((l) => (
                        <li
                          key={l}
                          className="text-sm text-text/90 flex items-center gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-accent-blue" />
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
