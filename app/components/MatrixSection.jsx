"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CHARS = "01";
const SHUFFLE_TIME = 50;
const TITLE_TEXT = "The God in the Machine";
const SUBTITLE_TEXT = "Deus Ex Machina";

export default function MatrixSection() {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [titleText, setTitleText] = useState(
    Array.from(
      { length: TITLE_TEXT.length },
      () => CHARS[Math.floor(Math.random() * CHARS.length)]
    ).join("")
  );

  const [subtitleText, setSubtitleText] = useState(
    Array.from(
      { length: SUBTITLE_TEXT.length },
      () => CHARS[Math.floor(Math.random() * CHARS.length)]
    ).join("")
  );

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const columns = canvas.width / 20;
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    function draw() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "rgba(0, 255, 0, 0.7)";
      ctx.font = "15px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(Math.random() * 128);
        ctx.fillText(text, i * 20, drops[i] * 20);

        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    }

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  // Text scramble effect
  useEffect(() => {
    if (!isInView) return;

    const revealText = (targetText, setText) => {
      const indices = Array.from({ length: targetText.length }, (_, i) => i);
      const remainingIndices = [...indices];

      const interval = setInterval(() => {
        if (remainingIndices.length === 0) {
          clearInterval(interval);
          return;
        }

        const randomIndex = Math.floor(Math.random() * remainingIndices.length);
        const revealIndex = remainingIndices[randomIndex];
        remainingIndices.splice(randomIndex, 1);

        setText((current) => {
          if (!current) return targetText;
          return current
            .split("")
            .map((char, i) => (i === revealIndex ? targetText[i] : char))
            .join("");
        });
      }, SHUFFLE_TIME);

      return () => clearInterval(interval);
    };

    revealText(TITLE_TEXT, setTitleText);
    setTimeout(() => {
      revealText(SUBTITLE_TEXT, setSubtitleText);
    }, 1000);
  }, [isInView]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center bg-black/20"
    >
      <canvas ref={canvasRef} className="absolute inset-0 opacity-90" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center space-y-8"
      >
        <h2 className="text-4xl font-bold text-green-400">{titleText}</h2>
        <p className="text-2xl text-green-300">{subtitleText}</p>
      </motion.div>
    </section>
  );
}
