
import React from 'react';
import { Zap, ShieldCheck, Server, Globe, Settings, Cpu, HardDrive, LayoutList } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FeatureHighlightGridProps {
  planName?: string;
}

const FeatureHighlightGrid: React.FC<FeatureHighlightGridProps> = ({ planName = "Standard" }) => {
  return (
    <div className="w-full bg-gradient-to-b from-gray-950 to-gray-900 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left Column: Main heading, subheading, and ticked features */}
          <div className="animate-slide-up">
            <div className="mb-8 text-left">
              {/* Main heading with improved styling */}
              <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-lg shadow-lg mb-4">
                <span className="text-3xl font-semibold">Can't Find Your Perfect Plan?</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-300 mt-4">
                Tailor Your RDP Experience
              </h2>
              
              <p className="text-xl text-blue-100/80 mt-4 max-w-xl leading-relaxed">
                Design your ideal Windows RDP server from scratch. Choose every detail, from CPU cores to software packages, and get a machine built exactly for your unique requirements.
              </p>
            </div>
            
            {/* Left side list with improved styling */}
            <div className="space-y-6">
              <div className="flex items-start group">
                <div className="flex-shrink-0 mt-1 bg-blue-800/40 rounded-full p-1 group-hover:bg-blue-700/60 transition-colors duration-200">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-blue-100 group-hover:text-white transition-colors duration-200">
                  Choose your exact CPU, RAM, and Storage configurations
                </p>
              </div>
              
              <div className="flex items-start group">
                <div className="flex-shrink-0 mt-1 bg-blue-800/40 rounded-full p-1 group-hover:bg-blue-700/60 transition-colors duration-200">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-blue-100 group-hover:text-white transition-colors duration-200">
                  Select your preferred Operating System version
                </p>
              </div>
              
              <div className="flex items-start group">
                <div className="flex-shrink-0 mt-1 bg-blue-800/40 rounded-full p-1 group-hover:bg-blue-700/60 transition-colors duration-200">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-blue-100 group-hover:text-white transition-colors duration-200">
                  Add specialized software and applications pre-installed
                </p>
              </div>
              
              <div className="flex items-start group">
                <div className="flex-shrink-0 mt-1 bg-blue-800/40 rounded-full p-1 group-hover:bg-blue-700/60 transition-colors duration-200">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-blue-100 group-hover:text-white transition-colors duration-200">
                  Optimize for your specific workload and performance needs
                </p>
              </div>

              {/* Mobile Accordion for the features (visible only on small screens) */}
              <div className="block md:hidden mt-6">
                <Accordion type="single" collapsible className="text-white">
                  <AccordionItem value="customization" className="border-blue-800/30">
                    <AccordionTrigger className="text-blue-100 hover:text-white">
                      Why customize your RDP?
                    </AccordionTrigger>
                    <AccordionContent className="text-blue-200">
                      A customized RDP server ensures you only pay for what you need while getting optimal performance for your specific use case.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Call to action button with improved styling */}
              <div className="mt-10">
                <Link to="/config-builder">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-auto">
                    Build Your Custom RDP
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right Column: Grid of 4 Feature Cards with improved styling */}
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            <div className="p-6 text-left rounded-lg bg-gray-800/40 backdrop-blur-sm border border-blue-900/30 hover:border-blue-500/50 transform hover:translate-y-[-5px] transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20">
              <div className="mb-5 bg-blue-900/30 rounded-full p-3 w-14 h-14 flex items-center justify-center">
                <Settings size={28} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Precision Control</h3>
              <p className="text-blue-100/80">
                Fine-tune every hardware spec to your exact requirements without compromise.
              </p>
            </div>
            
            <div className="p-6 text-left rounded-lg bg-gray-800/40 backdrop-blur-sm border border-blue-900/30 hover:border-blue-500/50 transform hover:translate-y-[-5px] transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20">
              <div className="mb-5 bg-blue-900/30 rounded-full p-3 w-14 h-14 flex items-center justify-center">
                <LayoutList size={28} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Software Freedom</h3>
              <p className="text-blue-100/80">
                Install any application you need without limitations or restrictions.
              </p>
            </div>
            
            <div className="p-6 text-left rounded-lg bg-gray-800/40 backdrop-blur-sm border border-blue-900/30 hover:border-blue-500/50 transform hover:translate-y-[-5px] transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20">
              <div className="mb-5 bg-blue-900/30 rounded-full p-3 w-14 h-14 flex items-center justify-center">
                <Globe size={28} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Global Reach</h3>
              <p className="text-blue-100/80">
                Pick the perfect server location for optimal latency and performance.
              </p>
            </div>
            
            <div className="p-6 text-left rounded-lg bg-gray-800/40 backdrop-blur-sm border border-blue-900/30 hover:border-blue-500/50 transform hover:translate-y-[-5px] transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20">
              <div className="mb-5 bg-blue-900/30 rounded-full p-3 w-14 h-14 flex items-center justify-center">
                <Zap size={28} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Scalable Power</h3>
              <p className="text-blue-100/80">
                Adjust resources as your needs evolve, effortlessly and instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlightGrid;
