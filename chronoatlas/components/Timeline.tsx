"use client";

import { useEffect, useRef } from "react";
import { KEYFRAME_YEARS, MIN_YEAR, MAX_YEAR, formatYear } from "@/lib/years";

interface TimelineProps {
  year: number;
  onChange: (year: number) => void;
}

function pct(year: number) {
  return ((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;
}

export default function Timeline({ year, onChange }: TimelineProps) {
  const wheelAccum = useRef(0);
  const rootRef = useRef<HTMLDivElement>(null);

  // Refs keep the non-passive native listener stable across renders.
  const yearRef = useRef(year);
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    yearRef.current = year;
    onChangeRef.current = onChange;
  });

  // React attaches onWheel as a passive listener, so e.preventDefault()
  // would throw "Unable to preventDefault inside passive event listener".
  // Use a native non-passive listener instead.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const nonPassiveWheel = (e: WheelEvent) => {
      e.preventDefault();
      wheelAccum.current += e.deltaY;
      if (Math.abs(wheelAccum.current) > 12) {
        const dir = wheelAccum.current > 0 ? 1 : -1;
        wheelAccum.current = 0;
        const next = yearRef.current + dir * 4;
        const clamped = Math.max(MIN_YEAR, Math.min(MAX_YEAR, next));
        onChangeRef.current(clamped);
      }
    };
    el.addEventListener("wheel", nonPassiveWheel, { passive: false });
    return () => el.removeEventListener("wheel", nonPassiveWheel);
  }, []);

  return (
    <div
      ref={rootRef}
      className="pointer-events-auto w-full max-w-4xl px-4 sm:px-8 pb-6 sm:pb-8"
    >
      <div className="rounded-2xl border border-ink/20 bg-panel backdrop-blur-md px-5 sm:px-8 py-4 sm:py-5 shadow-[0_8px_30px_rgba(60,48,30,0.18)]">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-[11px] tracking-[0.2em] uppercase text-text-muted">
            Year
          </span>
          <span className="font-display text-2xl sm:text-3xl text-ink tabular-nums">
            {formatYear(Math.round(year))}
          </span>
        </div>

        <div className="relative h-6 flex items-center">
          <div className="timeline-track absolute inset-x-0" />

          <div
            className="absolute h-[3px] rounded-full bg-ink/45"
            style={{ width: `${pct(year)}%` }}
          />

          <div className="absolute inset-x-0 h-6 pointer-events-none">
            {KEYFRAME_YEARS.map((ky) => (
              <div
                key={ky}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[2px] h-[10px] rounded-full bg-ink/30"
                style={{ left: `${pct(ky)}%` }}
                title={formatYear(ky)}
              />
            ))}
          </div>

          <input
            type="range"
            className="timeline-range absolute inset-x-0 w-full"
            min={MIN_YEAR}
            max={MAX_YEAR}
            step={1}
            value={year}
            onChange={(e) => onChange(Number(e.target.value))}
            aria-label="Year"
          />
        </div>

        <div className="flex justify-between mt-2 text-[11px] font-mono text-text-muted">
          <span>{formatYear(MIN_YEAR)}</span>
          <span>{formatYear(MAX_YEAR)}</span>
        </div>
      </div>
    </div>
  );
}
