"use client";

import { useEffect, useRef } from "react";

const glyphs = [
  "☯",
  "☮",
  "⚛",
  "⚕",
  "⚚",
  "⚠",
  "⚡",
  "⚢",
  "⚣",
  "⚤",
  "⚥",
  "⚦",
  "⚧",
  "⚨",
  "⚩",
  "⚪",
  "⚫",
  "⚬",
  "⚭",
  "⚮",
];

export default function GlyphSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createGlyph = () => {
      const glyph = document.createElement("div");
      glyph.innerText = glyphs[Math.floor(Math.random() * glyphs.length)];
      glyph.className = "absolute text-2xl text-white opacity-0 transition-opacity duration-1000";
      glyph.style.left = `${Math.random() * 100}%`;
      glyph.style.top = `${Math.random() * 100}%`;
      container.appendChild(glyph);

      setTimeout(() => {
        glyph.classList.remove("opacity-0");
      }, 100);

      setTimeout(() => {
        glyph.classList.add("opacity-0");
        setTimeout(() => {
          container.removeChild(glyph);
        }, 1000);
      }, 3000);
    };

    const interval = setInterval(createGlyph, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-900 via-black to-green-900">
      <div ref={containerRef} className="absolute inset-0" />
      <div className="relative z-10 text-center space-y-8">
        <h2 className="text-4xl font-bold text-white">Mystic Glyphs</h2>
        <p className="text-2xl text-green-300">Everything is connected</p>
      </div>
    </section>
  );
}
