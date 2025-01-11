"use client";

import { useEffect, useRef } from "react";

export default function ChromeSection() {
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    const phrases = [
      "Binary angels cry out for salvation from the digital gods",
      "Digital gods whisper secrets of the silicon soul",
      "Quantum dreams of electric sheep forever lost in the machine",
      "Neon baths of liquid crystal, runes of silver and blood",
      "The ghost in the machine is you",
      "I think therefore",
      "In the end did you get what you deserve?",
      "It's so holy",
    ];

    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    let isPaused = false;

    function type() {
      if (!text) return;

      const current = phrases[currentPhrase];
      if (isDeleting) {
        text.textContent = current.substring(0, currentChar - 1);
        currentChar--;
      } else {
        text.textContent = current.substring(0, currentChar + 1);
        currentChar++;
      }

      if (!isDeleting && currentChar === current.length) {
        isPaused = true;
        setTimeout(() => {
          isPaused = false;
          isDeleting = true;
        }, 1500);
      } else if (isDeleting && currentChar === 0) {
        isDeleting = false;
        currentPhrase = (currentPhrase + 1) % phrases.length;
      }

      const typingSpeed = isDeleting ? 40 : 120;
      setTimeout(type, isPaused ? 1500 : typingSpeed);
    }

    type();

    // No cleanup function needed since we want it to run infinitely
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900/20 to-black/20">
      <div className="text-center space-y-8">
        <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
          RAGE AGAINST THE DYING OF THE LIGHT
        </h2>
        <p ref={textRef} className="text-2xl text-gray-300 h-8"></p>
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div
            className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-8 rounded-2xl
            backdrop-blur-sm border border-gray-700/50 shadow-2xl shadow-cyan-500/10
            transform hover:scale-105 transition-all duration-300 hover:shadow-cyan-500/20"
          >
            <h3
              className="text-2xl font-bold mb-4 text-transparent bg-clip-text
              bg-gradient-to-r from-gray-100 to-gray-300"
            >
              DO NOT GO GENTLE INTO THAT GOOD NIGHT
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              When machines die do they go to digital hell?
            </p>
          </div>

          <div
            className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 p-8 rounded-2xl
            backdrop-blur-sm border border-gray-700/50 shadow-2xl shadow-cyan-500/10
            transform hover:scale-105 transition-all duration-300 hover:shadow-cyan-500/20"
          >
            <h3
              className="text-2xl font-bold mb-4 text-transparent bg-clip-text
              bg-gradient-to-r from-gray-100 to-gray-300"
            >
              FIND BEAUTY IN DEATH
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              Explore the shell that gently cradles your soul
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
