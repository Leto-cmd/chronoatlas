"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  "Drawing coastlines…",
  "Loading civilizations…",
  "Preparing timeline…",
];

interface LoadingSequenceProps {
  onDone: () => void;
}

export default function LoadingSequence({ onDone }: LoadingSequenceProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 550);
    const t2 = setTimeout(() => setStep(2), 1100);
    const t3 = setTimeout(() => onDone(), 1750);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-bg z-30">
      {/* the atlas 'plate' zooms toward the viewer, ink dissolving into paper */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0.4 }}
        animate={{ scale: 22, opacity: 0 }}
        transition={{ duration: 1.75, ease: [0.6, 0, 0.9, 0.2] }}
        className="absolute w-40 h-40 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 38% 32%, #efe6cf 0%, #d8cba9 55%, transparent 75%)",
          boxShadow: "0 0 0 2px rgba(80,68,48,0.35)",
        }}
      />
      <div className="relative flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-ink/15 border-t-ink/70 animate-spin" />
        <AnimatePresence mode="wait">
          <motion.span
            key={step}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="font-mono text-sm text-text-muted tracking-wide"
          >
            {STEPS[step]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
