
import React from 'react';

const PuzzleIcon = ({ className }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M19 9h-1.5a2.5 2.5 0 0 1 0-5h.5a2 2 0 0 1 2 2v.5a2.5 2.5 0 0 1-1 2Z" />
      <path d="M12 19v-1.5a2.5 2.5 0 0 1 5 0v.5a2 2 0 0 1-2 2h-.5a2.5 2.5 0 0 1-2-1Z" />
      <path d="M5 12H6.5a2.5 2.5 0 0 1 0 5H6a2 2 0 0 1-2-2v-.5a2.5 2.5 0 0 1 1-2.5Z" />
      <path d="M12 5v1.5a2.5 2.5 0 0 1-5 0V6a2 2 0 0 1 2-2h.5a2.5 2.5 0 0 1 2.5 1Z" />
    </svg>
  );
};

export default PuzzleIcon;
