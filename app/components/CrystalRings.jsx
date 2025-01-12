"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";

const Crystal = ({ position = [0, 0, 0] }) => {
  const crystalRef = useRef();

  // Create geometries once outside render cycle
  const { geometry, bottomGeometry, geometry2, material } = useMemo(() => {
    const geometry = new THREE.CylinderGeometry(0, 0.7, 0.98, 6, 1);
    const bottomGeometry = new THREE.CylinderGeometry(0.7, 0.7, 1.4, 6);
    const geometry2 = new THREE.CylinderGeometry(0.7, 0, 0.98, 6, 1);
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 0.5,
      envMapIntensity: 1,
    });
    return { geometry, bottomGeometry, geometry2, material };
  }, []);

  // Cleanup geometries and materials on unmount
  useEffect(() => {
    return () => {
      geometry.dispose();
      bottomGeometry.dispose();
      geometry2.dispose();
      material.dispose();
    };
  }, [geometry, bottomGeometry, geometry2, material]);

  useFrame((state, delta) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={crystalRef} position={position}>
      <mesh geometry={geometry} material={material} position={[0, 0.675, 0]}>
        <meshPhysicalMaterial
          color={0x444444}
          metalness={0.2}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
          envMapIntensity={1}
        />
      </mesh>
      <mesh geometry={bottomGeometry} material={material} position={[0, -0.515, 0]}>
        <meshPhysicalMaterial
          color={0x444444}
          metalness={0.2}
          roughness={0.1}
          transmission={0.9}
          thickness={0.5}
          envMapIntensity={1}
        />
      </mesh>
      <mesh geometry={geometry2} material={material} position={[0, -1.705, 0]}>
        <meshPhysicalMaterial
          color={0x444444}
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
  const pyramidRef = useRef();
  const cubeRef = useRef();
  const octahedronRef = useRef();
  const tetrahedronRef = useRef();

  // Create ring geometries and materials once outside render cycle
  const { rings, ringGeometries, flatRingGeometry1, flatRingGeometry2, orbitingGeometries } =
    useMemo(() => {
      const rings = [
        { radius: 1.5, thickness: 0.02, color: 0xffffff, offset: [0.05, 0.02, -0.03] },
        { radius: 1.8, thickness: 0.015, color: 0xffffff, offset: [-0.03, 0, 0.02] },
        { radius: 2.1, thickness: 0.01, color: 0xffffff, offset: [0.02, 0.03, -0.02] },
      ];

      const ringGeometries = rings.map(
        (ring) => new THREE.TorusGeometry(ring.radius, ring.thickness, 16, 100)
      );

      const flatRingGeometry1 = new THREE.RingGeometry(1.3, 0.8, 6, 1);
      const flatRingGeometry2 = new THREE.RingGeometry(2.1, 1.4, 20, 24);

      // Create orbiting geometries
      const pyramidGeometry = new THREE.ConeGeometry(0.2, 0.4, 6);
      const cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
      const octahedronGeometry = new THREE.OctahedronGeometry(0.2);
      const tetrahedronGeometry = new THREE.TetrahedronGeometry(0.25);

      return {
        rings,
        ringGeometries,
        flatRingGeometry1,
        flatRingGeometry2,
        orbitingGeometries: {
          pyramidGeometry,
          cubeGeometry,
          octahedronGeometry,
          tetrahedronGeometry,
        },
      };
    }, []);

  // Cleanup geometries on unmount
  useEffect(() => {
    return () => {
      ringGeometries.forEach((geometry) => geometry.dispose());
      flatRingGeometry1.dispose();
      flatRingGeometry2.dispose();
      Object.values(orbitingGeometries).forEach((geometry) => geometry.dispose());
    };
  }, [ringGeometries, flatRingGeometry1, flatRingGeometry2, orbitingGeometries]);

  useFrame((state, delta) => {
    if (ringsRef.current) {
      ringsRef.current.rotation.z += delta * 0.3;
    }

    const orbitRadius = 2.5;
    const time = state.clock.getElapsedTime();

    // Update all orbiting objects
    const orbitingRefs = [
      { ref: pyramidRef, speed: 0.5, rotationSpeed: 2, phase: 0 },
      { ref: cubeRef, speed: 0.5, rotationSpeed: 1.5, phase: Math.PI / 2 },
      { ref: octahedronRef, speed: 0.5, rotationSpeed: 1.8, phase: Math.PI },
      { ref: tetrahedronRef, speed: 0.5, rotationSpeed: 1.2, phase: (3 * Math.PI) / 2 },
    ];

    orbitingRefs.forEach(({ ref, speed, rotationSpeed, phase }) => {
      if (ref.current) {
        ref.current.rotation.y += delta * rotationSpeed;
        ref.current.rotation.x += delta * rotationSpeed;
        ref.current.position.x = Math.cos(time * speed + phase) * orbitRadius;
        ref.current.position.y = Math.sin(time * speed + phase) * orbitRadius;
      }
    });
  });

  return (
    <group ref={ringsRef} position={position} rotation={[Math.PI / 2, 0, 0]}>
      <mesh rotation={[0, 0, 0]} geometry={flatRingGeometry1}>
        <meshPhysicalMaterial
          color={0xffffff}
          metalness={0.1}
          roughness={0.1}
          transparent={true}
          opacity={0.2}
        />
      </mesh>

      <mesh position={[0, 0, 0.01]} rotation={[0, 0, 0]} geometry={flatRingGeometry2}>
        <meshPhysicalMaterial
          color={0xaaaaaa}
          metalness={0.1}
          roughness={0.1}
          transparent={true}
          opacity={0.2}
        />
      </mesh>

      {rings.map((ring, index) => (
        <mesh key={index} position={ring.offset} geometry={ringGeometries[index]}>
          <meshPhysicalMaterial
            color={ring.color}
            metalness={0.8}
            roughness={0.2}
            transparent={true}
            opacity={0.8}
          />
        </mesh>
      ))}

      <mesh ref={pyramidRef} geometry={orbitingGeometries.pyramidGeometry}>
        <meshPhysicalMaterial
          color={0x88ccff}
          metalness={0.9}
          roughness={0.1}
          transparent={true}
          opacity={0.8}
        />
      </mesh>

      <mesh ref={cubeRef} geometry={orbitingGeometries.cubeGeometry}>
        <meshPhysicalMaterial
          color={0xff88cc}
          metalness={0.9}
          roughness={0.1}
          transparent={true}
          opacity={0.8}
        />
      </mesh>

      <mesh ref={octahedronRef} geometry={orbitingGeometries.octahedronGeometry}>
        <meshPhysicalMaterial
          color={0xccff88}
          metalness={0.9}
          roughness={0.1}
          transparent={true}
          opacity={0.8}
        />
      </mesh>

      <mesh ref={tetrahedronRef} geometry={orbitingGeometries.tetrahedronGeometry}>
        <meshPhysicalMaterial
          color={0xffcc88}
          metalness={0.9}
          roughness={0.1}
          transparent={true}
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};

const CrystalRings = () => {
  return (
    <>
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <group rotation={[Math.PI / 6, 0, Math.PI / 3]} position={[0, 0, 5]}>
        <Crystal position={[0, 0, 0]} />
        <Rings position={[0, 0, 0]} />
      </group>

      <Environment preset="dawn" />
    </>
  );
};

export default CrystalRings;
