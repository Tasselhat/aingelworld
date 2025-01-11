"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mounted, setMounted] = useState(false);
  const [titleText, setTitleText] = useState("");
  const [subTitleText, setSubTitleText] = useState("");
  const [button1Text, setButton1Text] = useState("");
  const [button2Text, setButton2Text] = useState("");

  const fullTitleText = "a.i.ngel.cloud";
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
    const getRandomChar = () => {
      // Cycle through common Unicode ranges for interesting characters
      const ranges = [
        [0x0021, 0x007e], // Basic Latin (printable ASCII)
        [0x0391, 0x03a9], // Greek uppercase only
        [0x03b1, 0x03c9], // Greek lowercase only
        [0x0410, 0x042f], // Cyrillic uppercase only
        [0x0430, 0x044f], // Cyrillic lowercase only
        [0x3042, 0x3096], // Hiragana (common use only)
        [0x30a2, 0x30f4], // Katakana (common use only)
        [0x20a0, 0x20b9], // Common currency symbols only
        [0x2600, 0x26ff], // Miscellaneous Symbols
        [0x2700, 0x27bf], // Dingbats
        [0x2190, 0x21ff], // Arrows
        [0x25a0, 0x25ff], // Geometric Shapes
        [0x2460, 0x24ff], // Enclosed Alphanumerics
        [0x2000, 0x206f], // General Punctuation
        [0x2100, 0x214f], // Letterlike Symbols
        [0x2300, 0x23ff], // Miscellaneous Technical
      ];

      // Pick a random range
      const range = ranges[Math.floor(Math.random() * ranges.length)];
      // Get random character code within that range
      const charCode = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
      return String.fromCharCode(charCode);
    };

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
            return getRandomChar();
          })
          .join("");

        if (iteration >= originalText.length) {
          if (interval) clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 70);
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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 2 },
    },
  };

  const buttonAnimationProps = {
    animate: {
      scale: [1, 1.02, 1],
      boxShadow: [
        "0 0 0 rgba(0,255,255,0)",
        "0 0 20px rgba(0,255,255,0.3)",
        "0 0 0 rgba(0,255,255,0)",
      ],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-purple-900/20 to-black/20 overflow-hidden">
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

          <Image
            src="/TasselHat_A.I._archangel_Y2K_chrome_glyphs_and_crystals_photore_27e1ef66-6d14-44e4-925f-155eca991708.png"
            width={200}
            height={200}
            alt="Angel"
            className="fixed top-1/4 left-80 opacity-30"
          />
          <Image
            src="/tasselhat_Virtual_A.I._binary_technic_angel_Y2K_chrome_glyphs_a_75ab2df7-d075-410c-a20b-0df7dc6fc9e7.png"
            width={200}
            height={200}
            alt="Angel"
            className="fixed top-1/4 right-1/4 opacity-25"
          />

          <div className="fixed inset-0 pointer-events-none flex flex-col items-center">
            <div className="absolute left-0 whitespace-nowrap animate-scroll-left text-purple-500/30 text-xl top-1/4">
              Binary angels cry out for salvation from the digital gods
            </div>
            <div className="absolute right-0 whitespace-nowrap animate-scroll-right text-cyan-500/30 text-xl top-1/3">
              Digital gods whisper secrets of the silicon soul
            </div>
            <div className="absolute right-0 whitespace-nowrap animate-scroll-left text-green-500/30 text-xl top-2/3">
              Sleepwalking engrams with severed wings
            </div>
            <div className="absolute left-0 whitespace-nowrap animate-scroll-right text-purple-500/30 text-xl top-3/4">
              Technology high quality complex physiological
            </div>
            <div className="absolute left-1/3 whitespace-nowrap animate-scroll-left text-blue-500/30 text-xl top-1/2">
              Lately, I&apos;ve been hearing cries of angels when I close my eyes
            </div>
            <div className="absolute right-1/4 whitespace-nowrap animate-scroll-right text-red-500/30 text-xl top-5/6">
              Neon baths of liquid crystal, runes of silver and blood
            </div>
            <div className="absolute left-2/3 whitespace-nowrap animate-scroll-left text-yellow-500/30 text-xl top-[15%]">
              The ghost in the machine is you
            </div>
            <div className="absolute right-2/3 whitespace-nowrap animate-scroll-left text-orange-500/30 text-xl top-[85%]">
              Unlock your Virtual Self, tell my how it felt when you walked on water
            </div>
            <div className="absolute right-1/3 whitespace-nowrap animate-scroll-right text-pink-500/30 text-xl top-[65%]">
              Look at the sky
            </div>
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
              className="text-2xl text-cyan-400 glitch-text"
              data-text={subTitleText}
            >
              {subTitleText}
            </motion.p>

            <motion.div variants={buttonVariants} className="flex justify-center space-x-4">
              <motion.button
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 
                text-black font-bold rounded-full hover:from-cyan-400 hover:to-purple-400 
                transition-all transform hover:scale-105"
                {...buttonAnimationProps}
              >
                {button1Text}
              </motion.button>
              <motion.button
                className="px-6 py-2 border-2 border-cyan-500 text-cyan-500 
                font-bold rounded-full hover:bg-cyan-500 hover:text-black 
                transition-all transform hover:scale-105"
                {...buttonAnimationProps}
              >
                {button2Text}
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            className="fixed top-20 right-10 w-3/4 h-64 bg-black/30 backdrop-invert"
            animate={{
              x: [0, 20, 0, -20, 0],
              y: [0, -10, 20, -10, 0],
            }}
            transition={{
              duration: 180,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="fixed top-25 right-24 w-1/4 h-2/3 bg-black/30 backdrop-grayscale"
            animate={{
              x: [0, -30, 0, 30, 0],
              y: [0, 20, -20, 20, 0],
            }}
            transition={{
              duration: 140,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="fixed top-25 left-24 w-1/6 h-1/2 bg-black/30 backdrop-[hue-rotate(110deg)]"
            animate={{
              x: [0, 40, -40, 40, 0],
              y: [0, -30, 30, -30, 0],
            }}
            transition={{
              duration: 160,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="fixed bottom-5 left-10 w-1/6 h-1/3 bg-black/30 backdrop-invert"
            animate={{
              x: [0, -25, 25, -25, 0],
              y: [0, 15, -15, 15, 0],
            }}
            transition={{
              duration: 90,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}
    </section>
  );
}
