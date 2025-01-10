"use client";

import { useEffect, useRef } from "react";

const glyphs = [
  "⚚",
  "⚢",
  "⚣",
  "⚤",
  "⚥",
  "⚦",
  "⚨",
  "⚩",
  "⚬",
  "⚭",
  "⚮",
  "⌭",
  "◈",
  "⎔",
  "⏣",
  "⏥",
  "⌬",
  "◎",
  "✧",
  "✦",
  "❖",
  "❈",
  "✷",
  "✹",
  "✺",
  "✻",
  "✼",
  "❉",
  "❋",
  "❆",
  "❅",
  "❄",
  "✧",
  "✦",
];

export default function Y2KSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createGlyph = () => {
      const glyph = document.createElement("div");
      glyph.innerText = glyphs[Math.floor(Math.random() * glyphs.length)];
      glyph.className = "absolute text-3xl animate-pulse transition-all duration-1000";
      glyph.style.left = `${Math.random() * 100}%`;
      glyph.style.top = `${Math.random() * 100}%`;
      glyph.style.color = `hsl(0, 0%, 75%)`;
      glyph.style.textShadow = "0 0 10px currentColor";
      container.appendChild(glyph);

      setTimeout(() => {
        glyph.style.opacity = "1";
        glyph.style.transform = `rotate(${Math.random() * 360}deg) scale(1.2)`;
      }, 100);

      setTimeout(() => {
        glyph.style.opacity = "0";
        setTimeout(() => {
          container.removeChild(glyph);
        }, 1000);
      }, 3000);
    };

    const interval = setInterval(createGlyph, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500/30 via-pink-500/30 to-purple-500/30">
      <div ref={containerRef} className="absolute inset-0 overflow-hidden" />
      <div className="relative text-center space-y-8 p-8">
        <h2 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse">
          DEATH IS NOT THE END
        </h2>
        <p className="text-2xl font-bold text-white animate-pulse">EVERYTHING IS CONNECTED</p>
        <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all hover:scale-105">
            <h3 className="text-2xl font-bold mb-3 text-cyan-300">Digital Dreams</h3>
            <p className="text-white/80">Explore the virtual landscapes of tomorrow</p>
          </div>
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all hover:scale-105">
            <h3 className="text-2xl font-bold mb-3 text-pink-300">Cyber Realms</h3>
            <p className="text-white/80">Dive into the depths of digital dimensions</p>
          </div>
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all hover:scale-105">
            <h3 className="text-2xl font-bold mb-3 text-purple-300">Techno Fusion</h3>
            <p className="text-white/80">Where humanity and technology intertwine</p>
          </div>
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all hover:scale-105">
            <h3 className="text-2xl font-bold mb-3 text-cyan-300">Future Now</h3>
            <p className="text-white/80">Experience tomorrows technology today</p>
          </div>
        </div>
      </div>
    </section>
  );
}
