"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  "Drawing map…",
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
      {/* zooming globe -> flies toward viewer to suggest space -> earth */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0.3 }}
        animate={{ scale: 22, opacity: 0 }}
        transition={{ duration: 1.75, ease: [0.6, 0, 0.9, 0.2] }}
        className="absolute w-40 h-40 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #2a4d8f 0%, #0e1f3f 55%, transparent 75%)",
        }}
      />
      <div className="relative flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-accent-blue/30 border-t-accent-gold animate-spin" />
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
