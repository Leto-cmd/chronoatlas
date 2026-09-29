"use client";

import { motion } from "framer-motion";
import { KEYFRAME_YEARS, MIN_YEAR, MAX_YEAR } from "@/lib/years";

interface HeroProps {
  onExplore: () => void;
}

/** Deterministic pseudo-random so SSR and client markup match (no hydration mismatch). */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function PaperGrain() {
  const flecks = Array.from({ length: 70 }, (_, i) => ({
    id: i,
    top: seeded(i, 1) * 100,
    left: seeded(i, 2) * 100,
    size: 1 + seeded(i, 3) * 2,
    opacity: 0.05 + seeded(i, 4) * 0.09,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {flecks.map((f) => (
        <div
          key={f.id}
          className="absolute rounded-full bg-ink"
          style={{
            top: `${f.top}%`,
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
          }}
        />
      ))}
    </div>
  );
}

/** Engraved armillary sphere, drawn in ink. */
function Armillary() {
  return (
    <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px]">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 38% 32%, #efe6cf 0%, #e2d6b8 55%, #cfc2a2 100%)",
          boxShadow:
            "0 18px 50px rgba(60,48,30,0.22), inset -14px -18px 44px rgba(120,100,70,0.18)",
        }}
      />
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 90, ease: "linear" }}
      >
        <g stroke="rgba(80, 68, 48, 0.5)" fill="none" strokeWidth="0.7">
          <ellipse cx="100" cy="100" rx="90" ry="90" />
          <ellipse cx="100" cy="100" rx="70" ry="90" />
          <ellipse cx="100" cy="100" rx="40" ry="90" />
          <ellipse cx="100" cy="100" rx="90" ry="70" />
          <ellipse cx="100" cy="100" rx="90" ry="40" />
          <line x1="10" y1="100" x2="190" y2="100" />
        </g>
      </motion.svg>
      <div
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: "0 0 0 1.5px rgba(80,68,48,0.45)" }}
      />
      {/* slow orbiting ink dot */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
      >
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-ink/70"
          style={{ top: "7%", left: "50%", transform: "translate(-50%, -50%)" }}
        />
      </motion.div>
    </div>
  );
}

export default function Hero({ onExplore }: HeroProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between overflow-hidden bg-bg">
      <PaperGrain />

      {/* double plate frame */}
      <div className="pointer-events-none absolute inset-3 sm:inset-5 border border-ink/25 rounded-[4px]" />
      <div className="pointer-events-none absolute inset-4.5 sm:inset-6 border border-ink/15 rounded-[2px]" />

      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Armillary />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-5xl sm:text-6xl tracking-tight text-ink"
        >
          ChronoAtlas
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-4 text-base sm:text-lg text-text-muted max-w-md"
        >
          History isn&apos;t a list of dates — it&apos;s a map that won&apos;t sit still.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          onClick={onExplore}
          className="mt-10 px-9 py-3 rounded-full border border-ink/40 bg-ink/[0.06] text-ink text-sm tracking-[0.18em] uppercase hover:bg-ink/12 active:scale-95 transition-all shadow-[0_4px_16px_rgba(60,48,30,0.15)]"
        >
          Unroll the Atlas
        </motion.button>
      </div>

      {/* ambient, non-interactive timeline preview */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative w-full max-w-2xl px-8 pb-10"
      >
        <div className="flex justify-between text-[11px] font-mono text-text-muted mb-2">
          <span>500 BC</span>
          <span>2010</span>
        </div>
        <div className="relative h-[3px] rounded-full bg-ink/15">
          <div className="absolute inset-0 rounded-full bg-ink/25" />
          {KEYFRAME_YEARS.map((y) => (
            <div
              key={y}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-ink/50"
              style={{
                left: `${((y - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100}%`,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
