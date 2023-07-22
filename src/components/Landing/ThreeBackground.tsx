"use client";
// components/Landing/ThreeBackground.tsx

import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import React, { useRef, memo } from "react";

import { pointsInner, pointsOuter } from "@/lib/three-utils";

export const ThreeBackground = () => {
  return (
    <Canvas
      camera={{ position: [0, -6.5, 20] }}
      className="bg-[#101010]"
      style={{ height: "100vh" }}
    >
      <OrbitControls maxDistance={30} minDistance={10} />
      <directionalLight />
      <pointLight position={[0, -7, 30]} power={10.0} />
      <PointCircle />
    </Canvas>
  );
};

const PointCircleComponent = () => {
  const ref = useRef<THREE.Group>(null);
  const rotationSpeed = 0.0005;

  useFrame(() => {
    if (ref.current) {
      ref.current.position.y = -0.5;
      ref.current.rotation.x += rotationSpeed;
      ref.current.rotation.y += rotationSpeed;
      ref.current.rotation.z += rotationSpeed;
    }
  });

  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const PointCircle = memo(PointCircleComponent);

interface IPoint {
  position: [number, number, number];
  color: string;
}

const Point = ({ position, color }: IPoint) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial color={color} />
    </Sphere>
  );
};
