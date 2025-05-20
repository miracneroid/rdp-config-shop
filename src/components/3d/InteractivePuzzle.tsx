import React from 'react';
import Spline from '@splinetool/react-spline';

const InteractivePuzzle: React.FC = () => {
  return (
    <div
      className="
        fixed bottom-0 left-1/2 transform -translate-x-1/2
        w-full max-w-[600px] h-[300px]
        pointer-events-none z-[-1] bg-transparent
      "
    >
      <Spline scene="@/public/spline/model.splinecode" />
    </div>
  );
};

export default InteractivePuzzle;
