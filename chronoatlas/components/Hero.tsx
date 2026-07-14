"use client";

import { motion } from "framer-motion";
import { KEYFRAME_YEARS, MIN_YEAR, MAX_YEAR } from "@/lib/years";

interface HeroProps {
  onExplore: () => void;
}

function Starfield() {
  const stars = Array.from({ length: 90 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 1.6 + 0.4,
    delay: Math.random() * 4,
    dur: 2.5 + Math.random() * 3,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Globe() {
  return (
    <div className="relative w-[260px] h-[260px] sm:w-[340px] sm:h-[340px]">
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, #1c3a6e 0%, #0e1f3f 45%, #060a16 100%)",
          boxShadow:
            "0 0 60px 10px rgba(76,141,255,0.25), inset -20px -20px 60px rgba(0,0,0,0.55)",
        }}
      />
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        <g stroke="rgba(120,170,255,0.35)" fill="none" strokeWidth="0.6">
          <ellipse cx="100" cy="100" rx="90" ry="90" />
          <ellipse cx="100" cy="100" rx="70" ry="90" />
          <ellipse cx="100" cy="100" rx="40" ry="90" />
          <ellipse cx="100" cy="100" rx="90" ry="70" />
          <ellipse cx="100" cy="100" rx="90" ry="40" />
        </g>
      </motion.svg>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: "0 0 0 1px rgba(232,184,75,0.25)",
        }}
      />
      {/* orbiting marker */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
      >
        <div
          className="absolute w-2 h-2 rounded-full bg-accent-gold glow-gold"
          style={{ top: "6%", left: "50%", transform: "translate(-50%, -50%)" }}
        />
      </motion.div>
    </div>
  );
}

export default function Hero({ onExplore }: HeroProps) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between overflow-hidden bg-bg">
      <Starfield />

      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Globe />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-5xl sm:text-6xl tracking-tight text-text text-shadow-glow"
        >
          ChronoAtlas
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-4 text-base sm:text-lg text-text-muted max-w-md"
        >
          Watch history happen. Explore history spatially, not just
          chronologically.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          onClick={onExplore}
          className="mt-10 px-8 py-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-gold text-bg font-medium text-sm tracking-wide hover:brightness-110 active:scale-95 transition-all glow-blue"
        >
          Explore
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
          <span>2025</span>
        </div>
        <div className="relative h-[3px] rounded-full bg-white/10">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-blue to-accent-gold opacity-60" />
          {KEYFRAME_YEARS.map((y) => (
            <div
              key={y}
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-white/60"
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
