"use client";

import { useCallback, useRef } from "react";
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

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      wheelAccum.current += e.deltaY;
      const step = 4;
      if (Math.abs(wheelAccum.current) > 12) {
        const dir = wheelAccum.current > 0 ? 1 : -1;
        wheelAccum.current = 0;
        const next = Math.min(MAX_YEAR, Math.max(MIN_YEAR, year + dir * step));
        onChange(next);
      }
    },
    [year, onChange]
  );

  return (
    <div
      className="pointer-events-auto w-full max-w-4xl px-4 sm:px-8 pb-6 sm:pb-8"
      onWheel={handleWheel}
    >
      <div className="rounded-2xl border border-border bg-panel backdrop-blur-xl px-5 sm:px-8 py-4 sm:py-5 shadow-2xl">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-[11px] tracking-[0.2em] uppercase text-text-muted font-body">
            Year
          </span>
          <span className="font-mono text-2xl sm:text-3xl text-accent-gold text-shadow-glow tabular-nums">
            {formatYear(Math.round(year))}
          </span>
        </div>

        <div className="relative h-6 flex items-center">
          {/* base track */}
          <div className="timeline-track absolute inset-x-0" />

          {/* filled progress */}
          <div
            className="absolute h-[4px] rounded-full bg-gradient-to-r from-accent-blue to-accent-gold"
            style={{ width: `${pct(year)}%` }}
          />

          {/* keyframe ticks — years where real border data exists */}
          <div className="absolute inset-x-0 h-6 pointer-events-none">
            {KEYFRAME_YEARS.map((ky) => (
              <div
                key={ky}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-white/50"
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
