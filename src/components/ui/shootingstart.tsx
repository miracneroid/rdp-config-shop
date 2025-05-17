import React from 'react';

const ShootingStar = () => {
  return (
    <div className="relative w-full max-w-2xl mx-auto h-16 mb-8 overflow-visible">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 230 50"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Gradient for the trail */}
            <linearGradient id="shootingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.21)" />
                <stop offset="100%" stopColor="rgb(255, 255, 255)" />
            </linearGradient>


          {/* Mask that starts large and shrinks, creating the tapered effect */}
          <mask id="brushStrokeMask">
            <rect width="100%" height="100%" fill="black" />
            <circle r="9" fill="white">
              {/* Moves along the path */}
              <animateMotion
                dur="2s"
                repeatCount="indefinite"
                path="M0,40 C75,0 200,0 200,0"  // Changed path here
              />
              {/* Simulates paint stroke shrinking from thick to thin */}
              <animate
                attributeName="r"
                values="6;1"
                dur="2s"
                repeatCount="indefinite"
                keyTimes="0;1"
                keySplines="0.4 0 0.2 1"
                calcMode="spline"
              />
              <animate
                    attributeName="r"
                    values="6;1"
                    dur="2s"
                    repeatCount="indefinite"
                    keyTimes="0;1"
                    keySplines="0.4 0 0.2 1"
                    calcMode="spline"
                />
            </circle>
          </mask>

          {/* Define a filter for the glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
            <animate
              attributeName="stdDeviation"
              values="0 0; 3 3; 0 0"
              dur="2s"
              repeatCount="indefinite"
              keyTimes="0; 0.5; 1"
            />
          </filter>

        </defs>

        {/* Light background trail path */}
        <path
            d="M0,40 C75,0 200,0 200,0" // Changed path here
            fill="none"
            stroke="url(#shootingGradient)"
            strokeWidth="5"
            strokeLinecap="round"
        />

        <circle
            cx="400"
            cy="50"
            r="9"
            fill="white"
            filter="url(#glow)"
        />

        {/* Main animated trail with thickening and glow */}
        <path
          id="shootingPath"
          d="M0,40 C75,0 200,0 200,0" // Changed path here
          fill="none"
          stroke="url(#shootingGradient)"
          strokeWidth="7"
          strokeLinecap="round"
          mask="url(#brushStrokeMask)"
          filter="url(#glow)"
        >
          <animate
            attributeName="stroke-width"
            values="1;2;3;4;5;6;5;4;3;2;1"
            dur="2s"
            repeatCount="indefinite"
            keyTimes="0;0.1;0.2;0.3;0.4;0.5;0.6;0.7;0.8;0.9;1"
          />
        </path>

        {/* Moving star - now with scaling animation */}
        <circle r="9" fill="white">
          <animateMotion dur="2s" repeatCount="indefinite">
            <mpath xlinkHref="#shootingPath" />
          </animateMotion>
          <animate
            attributeName="r"
            values="3;5;3"
            dur="2s"
            repeatCount="indefinite"
            keyTimes="0;0.5;1"
          />
        </circle>
      </svg>
    </div>
  );
};

export default ShootingStar;
