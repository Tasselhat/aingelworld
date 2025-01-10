"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

const Crystal = ({ position = [0, 0, 0] }) => {
  const crystalRef = useRef();

  // Create crystal geometry - top cone with matching segments
  const geometry = new THREE.CylinderGeometry(0, 1, 1.4, 6, 1);
  // Create bottom cylinder geometry with matching segments
  const bottomGeometry = new THREE.CylinderGeometry(1, 1, 2, 6);
  const geometry2 = new THREE.CylinderGeometry(1, 0, 1.4, 6, 1);

  // Create material with crystal-like properties
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.2,
    roughness: 0.1,
    transmission: 0.9,
    thickness: 0.5,
    envMapIntensity: 1,
  });

  // Rotate crystal clockwise
  useFrame((state, delta) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={crystalRef} position={position}>
      <mesh geometry={geometry} material={material} position={[0, 0.25, 0]}>
        <meshPhysicalMaterial
          color={0xffffff}
          metalness={0.2}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
          envMapIntensity={1}
        />
      </mesh>
      <mesh geometry={bottomGeometry} material={material} position={[0, -1.45, 0]}>
        <meshPhysicalMaterial
          color={0xffffff}
          metalness={0.2}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
          envMapIntensity={1}
        />
      </mesh>
      <mesh geometry={geometry2} material={material} position={[0, -3.15, 0]}>
        <meshPhysicalMaterial
          color={0xffffff}
          metalness={0.2}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
          envMapIntensity={1}
        />
      </mesh>
    </group>
  );
};

const Rings = ({ position = [0, 0, 0] }) => {
  const ringsRef = useRef();

  // Create multiple rings with different radii and offsets
  const rings = [
    { radius: 1.5, thickness: 0.02, color: 0xffffff, offset: [0.05, 0.02, -0.03] },
    { radius: 1.8, thickness: 0.015, color: 0xffffff, offset: [-0.03, -0.04, 0.02] },
    { radius: 2.1, thickness: 0.01, color: 0xffffff, offset: [0.02, 0.03, -0.02] },
  ];

  // Rotate rings around the crystal horizontally
  useFrame((state, delta) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.z -= delta * 0.3;
    }
  });

  return (
    <group ref={ringsRef} position={position} rotation={[Math.PI / 2, 0, 0]}>
      {/* Large flat cylinder between rings */}
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[1.5, 1, 1, 1]} />
        <meshPhysicalMaterial
          color={0xffffff}
          metalness={0.1}
          roughness={0.1}
          transparent={true}
          opacity={0.2}
        />
      </mesh>

      <mesh position={[0, 0, 0.01]} rotation={[0, 0, 0]}>
        <ringGeometry args={[2.1, 1.4, 20, 24]} />
        <meshPhysicalMaterial
          color={0xaaaaaa}
          metalness={0.1}
          roughness={0.1}
          transparent={true}
          opacity={0.2}
        />
      </mesh>

      {rings.map((ring, index) => (
        <mesh key={index} position={ring.offset}>
          <torusGeometry args={[ring.radius, ring.thickness, 16, 100]} />
          <meshPhysicalMaterial
            color={ring.color}
            metalness={0.8}
            roughness={0.2}
            transparent={true}
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};

const CrystalRings = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Crystal and Rings */}
      <group rotation={[Math.PI / 6, 0, Math.PI / 3]}>
        {" "}
        {/* Tilt group 30 degrees towards camera */}
        <Crystal position={[0, 0, 0]} />
        <Rings position={[0, 0, 0]} />
      </group>

      {/* Environment map for realistic reflections */}
      <Environment preset="dawn" />
    </>
  );
};

export default CrystalRings;
