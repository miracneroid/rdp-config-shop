
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const HeroGradient1: React.FC = () => {
  // Pre-calculate grid points for better performance
  const gridPoints = React.useMemo(() => {
    const points = [];
    // Only generate 16 points (4x4 grid) for better performance
    for (let i = 0; i < 16; i++) {
      const row = Math.floor(i / 4);
      const col = i % 4;
      points.push({
        left: `${(col + 1) * 20}%`,
        top: `${(row + 1) * 20}%`,
        delay: `${(col + row) * 0.2}s`
      });
    }
    return points;
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden font-sora bg-black">
      {/* Background with deep purple gradient */}
      <div className="absolute inset-0 bg-black">
      
        {/* Simple star field effect */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-50 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Large grid pattern overlay */}
        <div className="absolute inset-0 opacity-30 z-10">
          {/* Horizontal grid lines - using static JSX instead of array mapping */}
          <div className="absolute w-full border-t border-white/25" style={{ top: '9%' }}></div>
          <div className="absolute w-full border-t border-white/40" style={{ top: '25%' }}></div>
          <div className="absolute w-full border-t border-white/40" style={{ top: '41%' }}></div>
          <div className="absolute w-full border-t border-white/25" style={{ top: '50%' }}></div>
          
          {/* Vertical grid lines - using static JSX instead of array mapping */}
          <div className="absolute h-full border-l border-white/40" style={{ left: '15%' }}></div>
          <div className="absolute h-full border-l border-white/40" style={{ left: '25%' }}></div>
          <div className="absolute h-full border-l border-white/40" style={{ left: '75%' }}></div>
          <div className="absolute h-full border-l border-white/40" style={{ left: '85%' }}></div>
          
          {/* Grid intersection stars - using pre-calculated points */}
          {gridPoints.map((point, i) => (
            <div 
              key={`star-${i}`} 
              className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.6)] animate-star"
              style={{ 
                left: point.left, 
                top: point.top,
                animationDelay: point.delay
              }}
            ></div>
          ))}
        </div>

        {/* Additional star-like particles */}
        <div className="absolute top-20 right-40 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.5)] animate-star" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute top-60 left-20 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.5)] animate-star" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-40 right-80 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.5)] animate-star" style={{ animationDelay: '0.8s' }}></div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16 relative z-5 flex flex-col items-center">
          
          {/* Badge */}
          <div className="bg-[rgba(255,255,255,0.1)] mt-24 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-2 mb-8 border border-white/20 text-white">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-sm font-medium tracking-wide">#1 BEST AI-POWERED TASKFLOW</span>
          </div>

          {/* Headline & Subheadline */}
          <h1 className="text-6xl text-center text-white leading-tight mb-6 max-w-5xl font-sora z-10">
            Revolutionize Your{" "}
            <span className="inline-block bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text animate-[pulse_2.5s_ease-in-out_infinite]">
              Workflow
            </span>
          </h1>
          <p className="text-base text-center text-white/90 max-w-5xl -mt-5 mb-8 font-sora z-10">
            Empowering you to work smarter, not harder, with cutting-edge AI solutions tailored for enhanced productivity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-16 z-10">
            <Link to="/configure" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3.5 rounded-full transition-all flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Get Started Now
            </Link>
            <Link to="/pricing" className="text-purple-900 bg-white hover:bg-gray-100 px-7 py-3.5 rounded-full transition-all">
              Explore Free
            </Link>
          </div>

          <div className="w-full max-w-[65rem] mx-auto relative">
            {/* Exact purple gradient glow effect matching the screenshot */}
            <div className="absolute inset-0 w-full h-full">
              {/* Main intense purple gradient - positioned higher and more concentrated */}
              <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-[140%] bg-gradient-radial from-purple-500/60 via-purple-600/40 to-transparent blur-[80px]"></div>
              
              {/* Secondary purple layer for depth */}
              <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[100%] h-[120%] bg-gradient-radial from-purple-400/50 via-purple-500/30 to-transparent blur-[60px]"></div>
              
              {/* Bottom purple glow to match screenshot */}
              <div className="absolute bottom-[-30%] left-1/2 -translate-x-1/2 w-[140%] h-[80%] bg-gradient-radial from-purple-600/70 via-purple-700/40 to-transparent blur-[100px]"></div>
              
              {/* Side purple glows */}
              <div className="absolute top-1/4 left-[-20%] w-[60%] h-[60%] bg-gradient-radial from-purple-500/40 to-transparent blur-[60px]"></div>
              <div className="absolute top-1/4 right-[-20%] w-[60%] h-[60%] bg-gradient-radial from-purple-500/40 to-transparent blur-[60px]"></div>
              
              {/* Inner intense glow */}
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-gradient-radial from-purple-400/60 via-purple-500/40 to-transparent blur-[40px]"></div>
            </div>

            {/* Dashboard Image */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl z-20">
              <div className="flex items-center gap-1.5 bg-black p-3 px-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="flex-1"></div>
                <div className="flex gap-3 text-white/50 text-xs">
                  <span>Dashboard</span>
                  <span>Digital tokens</span>
                  <span>Analytics</span>
                </div>
                <div className="flex-1"></div>
              </div>
              <img
                src="/public/lovable-uploads/dashboard-v3-dark-DkIL4YRw.webp"
                alt="TaskFlow AI Dashboard"
                className="w-full h-auto object-cover object-top"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </div>      
    </section>
  );
};

export default HeroGradient1;
