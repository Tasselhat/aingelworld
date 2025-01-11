"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Vector3 } from "three";
import CrystalRings from "./CrystalRings";
import { Text } from "@react-three/drei";
import * as THREE from "three";

function ChaosObject() {
  const meshRef = useRef(null);
  const textRef = useRef(null);
  const [textOpacity, setTextOpacity] = useState(0.5);
  const [currentText, setCurrentText] = useState("");
  const [textOffset, setTextOffset] = useState({ x: 0, y: 0 });

  // Memoize position to prevent recreation
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
    "SELF",
    "NETWORK",
    "CLOUD",
    "QUANTUM",
    "SNAKE",
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
    "=)",
    "=(",
    "!?",
    "?!",
    "!!!",
    "???",
    "ANGER",
    "RAGE",
    "HURT",
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
    "DEPLOY",
    "DEBUG",
    "OPTIMIZE",
    "COMPILE",
    "ENCRYPT",
    "SYNC",
    "PARSE",
    "MERGE",
    "REFACTOR",
    "INTEGRATE",
    "CONFIGURE",
    "MIGRATE",
    "AUTHENTICATE",
    "CACHE",
    "VALIDATE",
    "BACKUP",
    "INDEX",
    "EXECUTE",
    "RENDER",
    "SERIALIZE",
    "INTEGRATE",
    "CONFIGURE",
    "INTERPRET",
    "MISSILE",
    "LAUNCH",
    "TARGET",
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
    "EVERYONE",
    "EVERYTHING",
    "EVERYWHERE",
    "ALL",
    "AT",
    "ONCE",
    "ALWAYS",
    "NEVER",
    "NOTHING",
    "EVER",
    "HAPPENS",
    "SOMETIMES",
  ];
  // Memoize update text function to prevent recreation
  const updateText = useCallback((tokens, textOptions) => {
    const useToken = Math.random() > 0.9;
    const newText = useToken
      ? tokens[Math.floor(Math.random() * tokens.length)]
      : textOptions[Math.floor(Math.random() * textOptions.length)];

    setCurrentText(newText);
    setTextOpacity(1);
  }, []);

  // Memoize geometries array
  const geometries = useMemo(
    () => [
      { type: "boxGeometry", args: [0.5, 0.5, 0.5] },
      { type: "dodecahedronGeometry", args: [0.4, 0] },
      { type: "icosahedronGeometry", args: [0.5, 0] },
      { type: "octahedronGeometry", args: [0.5, 0] },
      { type: "tetrahedronGeometry", args: [0.5, 0] },
    ],
    []
  );

  const randomGeometry = useMemo(() => {
    const geom = geometries[Math.floor(Math.random() * geometries.length)];
    return geom;
  }, [geometries]);

  // Memoize vector for projection calculations
  const projectionVector = useMemo(() => new THREE.Vector3(), []);

  // Create and memoize geometry instance
  const geometry = useMemo(() => {
    const GeometryClass =
      THREE[randomGeometry.type.charAt(0).toUpperCase() + randomGeometry.type.slice(1)];
    return new GeometryClass(...(randomGeometry.args || []));
  }, [randomGeometry]);

  // Create and memoize material instance
  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: "#00ffaa",
      wireframe: true,
      opacity: 0.5,
      transparent: true,
    });
  }, []);

  // Cleanup geometries and materials on unmount
  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const rotationSpeed = {
        x: 0.5,
        y: 0.7,
      };
      meshRef.current.rotation.x += delta * rotationSpeed.x;
      meshRef.current.rotation.y += delta * rotationSpeed.y;

      const floatAmplitude = 2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime + position.y) * floatAmplitude;
    }

    if (textRef.current) {
      textRef.current.lookAt(state.camera.position);

      const textUpdateInterval = 0.2;
      const timeElapsed = state.clock.elapsedTime;
      const shouldUpdateText =
        Math.floor(timeElapsed / textUpdateInterval) >
        Math.floor((timeElapsed - delta) / textUpdateInterval);

      if (shouldUpdateText) {
        updateText(tokens, textOptions);
      }

      const angle = Math.atan2(position.y, position.x) + state.clock.elapsedTime * 0.1;
      const speed = 0.5;

      setTextOffset((prev) => {
        const dx = Math.cos(angle) * speed * delta;
        const dy = Math.sin(angle) * speed * delta;

        const newX = prev.x + dx;
        const newY = prev.y + dy;

        const maxOffset = 3;
        const distanceFromOrigin = Math.sqrt(newX * newX + newY * newY);

        projectionVector.set(newX, newY, 0);
        projectionVector.project(state.camera);

        const isOffscreen =
          Math.abs(projectionVector.x) > 1 ||
          Math.abs(projectionVector.y) > 1 ||
          distanceFromOrigin > maxOffset;

        if (isOffscreen) {
          const randomAngle = Math.atan2(-prev.y, -prev.x) + (Math.random() - 0.5);
          const randomRadius = maxOffset * 0.5;
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
      <mesh ref={meshRef} geometry={geometry} material={material} />
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

const Background3D = () => {
  const objects = useMemo(() => Array.from({ length: 45 }, (_, i) => <ChaosObject key={i} />), []);

  return (
    <div className="fixed inset-0 z-10">
      <Canvas camera={{ position: [0, 0, 9] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        {objects}
        <CrystalRings />
      </Canvas>
    </div>
  );
};

export default Background3D;
