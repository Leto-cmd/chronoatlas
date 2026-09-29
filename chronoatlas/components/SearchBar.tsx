"use client";

import { useState, useRef, useEffect } from "react";
import { searchEntries, SearchEntry } from "@/lib/search";

interface SearchBarProps {
  onSelect: (entry: SearchEntry) => void;
}

export default function SearchBar({ onSelect }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = searchEntries(query);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Enter jumps to the top result; Escape clears and closes.
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && results.length > 0) {
      onSelect(results[0]);
      setQuery(results[0].label);
      setOpen(false);
      inputRef.current?.blur();
    } else if (e.key === "Escape") {
      setQuery("");
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div
      ref={containerRef}
      className="pointer-events-auto absolute top-3 left-3 sm:top-6 sm:left-6 w-[calc(100%-1.5rem)] sm:w-80 z-20"
    >
      <div className="rounded-xl border border-ink/25 bg-panel backdrop-blur-md shadow-[0_8px_30px_rgba(60,48,30,0.18)] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            className="text-text-muted shrink-0"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search Rome, Napoleon, Mongol Empire…"
            className="w-full bg-transparent outline-none text-sm text-ink placeholder:text-text-muted"
          />
        </div>

        {open && results.length > 0 && (
          <ul className="border-t border-ink/10 max-h-72 overflow-y-auto">
            {results.map((r) => (
              <li key={r.id}>
                <button
                  onClick={() => {
                    onSelect(r);
                    setQuery(r.label);
                    setOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-ink/5 transition-colors flex flex-col"
                >
                  <span className="text-sm text-ink">{r.label}</span>
                  <span className="text-xs text-text-muted">{r.subtitle}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
