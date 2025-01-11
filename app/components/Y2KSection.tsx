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
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
  // Tunnel effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;
    const segments = 16;
    const rings = 15;

    function animate() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "rgba(11, 11, 11, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      for (let ring = rings; ring > 0; ring--) {
        const radius = ring * 40 + Math.sin(time + ring * 0.2) * 20;
        const hue = (time * 50 + ring * 20) % 360;

        ctx.beginPath();
        for (let segment = 0; segment <= segments; segment++) {
          const angle = (segment / segments) * Math.PI * 2;
          const wobble = Math.sin(time * 3 + ring + angle * 2) * 20;
          const x = centerX + Math.cos(angle + time) * (radius + wobble);
          const y = centerY + Math.sin(angle + time) * (radius + wobble);

          if (segment === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.strokeStyle = `hsla(${hue}, 70%, 60%, ${0.5 - ring * 0.03})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      time += 0.01;
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500/30 via-pink-500/30 to-purple-500/30 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />
      <div ref={containerRef} className="absolute inset-0 overflow-hidden" />
      <div className="relative text-center space-y-8 p-8 max-h-screen overflow-y-auto">
        <motion.h2
          variants={titleVariants}
          className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] animate-pulse"
        >
          DEATH IS NOT THE END
        </motion.h2>
        <motion.p
          variants={titleVariants}
          className="text-xl md:text-2xl font-bold text-white animate-pulse"
        >
          EVERYTHING IS CONNECTED
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
          <motion.div
            ref={card1Ref}
            variants={cardVariants}
            initial="hidden"
            animate={isCard1InView ? "visible" : "hidden"}
            whileHover="hover"
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-cyan-300">
              Digital Dreams
            </h3>
            <p className="text-sm md:text-base text-white/80">
              Explore the virtual landscapes of tomorrow
            </p>
          </motion.div>
          <motion.div
            ref={card2Ref}
            variants={cardVariants}
            initial="hidden"
            animate={isCard2InView ? "visible" : "hidden"}
            whileHover="hover"
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-pink-300">
              Cyber Realms
            </h3>
            <p className="text-sm md:text-base text-white/80">
              Dive into the depths of digital dimensions
            </p>
          </motion.div>
          <motion.div
            ref={card3Ref}
            variants={cardVariants}
            initial="hidden"
            animate={isCard3InView ? "visible" : "hidden"}
            whileHover="hover"
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-purple-300">
              Techno Fusion
            </h3>
            <p className="text-sm md:text-base text-white/80">
              Where humanity and technology intertwine
            </p>
          </motion.div>
          <motion.div
            ref={card4Ref}
            variants={cardVariants}
            initial="hidden"
            animate={isCard4InView ? "visible" : "hidden"}
            whileHover="hover"
            className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-cyan-300">Future Now</h3>
            <p className="text-sm md:text-base text-white/80">
              Experience tomorrows technology today
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
