import React from 'react';
import { Zap, ShieldCheck, Server, Globe, Settings, Cpu, HardDrive, LayoutList } from 'lucide-react'; // Added Settings, Cpu, HardDrive, LayoutList
import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Link } from 'react-router-dom'; // For navigation

interface FeatureHighlightGridProps {
  planName?: string; // Keep this if needed elsewhere, but not directly used for this section's text
}

const FeatureHighlightGrid: React.FC<FeatureHighlightGridProps> = ({ planName = "Standard" }) => {
  return (
    <div className="w-full bg-gray-950 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Overall grid container for left and right sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Main heading, subheading, and ticked features */}
          <div>
            <div className="mb-8 text-left">
              {/* Main heading for customization */}
              <div className="flex items-baseline mb-4">
                <div className="inline-block bg-blue-700 text-white px-4 py-1 rounded-md mr-3">
                  <span className="text-3xl font-semibold">Can't Find Your Perfect Plan?</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Tailor Your RDP.</h2>
              </div>
              
              <p className="text-xl text-gray-300">
                Design your ideal Windows RDP server from scratch. Choose every detail, from CPU to software, and get a machine built just for you.
              </p>
            </div>
            
            {/* Left side list (benefits of customization) */}
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-300">
                  Choose your exact CPU, RAM, and Storage
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-300">
                  Select your preferred Operating System
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-300">
                  Add specialized software and applications
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-lg text-gray-300">
                  Optimize for your specific workload
                </p>
              </div>

              {/* Call to action button */}
              <div className="mt-10">
                <Link to="/config-builder"> {/* Link to your ConfigBuilder page */}
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-full shadow-lg">
                    Customize Your RDP
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right Column: Grid of 4 Feature Cards (Customization Aspects) */}
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="p-6 text-left rounded-lg bg-gray-900 border border-gray-800"> {/* Added bg and border */}
              <div className="mb-4 ml-2">
                <Settings size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Precision Control</h3>
              <p className="text-gray-400">
                Fine-tune every hardware spec to your exact requirements.
              </p>
            </div>
            
            <div className="p-6 text-left rounded-lg bg-gray-900 border border-gray-800"> {/* Added bg and border */}
              <div className="mb-4 ml-2">
                <LayoutList size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Software Freedom</h3>
              <p className="text-gray-400">
                Install any application you need without limitations.
              </p>
            </div>
            
            <div className="p-6 text-left rounded-lg bg-gray-900 border border-gray-800"> {/* Added bg and border */}
              <div className="mb-4 ml-2">
                <Globe size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Global Reach</h3>
              <p className="text-gray-400">
                Pick the perfect server location for optimal latency.
              </p>
            </div>
            
            <div className="p-6 text-left rounded-lg bg-gray-900 border border-gray-800"> {/* Added bg and border */}
              <div className="mb-4 ml-2">
                <Zap size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Scalable Power</h3>
              <p className="text-gray-400">
                Adjust resources as your needs evolve, effortlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlightGrid;
