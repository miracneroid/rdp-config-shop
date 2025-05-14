
import React, { useEffect } from 'react';
import { PuzzleScene } from './PuzzleScene';

interface InteractivePuzzleProps {
  className?: string;
}

const InteractivePuzzle: React.FC<InteractivePuzzleProps> = ({ className }) => {
  return (
    <div className={`${className || ''} relative`}>
      <PuzzleScene interactive={true} />
      <div className="absolute bottom-4 right-4 text-white/70 text-sm flex items-center">
        <span className="mr-2">Click and drag to rotate</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 15l6 6m-6-6v4.8m0-4.8h4.8"/>
          <path d="M9 19.8V15m0 0H4.2M9 15l-6 6"/>
          <path d="M15 4.2V9m0 0h4.8M15 9l6-6"/>
          <path d="M9 4.2V9m0 0H4.2M9 9L3 3"/>
        </svg>
      </div>
    </div>
  );
};

export default InteractivePuzzle;
