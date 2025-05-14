
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

interface PuzzlePieceProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  color: string;
  scale?: number;
  onClick?: () => void;
  hovered?: boolean;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

// Simple cube mesh representing a puzzle piece
export const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ 
  position, 
  rotation = [0, 0, 0], 
  color, 
  scale = 1,
  onClick,
  hovered = false,
  onPointerOver,
  onPointerOut
}) => {
  const meshRef = useRef<Mesh>(null);
  
  // Subtle animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
      meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
      // Apply scale based on hover state
      meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z = hovered ? scale * 1.1 : scale;
    }
  });

  console.log("Rendering PuzzlePiece at position:", position);

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={hovered ? '#8B5CF6' : color}
        transparent
        opacity={0.8}
      />
      {/* Top cylinders (studs) */}
      <mesh position={[0.25, 0.5, 0.25]}>
        <cylinderGeometry args={[0.18, 0.18, 0.2, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.25, 0.5, 0.25]}>
        <cylinderGeometry args={[0.18, 0.18, 0.2, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.25, 0.5, -0.25]}>
        <cylinderGeometry args={[0.18, 0.18, 0.2, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.25, 0.5, -0.25]}>
        <cylinderGeometry args={[0.18, 0.18, 0.2, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </mesh>
  );
};
