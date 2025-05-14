
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import InteractivePuzzle from './3d/InteractivePuzzle';

const HeroWithPuzzle: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 pb-12 overflow-hidden bg-gradient-to-b from-[#0a0a29] via-[#121242] to-[#1a1a3a]">
      {/* Gradient blobs */}
      <div className="absolute left-1/4 top-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute right-1/4 bottom-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left column: Content */}
          <div className="text-left">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
              YOUR NEXT <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">GREAT</span>
              <br />WORKSPACE
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Professional remote desktop environment tailored to your exact needs. Deploy secure, high-performance RDP servers with just a few clicks.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link to="/configure" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold flex items-center transition-all duration-300 transform hover:scale-105">
                Get Started
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link to="/pricing" 
                className="bg-transparent hover:bg-white/10 border border-white/30 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all duration-300">
                View Pricing
              </Link>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center text-sm text-gray-300">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>5-min Setup</span>
              </div>
            </div>
          </div>
          
          {/* Right column: 3D Puzzle */}
          <div className="order-first lg:order-last mb-8 lg:mb-0">
            <InteractivePuzzle />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70 animate-bounce">
        <span className="mb-2 text-sm">Scroll to discover</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroWithPuzzle;
