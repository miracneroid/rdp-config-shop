
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import Star from '@/components/ui/star';

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
      
      {/* Stars*/}
      <Star />
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

        {/* Left diagonal light beam Layer-1 (Superset)*/}
        <div className="absolute -top-4 -left-4 w-[850px] h- bg-[#5902ed] blur-2xl rotate-[125deg] rounded-full transform -translate-x-1/4 -translate-y-1/2 opacity-70 z-1"></div> {/* Changed from z-5 to z-5 */}
        {/* Left diagonal light beam Layer-2 (Superset)*/}
        <div className="absolute -top-4 -left-4 w-[750px] h- bg-[#502894] blur-2xl rotate-[125deg] rounded-full transform -translate-x-1/4 -translate-y-1/2 opacity-70 z-2"></div> {/* Changed from z-5 to z-5 */}
        {/* Left diagonal light beam Layer-3 (Superset)*/}
        <div className="absolute -top-4 -left-4 w-[650px] h- bg-[#3c2478] blur-2xl rotate-[125deg] rounded-full transform -translate-x-1/4 -translate-y-1/2 opacity-70 z-3"></div> {/* Changed from z-5 to z-5 */}
        {/* Left diagonal light beam Layer-4 (Subset of 1, Superset of 3)*/}
        <div className="absolute -top-4 -left-4 w-[375px] h- bg-[#643fb9] blur-2xl rotate-[125deg] rounded-full transform -translate-x-1/4 -translate-y-1/2 opacity-70 z-4"></div> {/* Changed from z-5 to z-5 */}
        {/* Left diagonal light beam Layer-5 (Smallest Subset)*/}
        <div className="absolute -top-8 -left-4 w-[315px] h-[400px] bg-[#b29cd8] blur-2xl rotate-[125deg] rounded-full transform -translate-x-1/4 -translate-y-1/2 opacity-70 z-5"></div> {/* Changed from z-5 to z-5 */}

        {/* Right diagonal light beam Layer-1 (Superset)*/}
        <div className="absolute -top-4 -right-4 w-[850px] h- bg-[#5902ed] blur-2xl rotate-[235deg] rounded-full transform translate-x-1/4 -translate-y-1/2 opacity-70 z-1"></div> {/* Changed from z-5 to z-5 */}
        {/* Right diagonal light beam Layer-2 (Superset)*/}
        <div className="absolute -top-4 -right-4 w-[750px] h- bg-[#502894] blur-2xl rotate-[235deg] rounded-full transform translate-x-1/4 -translate-y-1/2 opacity-70 z-2"></div> {/* Changed from z-5 to z-5 */}
        {/* Right diagonal light beam Layer-3 (Superset)*/}
        <div className="absolute -top-4 -right-4 w-[650px] h- bg-[#3c2478] blur-2xl rotate-[235deg] rounded-full transform translate-x-1/4 -translate-y-1/2 opacity-70 z-3"></div> {/* Changed from z-5 to z-5 */}
        {/* Right diagonal light beam Layer-4 (Subset of 1, Superset of 3)*/}
        <div className="absolute -top-4 -right-4 w-[375px] h- bg-[#643fb9] blur-2xl rotate-[235deg] rounded-full transform translate-x-1/4 -translate-y-1/2 opacity-70 z-4"></div> {/* Changed from z-5 to z-5 */}
        {/* Right diagonal light beam Layer-5 (Smallest Subset)*/}
        <div className="absolute -top-8 -right-4 w-[315px] h-[400px] bg-[#b29cd8] blur-2xl rotate-[235deg] rounded-full transform translate-x-1/4 -translate-y-1/2 opacity-70 z-5"></div> {/* Changed from z-5 to z-5 */}

        {/* Dashboard Image with Heart Shape Light Behind */}
        <div className="w-full max-w-[65rem] mx-auto relative">
          {/* Heart Shape Light Behind Dashboard */}
          <div className="heart-light-behind-dashboard"></div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl z-20"> {/* z-20 for dashboard */}
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
              src="/assets/images/dashboard.png"
              alt="TaskFlow AI Dashboard"
              className="w-full h-auto object-cover object-top"
              draggable="false"
            />
          </div>

          {/* This bottom lighting effect remains */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-[#6f42c1]/30 blur-3xl rounded-full"></div>
        </div>
      </div>
      </div>      
      
      {/* Inlined CSS for the heart shape light */}
      <style dangerouslySetInnerHTML={{
          __html: `
            .heart-light-behind-dashboard {
              position: absolute;
              width: 500px; /* Adjust size of the heart */
              height: 500px;
              top: %; /* Position to center it behind the dashboard */
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg); /* Center and rotate to form heart */
              background-color:#643fb9; /* Base pink/purple color for the heart */
              filter: blur(100px); /* Strong blur for diffuse glow */
              opacity: 0.3; /* Subtle opacity for the glow */
              z-index: 15; /* Behind dashboard (z-20) but in front of content (z-10) */
            }

            .heart-light-behind-dashboard::before,
            .heart-light-behind-dashboard::after {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              background-color:rgb(85, 16, 202); /* Same color as parent */
              border-radius: 50%; /* Make top parts rounded */
            }

            .heart-light-behind-dashboard::before {
              top: -50%;
              left: 0;
            }

            .heart-light-behind-dashboard::after {
              top: 0;
              left: 50%;
            }
          `
        }} />
    </section>
  );
};

export default HeroGradient1;