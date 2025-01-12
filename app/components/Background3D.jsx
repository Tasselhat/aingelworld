"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect, useCallback, Suspense } from "react";
import { Vector3 } from "three";
import CrystalRings from "./CrystalRings";
import { Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { tokens, textOptions } from "../data/text";

function LoadingScreen() {
  return (
    <Html center className="relative z-20 top-20">
      <div className="flex flex-col items-center">
        <div className=" w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-cyan-400 animate-[loading_2s_ease-in-out_infinite]"
            style={{ width: "100%" }}
          />
        </div>
        <p className="text-cyan-400 mt-2">Loading...</p>
      </div>
    </Html>
  );
}

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

        const maxOffset = 5;
        const distanceFromOrigin = Math.sqrt(newX * newX + newY * newY);

        projectionVector.set(newX, newY, 0);
        projectionVector.project(state.camera);

        const isOffscreen =
          Math.abs(projectionVector.x) > 2 ||
          Math.abs(projectionVector.y) > 2 ||
          distanceFromOrigin > maxOffset;

        if (isOffscreen) {
          const randomAngle = Math.atan2(-prev.y, -prev.x) + (Math.random() - 0.5);
          const randomRadius = maxOffset * 0.4;
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
        <Suspense fallback={<LoadingScreen />}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          {objects}
          <CrystalRings />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Background3D;
