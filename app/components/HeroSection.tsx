"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mounted, setMounted] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [subTitleText, setSubTitleText] = useState("");
  const [button1Text, setButton1Text] = useState("");
  const [button2Text, setButton2Text] = useState("");

  const fullTitleText = "a.i.ngel.world";
  const fullSubText = "A shell within a shell within a shell";
  const fullButton1Text = "Virtual Self";
  const fullButton2Text = "Explore";

  // Pre-generate matrix rain elements
  const matrixElements = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        left: i * 3.33,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 2,
        chars: Array.from({ length: 25 }).map(() =>
          String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96))
        ),
      })),
    []
  );

  // Type animation helper function
  const typeText = (
    text: string,
    setText: (text: string) => void,
    delay: number = 0,
    speed: number = 100
  ) => {
    let currentText = "";
    let currentIndex = 0;

    setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          currentText += text[currentIndex];
          setText(currentText);
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);
  };

  useEffect(() => {
    setMounted(true);
    // Start typing animations in sequence
    typeText(fullTitleText, setTitleText);
    typeText(fullSubText, setSubTitleText, 1500, 50);
    typeText(fullButton1Text, setButton1Text, 2500, 50);
    typeText(fullButton2Text, setButton2Text, 2500, 50);
  }, []);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let interval: NodeJS.Timeout | null = null;

    const startAnimation = () => {
      let iteration = 0;
      const originalText = title.dataset.value || "";

      if (interval) clearInterval(interval);

      interval = setInterval(() => {
        title.innerText = originalText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return originalText[index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iteration >= originalText.length) {
          if (interval) clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 100);
    };

    title.addEventListener("mouseover", startAnimation);

    return () => {
      if (interval) clearInterval(interval);
      title.removeEventListener("mouseover", startAnimation);
    };
  }, [mounted]); // Add mounted as dependency

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1.5 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 2 } },
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-purple-900/20 to-black/20">
      {mounted && (
        <>
          <div className="fixed inset-0 opacity-20 pointer-events-none">
            {matrixElements.map((elem, i) => (
              <div
                key={i}
                className="absolute top-0 text-green-300/50 animate-matrix-rain"
                style={{
                  left: `${elem.left}%`,
                  animationDuration: `${elem.duration}s`,
                  animationDelay: `${elem.delay}s`,
                }}
              >
                {elem.chars.map((char, j) => (
                  <div key={j} className="my-2">
                    {char}
                  </div>
                ))}
              </div>
            ))}
          </div>

          <motion.div
            className="text-center space-y-8"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <h1
              ref={titleRef}
              data-value="a.i.ngel.world"
              className="text-6xl font-bold text-transparent leading-normal 
                bg-clip-text bg-gradient-to-r from-white/50 via-purple-500 to-green-500 
                cursor-default"
            >
              {titleText}
            </h1>

            <motion.p
              variants={textVariants}
              className="text-2xl text-cyan-300 animate-glitch relative"
              style={{
                textShadow: "2px 2px #ff00ff, -1px -1px #00ffff",
                animation: "glitch 1s infinite",
              }}
            >
              {subTitleText}
            </motion.p>

            <motion.div variants={buttonVariants} className="flex justify-center space-x-4">
              <button
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 
                text-black font-bold rounded-full hover:from-cyan-400 hover:to-purple-400 
                transition-all transform hover:scale-105"
              >
                {button1Text}
              </button>
              <button
                className="px-6 py-2 border-2 border-cyan-500 text-cyan-500 
                font-bold rounded-full hover:bg-cyan-500 hover:text-black 
                transition-all transform hover:scale-105"
              >
                {button2Text}
              </button>
            </motion.div>
          </motion.div>

          <div className="fixed top-20 right-10 w-3/4 h-64 bg-black/30 backdrop-invert" />
          <div className="fixed top-25 right-24 w-1/4 h-2/3 bg-black/30 backdrop-invert" />
          <div className="fixed bottom-5 left-10 w-1/6 h-1/3 bg-black/30 backdrop-invert" />
        </>
      )}
    </section>
  );
}
