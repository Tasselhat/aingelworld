"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mounted, setMounted] = useState(false);

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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let interval: NodeJS.Timeout | null = null;

    const startAnimation = () => {
      let iteration = 0;
      const originalText = title.dataset.value || "";

      clearInterval(interval as NodeJS.Timeout);

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
          clearInterval(interval as NodeJS.Timeout);
        }

        iteration += 1 / 3;
      }, 30);
    };

    startAnimation();
    title.addEventListener("mouseover", startAnimation);

    return () => {
      clearInterval(interval as NodeJS.Timeout);
      title.removeEventListener("mouseover", startAnimation);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-purple-900/20 to-black/20">
      {mounted && (
        <>
          <div className="fixed inset-0 opacity-20">
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
          <div className="text-center space-y-8">
            <h1
              ref={titleRef}
              data-value="a.i.ngel.world"
              className="text-6xl font-bold text-transparent leading-normal bg-clip-text bg-gradient-to-r from-white/50 via-purple-500 to-green-500 cursor-default"
            >
              a.i.ngel.world
            </h1>
            <p className="text-2xl text-cyan-300 glitch-text">
              A shell within a shell within a shell
            </p>
            <div className="flex justify-center space-x-4">
              <button className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-black font-bold rounded-full hover:from-cyan-400 hover:to-purple-400 transition-all transform hover:scale-105">
                Virtual Self
              </button>
              <button className="px-6 py-2 border-2 border-cyan-500 text-cyan-500 font-bold rounded-full hover:bg-cyan-500 hover:text-black transition-all transform hover:scale-105">
                Explore
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
