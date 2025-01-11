"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

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
  "✧",
  "✦",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const titleVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const cardVariants = {
  hidden: { scale: 0.8, opacity: 0, y: 50 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
};

export default function Y2KSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isCard1InView = useInView(card1Ref, { once: true, margin: "-50px" });
  const isCard2InView = useInView(card2Ref, { once: true, margin: "-50px" });
  const isCard3InView = useInView(card3Ref, { once: true, margin: "-50px" });
  const isCard4InView = useInView(card4Ref, { once: true, margin: "-50px" });

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
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500/30 via-pink-500/30 to-purple-500/30"
    >
      <div ref={containerRef} className="absolute inset-0 overflow-hidden" />
      <div className="relative text-center space-y-8 p-8">
        <motion.h2
          variants={titleVariants}
          className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse"
        >
          DEATH IS NOT THE END
        </motion.h2>
        <motion.p variants={titleVariants} className="text-2xl font-bold text-white animate-pulse">
          EVERYTHING IS CONNECTED
        </motion.p>
        <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
          <motion.div
            ref={card1Ref}
            variants={cardVariants}
            initial="hidden"
            animate={isCard1InView ? "visible" : "hidden"}
            whileHover="hover"
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold mb-3 text-cyan-300">Digital Dreams</h3>
            <p className="text-white/80">Explore the virtual landscapes of tomorrow</p>
          </motion.div>
          <motion.div
            ref={card2Ref}
            variants={cardVariants}
            initial="hidden"
            animate={isCard2InView ? "visible" : "hidden"}
            whileHover="hover"
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold mb-3 text-pink-300">Cyber Realms</h3>
            <p className="text-white/80">Dive into the depths of digital dimensions</p>
          </motion.div>
          <motion.div
            ref={card3Ref}
            variants={cardVariants}
            initial="hidden"
            animate={isCard3InView ? "visible" : "hidden"}
            whileHover="hover"
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold mb-3 text-purple-300">Techno Fusion</h3>
            <p className="text-white/80">Where humanity and technology intertwine</p>
          </motion.div>
          <motion.div
            ref={card4Ref}
            variants={cardVariants}
            initial="hidden"
            animate={isCard4InView ? "visible" : "hidden"}
            whileHover="hover"
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold mb-3 text-cyan-300">Future Now</h3>
            <p className="text-white/80">Experience tomorrows technology today</p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
