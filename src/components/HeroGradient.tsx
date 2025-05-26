
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Shield, Zap, Globe } from 'lucide-react';

const HeroGradient: React.FC = () => {
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

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      text: "Deploy in 5 minutes"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      text: "99.9% uptime guarantee"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      text: "Global data centers"
    }
  ];

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
            <span className="text-sm font-medium tracking-wide">#1 PREMIUM RDP HOSTING</span>
          </div>

          {/* Headline & Subheadline */}
          <h1 className="text-6xl text-center text-white leading-tight mb-6 max-w-5xl font-sora z-10">
            Professional{" "}
            <span className="inline-block bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text animate-[pulse_2.5s_ease-in-out_infinite]">
              Remote Desktop
            </span>
            <br />
            Solutions
          </h1>
          <p className="text-xl text-center text-white/90 max-w-4xl -mt-5 mb-6 font-sora z-10">
            Deploy secure, high-performance RDP servers in minutes. Choose from Windows or Linux environments with enterprise-grade security and 24/7 support.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap gap-6 justify-center mb-8 z-10">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-white/80 text-sm">
                <div className="text-green-400">
                  {feature.icon}
                </div>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-16 z-10">
            <Link to="/pricing" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full transition-all flex items-center gap-2 text-lg font-semibold transform hover:scale-105">
              <Sparkles className="h-5 w-5" />
              Get Started Now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/pricing" className="text-gray-300 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-full transition-all text-lg font-semibold">
              View Pricing
            </Link>
          </div>

          <div className="w-full max-w-[65rem] mx-auto relative">
            {/* Left diagonal light beam Layer-1 (Superset)*/}
            <div className="absolute -top-4 -left-4 w-[850px] h-[600px] bg-[#5902ed] blur-2xl rotate-[125deg] rounded-full transform -translate-x-1/4 -translate-y-1/2 opacity-70 z-1"></div>
            {/* Left diagonal light beam Layer-2 (Superset)*/}
            <div className="absolute -top-4 -left-4 w-[750px] h-[500px] bg-[#502894] blur-2xl rotate-[125deg] rounded-full transform -translate-x-1/4 -translate-y-1/2 opacity-70 z-2"></div>
            {/* Left diagonal light beam Layer-3 (Superset)*/}
            <div className="absolute -top-4 -left-4 w-[650px] h-[450px] bg-[#3c2478] blur-2xl rotate-[125deg] rounded-full transform -translate-x-1/4 -translate-y-1/2 opacity-70 z-3"></div>
            {/* Left diagonal light beam Layer-4 (Subset of 1, Superset of 3)*/}
            <div className="absolute -top-4 -left-4 w-[375px] h-[350px] bg-[#643fb9] blur-2xl rotate-[125deg] rounded-full transform -translate-x-1/4 -translate-y-1/2 opacity-70 z-4"></div>
            {/* Left diagonal light beam Layer-5 (Smallest Subset)*/}
            <div className="absolute -top-8 -left-4 w-[315px] h-[400px] bg-[#b29cd8] blur-2xl rotate-[125deg] rounded-full transform -translate-x-1/4 -translate-y-1/2 opacity-70 z-5"></div>

            {/* Right diagonal light beam Layer-1 (Superset)*/}
            <div className="absolute -top-4 -right-4 w-[850px] h-[600px] bg-[#5902ed] blur-2xl rotate-[235deg] rounded-full transform translate-x-1/4 -translate-y-1/2 opacity-70 z-1"></div>
            {/* Right diagonal light beam Layer-2 (Superset)*/}
            <div className="absolute -top-4 -right-4 w-[750px] h-[500px] bg-[#502894] blur-2xl rotate-[235deg] rounded-full transform translate-x-1/4 -translate-y-1/2 opacity-70 z-2"></div>
            {/* Right diagonal light beam Layer-3 (Superset)*/}
            <div className="absolute -top-4 -right-4 w-[650px] h-[450px] bg-[#3c2478] blur-2xl rotate-[235deg] rounded-full transform translate-x-1/4 -translate-y-1/2 opacity-70 z-3"></div>
            {/* Right diagonal light beam Layer-4 (Subset of 1, Superset of 3)*/}
            <div className="absolute -top-4 -right-4 w-[375px] h-[350px] bg-[#643fb9] blur-2xl rotate-[235deg] rounded-full transform translate-x-1/4 -translate-y-1/2 opacity-70 z-4"></div>
            {/* Right diagonal light beam Layer-5 (Smallest Subset)*/}
            <div className="absolute -top-8 -right-4 w-[315px] h-[400px] bg-[#b29cd8] blur-2xl rotate-[235deg] rounded-full transform translate_x-1/4 -translate-y-1/2 opacity-70 z-5"></div>

            {/* Dashboard Image */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl z-20">
              <div className="flex items-center gap-1.5 bg-black p-3 px-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="flex-1"></div>
                <div className="flex gap-3 text-white/50 text-xs">
                  <span>Puzzle RDP</span>
                  <span>Control Panel</span>
                  <span>Management</span>
                </div>
                <div className="flex-1"></div>
              </div>
              <img
                src="/lovable-uploads/dashboard-v3-dark-DkIL4YRw.webp"
                alt="Puzzle RDP Dashboard"
                className="w-full h-auto object-cover object-top"
                draggable="false"
              />
            </div>

            {/* This bottom lighting effect remains */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-40 bg-[#6f42c1]/30 blur-3xl rounded-full"></div>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 text-center z-10">
            <p className="text-white/60 text-sm mb-4">Trusted by thousands of professionals worldwide</p>
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
              <div className="text-white/50 text-sm font-medium">Enterprise Grade Security</div>
              <div className="w-1 h-1 bg-white/30 rounded-full"></div>
              <div className="text-white/50 text-sm font-medium">ISO 27001 Certified</div>
              <div className="w-1 h-1 bg-white/30 rounded-full"></div>
              <div className="text-white/50 text-sm font-medium">24/7 Expert Support</div>
            </div>
          </div>
        </div>
      </div>      
    </section>
  );
};

export default HeroGradient;
