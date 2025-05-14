
import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { PuzzlePiece } from './PuzzlePiece';

interface PuzzleSceneProps {
  interactive?: boolean;
}

// Initial positions for puzzle pieces to form a pillar
const initialPositions = [
  // Bottom to top (stacked vertically)
  { position: [0, -3, 0], color: '#6366f1', rotation: [0.1, 0.2, 0] },
  { position: [0, -1.5, 0], color: '#818cf8', rotation: [0.2, 0, 0.1] },
  { position: [0, 0, 0], color: '#9b87f5', rotation: [0.3, 0.1, 0] },
  { position: [0, 1.5, 0], color: '#7E69AB', rotation: [0, 0.3, 0.1] },
  { position: [0, 3, 0], color: '#8B5CF6', rotation: [0.1, 0.4, 0] },
  
  // Small pieces orbiting (will move in animation)
  { position: [2, -2, 0], color: '#7E69AB', rotation: [0.2, 0.3, 0.1] },
  { position: [-2, 0, -2], color: '#818cf8', rotation: [0.1, 0.2, 0.3] },
  { position: [2, 2, 2], color: '#9b87f5', rotation: [0, 0.1, 0.2] },
  { position: [-2, 3, 1], color: '#6366f1', rotation: [0.3, 0, 0.1] },
];

const CameraController: React.FC = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef<any>();
  
  useEffect(() => {
    if (controlsRef.current) {
      // Set initial camera position
      camera.position.set(5, 0, 8);
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
      minDistance={5}
      maxDistance={15}
      autoRotate
      autoRotateSpeed={0.5}
    />
  );
};

// Animation component for orbital pieces
const AnimatedPieces: React.FC<{
  positions: typeof initialPositions;
  onHover: (index: number | null) => void;
  onClick: (index: number) => void;
  hoveredPiece: number | null;
  clickedPieces: number[];
  interactive: boolean;
}> = ({ positions, onHover, onClick, hoveredPiece, clickedPieces, interactive }) => {
  // References for the moving pieces (indices 5-8 in our array)
  const movingPiecesIndices = [5, 6, 7, 8];
  
  // Use frame for animation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    // Animate only the orbital pieces (last 4)
    movingPiecesIndices.forEach((index, i) => {
      const pieceRef = document.querySelector(`[data-piece-index="${index}"]`);
      if (pieceRef) {
        const mesh = (pieceRef as any).__r3f.root.getState().scene.children.find(
          (c: any) => c.userData && c.userData.index === index
        );
        
        if (mesh) {
          // Create orbital animation with some variation
          const offset = i * (Math.PI / 2); // Offset each piece in the orbit
          const radius = 3 + i * 0.3; // Slightly different radii
          const height = Math.sin(t * 0.3 + i) * 2; // Vertical movement
          
          mesh.position.x = Math.cos(t * 0.5 + offset) * radius;
          mesh.position.z = Math.sin(t * 0.5 + offset) * radius;
          mesh.position.y = positions[index].position[1] + height * 0.3;
          
          // Additional rotation animation
          mesh.rotation.x += 0.003;
          mesh.rotation.y += 0.005;
        }
      }
    });
  });
  
  return (
    <>
      {positions.map((props, i) => (
        <PuzzlePiece
          key={i}
          position={props.position as [number, number, number]}
          rotation={props.rotation as [number, number, number]}
          color={props.color}
          scale={1}
          hovered={hoveredPiece === i}
          onClick={() => onClick(i)}
          onPointerOver={() => interactive && onHover(i)}
          onPointerOut={() => interactive && onHover(null)}
          userData={{ index: i }}
          data-piece-index={i}
        />
      ))}
    </>
  );
};

export const PuzzleScene: React.FC<PuzzleSceneProps> = ({ 
  interactive = true 
}) => {
  const [hoveredPiece, setHoveredPiece] = useState<number | null>(null);
  const [clickedPieces, setClickedPieces] = useState<number[]>([]);
  
  console.log("Rendering PuzzleScene with interactive:", interactive);

  const handlePieceClick = (index: number) => {
    console.log("Piece clicked:", index);
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
      <Canvas
        camera={{ position: [5, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={1} 
          castShadow
        />
        <spotLight position={[-10, -10, -10]} intensity={0.5} />
        
        <CameraController />
        
        <AnimatedPieces 
          positions={initialPositions}
          onHover={setHoveredPiece}
          onClick={handlePieceClick}
          hoveredPiece={hoveredPiece}
          clickedPieces={clickedPieces}
          interactive={interactive}
        />
      </Canvas>
    </div>
  );
};
