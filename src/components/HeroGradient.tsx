
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const HeroGradient: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background with deep purple gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2d1b69] via-[#3b1694] to-[#190a4d] z-0">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMCAwaDJWNjBoLTJWMHptMjAgMGgyVjYwaC0yVjB6bTIwIDBoMlY2MGgtMlYwek0xMCAwaDJWNjBoLTJWMHptMjAgMGgyVjYwaC0yVjB6bTIwIDBoMlY2MGgtMlYwek01OSAwaDFWNjBoLTFWMHpNMCAwdjJoNjBWMEgwem0wIDIwdjJoNjB2LTJIMHptMCAyMHYyaDYwdi0ySDB6TTAgMTB2Mmg2MHYtMkgwem0wIDIwdjJoNjB2LTJIMHptMCAyMHYyaDYwdi0ySDB6IiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-30"></div>
      </div>

      {/* Star-like particles */}
      <div className="absolute top-20 right-40 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.5)] animate-star" style={{ animationDelay: '1.2s' }}></div>
      <div className="absolute top-60 left-20 w-1 h-1 rounded-full bg-white shadow-[0_0_8px_2px_rgba(255,255,255,0.5)] animate-star" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-40 right-80 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.5)] animate-star" style={{ animationDelay: '0.8s' }}></div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 relative z-10 flex flex-col items-center">
        {/* Badge */}
        <div className="bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-2 mb-8 border border-white/20 text-white shadow-lg animate-fade-in">
          <Sparkles className="h-4 w-4 text-white" />
          <span className="text-sm font-medium tracking-wide">#1 BEST AI-POWERED RDP SOLUTION</span>
        </div>

        {/* Headline & Subheadline */}
        <h1 className="text-5xl md:text-7xl font-bold text-center text-white leading-tight mb-6 max-w-5xl animate-fade-in">
          Revolutionize Your Workspace
        </h1>
        <p className="text-lg md:text-xl text-center text-white/80 max-w-3xl mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Empowering you to work smarter, not harder, with cutting-edge AI solutions tailored for enhanced productivity.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-16 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Link to="/configure" className="bg-[#6f42c1] hover:bg-[#7d4fd8] text-white px-8 py-3.5 rounded-full font-medium text-lg transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(111,66,193,0.5)] hover:shadow-[0_0_30px_rgba(111,66,193,0.7)]">
            Get Started Now
          </Link>
          <Link to="/pricing" className="bg-white text-[#3b1694] hover:bg-gray-100 px-8 py-3.5 rounded-full font-medium text-lg transition-all">
            Explore Free
          </Link>
        </div>

        {/* Dashboard Image */}
        <div className="w-full max-w-5xl mx-auto relative animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-[#5525a7]/40 via-transparent to-[#5525a7]/40 rounded-2xl"></div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6f42c1] to-[#5525a7] rounded-2xl blur-lg opacity-50"></div>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
            {/* Browser-like top bar */}
            <div className="flex items-center gap-1.5 bg-black p-3 px-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="flex-1"></div>
              <div className="flex gap-3 text-white/50 text-xs">
                <span>Dashboard</span>
                <span>Analytics</span>
                <span>Settings</span>
              </div>
              <div className="flex-1"></div>
            </div>
            <img 
              src="/lovable-uploads/dashboard-v3-dark-DkIL4YRw.webp" 
              alt="RDP Dashboard"
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
