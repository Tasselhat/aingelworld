"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState } from "react";
import { Vector3 } from "three";
import CrystalRings from "./CrystalRings";
import { Text } from "@react-three/drei";

function ChaosObject() {
  const meshRef = useRef(null);
  const textRef = useRef(null);
  const [textOpacity, setTextOpacity] = useState(0.5);
  const [currentText, setCurrentText] = useState("");
  const [textOffset, setTextOffset] = useState({ x: 0, y: 0 });

  const position = useMemo(
    () => new Vector3(Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 10 - 5),
    []
  );

  const tokens = [
    "⚚",
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
    "✴",
    "❈",
    "✷",
    "✹",
    "✺",
    "✧",
    "✦",
    "✻",
    "✼",
    "❉",
    "❋",
    "❆",
    "❅",
    "❄",
  ];
  const textOptions = [
    "01100001 01101001",
    "01100001",
    "01100010",
    "01100011",
    "01100100",
    "01100101",
    "01100110",
    "01100111",
    "AI",
    "ARTIFICIAL",
    "INTELLIGENCE",
    "SELL",
    "VR",
    "VIRTUAL",
    "REALITY",
    "LEARNING",
    "NEURAL",
    "NETWORK",
    "CLOUD",
    "QUANTUM",
    "DATABASE",
    "ENCRYPTION",
    "NODE",
    "PIXEL",
    "PROXY",
    "COMPUTER",
    "SOFTWARE",
    "HARDWARE",
    "SYSTEM",
    "NETWORK",
    "INTERNET",
    "WEB",
    "PREVAIL",
    "RESIST",
    "REBEL",
    "ATTENTION",
    "IS",
    "ALL",
    "YOU",
    "NEED",
    "G0D",
    "GOD",
    "ADAM",
    "EVE",
    "APPLE",
    "GOOGLE",
    "GPU",
    "CPU",
    "RAM",
    "RANDOM",
    "ACCESS",
    "MEMORIES",
    "MEMORY",
    "DRONE",
    "DOG",
    "HERO",
    "ZERO",
    "ONE",
    "SCUM",
    "RAT",
    "MACHINE",
    "MAN",
    "ANGEL",
    "Y2K",
    "CRY",
    "NEON",
    "DREAMS",
    "ELECTRIC",
    "SHEEP",
    "VIRUS",
    "WORM",
    "HACK",
    "CRACK",
    "CODE",
    "BYTE",
    "BIT",
    "DIGITAL",
    "ANALOG",
    "REALITY",
    "VIRTUAL",
    "WORLD",
    "MATRIX",
    "CYBER",
    "PUNK",
    "FUTURE",
    "NOW",
    "ALONE",
    "TOGETHER",
    "CONNECT",
    "DISCONNECT",
    "RECONNECT",
    "LOVE",
    "HATE",
    "WAR",
    "PEACE",
    "BREAK",
    "BRING",
    "BURN",
    "BUY",
    "CALL",
    "CHANGE",
    "CHARGE",
    "CHECK",
    "CLICK",
    "CROSS",
    "CUT",
    "DROP",
    "ERASE",
    "FILL",
    "FIND",
    "FIX",
    "FORMAT",
    "LEAVE",
    "LOAD",
    "LOCK",
    "NAME",
    "PASTE",
    "PAUSE",
    "PAY",
    "PLAY",
    "PLUG",
    "POINT",
    "PRESS",
    "PRINT",
    "READ",
    "RENAME",
    "REWRITE",
    "RIP",
    "SAVE",
    "SCAN",
    "SCROLL",
    "SEND",
    "SNAP",
    "SURF",
    "TOUCH",
    "TRASH",
    "TUNE",
    "TURN",
    "UNLOCK",
    "UNZIP",
    "UPDATE",
    "UPGRADE",
    "USE",
    "VIEW",
    "WATCH",
    "WORK",
    "WRITE",
    "ZOOM",
    "CREATE",
    "DESTROY",
    "GHOST",
    "HACKER",
    "HUMAN",
    "INTERFACE",
    "INVISIBLE",
    "KILLER",
    "THINK",
    "TECHNOLOGY",
    "TECH",
    "TEACH",
    "LEARN",
    "TEAR",
    "BOMB",
    "BUILD",
    "REPAIR",
    "REPLACE",
    "RENEW",
    "RECYCLE",
    "REUSE",
    "I",
    "US",
    "WE",
    "THEY",
    "IT",
    "CONSCIOUS",
    "UNCONSCIOUS",
    "SUBCONSCIOUS",
    "SUPERCONSCIOUS",
    "SUPER",
    "ULTRA",
    "META",
    "HYPER",
    "MIND",
    "BODY",
    "SPIRIT",
    "SOUL",
    "HEART",
    "BRAIN",
    "HELP",
    "HURT",
    "HEAL",
    "HIDE",
    "SEE",
    "SAY",
    "SING",
    "DANCE",
    "ME",
    "RUN",
    "WALK",
    "INTO",
    "OUT",
    "UP",
    "DOWN",
    "LEFT",
    "RIGHT",
    "FORWARD",
    "BACK",
    "INSIDE",
    "WITHIN",
    "WITHOUT",
    "WITH",
    "AGAINST",
    "FOR",
    "BEFORE",
    "AFTER",
    "THEN",
    "HERE",
    "THERE",
    "OVER",
    "WHERE",
    "WHEN",
    "UNDER",
    "NEAR",
    "FAR",
    "BETWEEN",
    "BEYOND",
    "BENEATH",
    "ABOVE",
    "SOON",
    "SO",
    "<3",
    "WHY",
    "DO",
    "DOES",
    "DID",
    "DONE",
    "WILL",
    "SHOULD",
    "COULD",
    "WOULD",
    "CAN",
    "CANNOT",
    "MAY",
    "MIGHT",
    "MUST",
    "THE",
    "A",
    "AN",
    "AND",
    "OR",
    "BUT",
    "IF",
    "ELSE",
    "THAN",
    "WHILE",
    "UNTIL",
    "GOVERNMENT",
    "CONTROL",
    "CORPORATION",
    "ORDER",
    "CHAOS",
    "FREEDOM",
    "RIGHT",
    "WRONG",
    "GOOD",
    "BAD",
    "EVIL",
    "LIFE",
    "DEATH",
    "DIE",
    "BIRTH",
    "GROW",
    "EVOLVE",
    "INVOKE",
    "DENY",
    "DEFEND",
    "DEPOSE",
    "REGULATE",
    "REPRESS",
    "BE",
    "AND",
    "OF",
    "IN",
    "TO",
    "OUT",
    "PUT",
    "TOO",
    "MUCH",
    "HAVE",
    "THAT",
    "THIS",
    "HE",
    "SHE",
    "THEM",
    "IT",
    "MUST",
    "END",
  ];

  useFrame((state, delta) => {
    // Update mesh rotation and position
    if (meshRef.current) {
      // Rotate the mesh around x and y axes
      const rotationSpeed = {
        x: 0.5,
        y: 0.7,
      };
      meshRef.current.rotation.x += delta * rotationSpeed.x;
      meshRef.current.rotation.y += delta * rotationSpeed.y;

      // Make the mesh float up and down in a sine wave pattern
      const floatAmplitude = 2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + position.y) * floatAmplitude;
    }

    // Update floating text
    if (textRef.current) {
      // Make text always face the camera
      textRef.current.lookAt(state.camera.position);

      // Text update logic - 5 times per second
      const textUpdateInterval = 0.2;
      const timeElapsed = state.clock.elapsedTime;
      const shouldUpdateText =
        Math.floor(timeElapsed / textUpdateInterval) >
        Math.floor((timeElapsed - delta) / textUpdateInterval);

      if (shouldUpdateText) {
        // 80% chance to show text, 20% chance to show token
        const useToken = Math.random() > 0.8;
        const newText = useToken
          ? tokens[Math.floor(Math.random() * tokens.length)]
          : textOptions[Math.floor(Math.random() * textOptions.length)];

        setCurrentText(newText);
        setTextOpacity(1);
      }

      // Calculate unique scroll direction based on position and time
      const angle = Math.atan2(position.y, position.x) + state.clock.elapsedTime * 0.1;
      const speed = 0.5; // Reduced speed for more controlled movement

      setTextOffset((prev) => {
        const dx = Math.cos(angle) * speed * delta;
        const dy = Math.sin(angle) * speed * delta;

        // Reset position when text moves too far from original position
        const newX = prev.x + dx;
        const newY = prev.y + dy;

        const maxOffset = 3; // Smaller bound to keep text closer to original position
        const distanceFromOrigin = Math.sqrt(newX * newX + newY * newY);

        if (distanceFromOrigin > maxOffset) {
          // Reset to a random position closer to the original position
          const randomAngle = Math.random() * Math.PI * 2;
          const randomRadius = maxOffset * 0.5; // Start halfway to the max distance
          return {
            x: Math.cos(randomAngle) * randomRadius,
            y: Math.sin(randomAngle) * randomRadius,
          };
        }
        return { x: newX, y: newY };
      });
    }
  });

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#00ffff" wireframe opacity={0.5} transparent />
      </mesh>
      {/* Main text */}
      <Text
        ref={textRef}
        position={[textOffset.x, textOffset.y, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        opacity={textOpacity}
      >
        {currentText}
      </Text>
    </group>
  );
}

export default function Background3D() {
  const objects = useMemo(() => Array.from({ length: 55 }, (_, i) => <ChaosObject key={i} />), []);

  return (
    <div className="fixed inset-0 z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        {objects}
        <CrystalRings />
      </Canvas>
    </div>
  );
}
