
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const HeroGradient: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden font-sora">
      {/* Background with deep purple gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#341d6d] via-[#2d1a67] to-[#1c0c55] z-0">
        {/* Large grid pattern overlay */}
        <div className="absolute inset-0 opacity-30">
          {/* Horizontal grid lines */}
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(5)].map((_, i) => (
              <div key={`h-${i}`} className="w-full border-t border-white/20" style={{ top: `${(i + 1) * 20}%` }}></div>
            ))}
          </div>
          
          {/* Vertical grid lines */}
          <div className="absolute inset-0 grid grid-rows-1 md:grid-rows-3 lg:grid-rows-4">
            {[...Array(5)].map((_, i) => (
              <div key={`v-${i}`} className="h-full border-l border-white/20" style={{ left: `${(i + 1) * 20}%` }}></div>
            ))}
          </div>
          
          {/* Grid intersection stars */}
          {[...Array(16)].map((_, i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            return (
              <div 
                key={`star-${i}`} 
                className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.6)] animate-star"
                style={{ 
                  left: `${(col + 1) * 20}%`, 
                  top: `${(row + 1) * 20}%`,
                  animationDelay: `${(col + row) * 0.2}s`
                }}
              ></div>
            );
          })}
        </div>
      </div>

      {/* Additional star-like particles */}
      <div className="absolute top-20 right-40 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.5)] animate-star" style={{ animationDelay: '1.2s' }}></div>
      <div className="absolute top-60 left-20 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.5)] animate-star" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-40 right-80 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.5)] animate-star" style={{ animationDelay: '0.8s' }}></div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 relative z-10 flex flex-col items-center">
        {/* Badge */}
        <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-2 mb-8 border border-white/20 text-white">
          <Sparkles className="h-4 w-4 text-white" />
          <span className="text-sm font-medium tracking-wide">#1 BEST AI-POWERED TASKFLOW</span>
        </div>

        {/* Headline & Subheadline */}
        <h1 className="text-5xl md:text-7xl font-bold text-center text-white leading-tight mb-6 max-w-5xl font-sora">
          Revolutionize Your Workflow
        </h1>
        <p className="text-lg md:text-xl text-center text-white/80 max-w-3xl mb-12 font-sora">
          Empowering you to work smarter, not harder, with cutting-edge AI solutions tailored for enhanced productivity.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <Link to="/configure" className="bg-[#6f42c1] hover:bg-[#7d4fd8] text-white px-8 py-3.5 rounded-full font-medium text-lg transition-all flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Get Started Now
          </Link>
          <Link to="/pricing" className="bg-white text-[#3b1694] hover:bg-gray-100 px-8 py-3.5 rounded-full font-medium text-lg transition-all">
            Explore Free
          </Link>
        </div>

        {/* Dashboard Image with Diagonal Light Beams */}
        <div className="w-full max-w-5xl mx-auto relative">
          {/* Left diagonal light beam */}
          <div className="absolute -top-4 -left-4 w-[400px] h-[600px] bg-white/10 blur-2xl rotate-[125deg] rounded-full transform -translate-x-1/4 -translate-y-1/2 opacity-70 z-10"></div>
          
          {/* Right diagonal light beam */}
          <div className="absolute -top-4 -right-4 w-[400px] h-[600px] bg-white/10 blur-2xl rotate-[235deg] rounded-full transform translate-x-1/4 -translate-y-1/2 opacity-70 z-10"></div>
          
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
              src="/lovable-uploads/dashboard-v3-dark-DkIL4YRw.webp" 
              alt="TaskFlow AI Dashboard"
              className="w-full h-auto object-cover object-top"
              draggable="false"
            />
          </div>

          {/* Lighting effects around the dashboard */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-[#6f42c1]/30 blur-3xl rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroGradient;
