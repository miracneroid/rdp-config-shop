
import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { PuzzlePiece } from './PuzzlePiece';

interface PuzzleSceneProps {
  interactive?: boolean;
}

// Initial positions for puzzle pieces to form a pattern
const initialPositions = [
  // Center piece
  { position: [0, 0, 0], color: '#6366f1', rotation: [0.1, 0.2, 0] },
  // Surrounding pieces
  { position: [1.5, 0, 0], color: '#818cf8', rotation: [0.2, 0, 0.1] },
  { position: [-1.5, 0, 0], color: '#6366f1', rotation: [0.3, 0.1, 0] },
  { position: [0, 0, 1.5], color: '#818cf8', rotation: [0, 0.3, 0.1] },
  { position: [0, 0, -1.5], color: '#6366f1', rotation: [0.1, 0.4, 0] },
  // Second layer
  { position: [0, 1.5, 0], color: '#9b87f5', rotation: [0.2, 0.3, 0.1] },
  { position: [1.5, 1.5, 0], color: '#7E69AB', rotation: [0.1, 0.2, 0.3] },
  { position: [-1.5, 1.5, 0], color: '#9b87f5', rotation: [0, 0.1, 0.2] },
  { position: [0, 1.5, 1.5], color: '#7E69AB', rotation: [0.3, 0, 0.1] },
];

const CameraController: React.FC = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef<any>();
  
  useEffect(() => {
    if (controlsRef.current) {
      // Set initial camera position
      camera.position.set(5, 4, 5);
      camera.lookAt(0, 0, 0);
    }
  }, [camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableZoom={true}
      enablePan={false}
      enableRotate={true}
      minDistance={4}
      maxDistance={10}
      autoRotate
      autoRotateSpeed={0.5}
    />
  );
};

export const PuzzleScene: React.FC<PuzzleSceneProps> = ({ 
  interactive = true 
}) => {
  const [hoveredPiece, setHoveredPiece] = useState<number | null>(null);
  const [clickedPieces, setClickedPieces] = useState<number[]>([]);

  const handlePieceClick = (index: number) => {
    if (!interactive) return;
    
    setClickedPieces(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-xl">
      <Canvas shadows dpr={[1, 2]}>
        <CameraController />
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={1} 
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <spotLight position={[-10, -10, -10]} intensity={0.5} />
        
        {initialPositions.map((props, i) => (
          <PuzzlePiece
            key={i}
            position={props.position as [number, number, number]}
            rotation={props.rotation as [number, number, number]}
            color={props.color}
            scale={1}
            hovered={hoveredPiece === i}
            onClick={() => handlePieceClick(i)}
            onPointerOver={() => interactive && setHoveredPiece(i)}
            onPointerOut={() => interactive && setHoveredPiece(null)}
          />
        ))}
      </Canvas>
    </div>
  );
};
