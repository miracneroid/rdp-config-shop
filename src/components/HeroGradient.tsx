
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
            Puzzle RDP{" "}
            <span className="inline-block bg-[#e6eeff] dark:bg-[#191970] text-[#202f5a] dark:text-[#f1eefc] rounded-md px-2 py-1 animate-[pulse_2.5s_ease-in-out_infinite]">
              Made Simple
            </span>
          </h1>
          <p className="text-base text-center text-white/90 max-w-5xl -mt-5 mb-8 font-sora z-10">
            Deploy secure, high-performance remote desktop environments tailored to your exact specifications within minutes.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-16 z-10">
            <Link to="/configure" className="bg-[#1241b8] hover:bg-[#2525cf] text-white/95 px-6 py-3.5 rounded-full transition-all flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Get Started Now
            </Link>
            <Link to="/pricing" className="text-[#3b1694] bg-gray-100 px-7 py-3.5 rounded-full transition-all">
              Explore Free
            </Link>
          </div>

          <div className="w-full max-w-[65rem] mx-auto relative">
            {/* Purple gradient glow effect behind dashboard - matching screenshot */}
            <div className="absolute inset-0 w-full h-full">
              {/* Main purple gradient background */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-600/30 via-purple-800/40 to-purple-900/50 blur-3xl transform scale-110"></div>
              
              {/* Secondary gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/25 to-transparent blur-2xl"></div>
              
              {/* Bottom gradient glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-3/5 bg-gradient-to-t from-purple-600/40 via-purple-700/30 to-transparent blur-3xl"></div>
              
              {/* Side gradients for width */}
              <div className="absolute top-1/4 left-0 w-1/3 h-1/2 bg-gradient-to-r from-purple-600/20 to-transparent blur-2xl"></div>
              <div className="absolute top-1/4 right-0 w-1/3 h-1/2 bg-gradient-to-l from-purple-600/20 to-transparent blur-2xl"></div>
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
