
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
  userData?: any;
  "data-piece-index"?: number;
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
  onPointerOut,
  userData,
  "data-piece-index": dataPieceIndex
}) => {
  const meshRef = useRef<Mesh>(null);
  
  // Subtle animation for main pillar pieces (not the orbital ones)
  useFrame((state) => {
    if (meshRef.current) {
      // Only apply subtle animation to the main stack pieces (0-4)
      if (dataPieceIndex !== undefined && dataPieceIndex < 5) {
        meshRef.current.rotation.x = rotation[0] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
        meshRef.current.rotation.y = rotation[1] + Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
      }
      
      // Apply scale based on hover state
      meshRef.current.scale.x = meshRef.current.scale.y = meshRef.current.scale.z = hovered ? scale * 1.1 : scale;
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      userData={userData}
      data-piece-index={dataPieceIndex}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={hovered ? '#8B5CF6' : color}
        transparent
        opacity={0.8}
        metalness={0.3}
        roughness={0.4}
      />
      {/* Top cylinders (studs) */}
      <mesh position={[0.25, 0.5, 0.25]}>
        <cylinderGeometry args={[0.18, 0.18, 0.2, 16]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[-0.25, 0.5, 0.25]}>
        <cylinderGeometry args={[0.18, 0.18, 0.2, 16]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0.25, 0.5, -0.25]}>
        <cylinderGeometry args={[0.18, 0.18, 0.2, 16]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[-0.25, 0.5, -0.25]}>
        <cylinderGeometry args={[0.18, 0.18, 0.2, 16]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
      </mesh>
    </mesh>
  );
};
