
import React from 'react';
import { Zap, Shield, MonitorCheck, Globe } from 'lucide-react';

interface FeatureHighlightGridProps {
  planName?: string;
}

const FeatureHighlightGrid: React.FC<FeatureHighlightGridProps> = ({ planName = "Standard" }) => {
  return (
    <div className="w-full bg-gray-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-block bg-blue-700 text-white px-4 py-1 rounded-md mb-3">
            <span className="text-lg font-semibold">Privacy-focused Windows RDPs</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Experience premium performance with our {planName} Windows RDPs.
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Deployed instantly with full admin/root access and unmetered bandwidth.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side list */}
          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="ml-3 text-lg text-gray-300">
                Dedicated resources with guaranteed performance
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="ml-3 text-lg text-gray-300">
                Instant deployment after payment
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="ml-3 text-lg text-gray-300">
                Full administrative control
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="ml-3 text-lg text-gray-300">
                DMCA ignored hosting
              </p>
            </div>
          </div>
          
          {/* Right side grid */}
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="mb-4">
                <Zap size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Instant Deployment</h3>
              <p className="text-gray-400">
                Servers ready within minutes after payment confirmation.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="mb-4">
                <Shield size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">100% Private</h3>
              <p className="text-gray-400">
                Dedicated resources with guaranteed CPU and RAM.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="mb-4">
                <MonitorCheck size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Full Admin Access</h3>
              <p className="text-gray-400">
                Complete control with administrator privileges.
              </p>
            </div>
            
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <div className="mb-4">
                <Globe size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Global Network</h3>
              <p className="text-gray-400">
                Multiple data center locations for optimal latency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlightGrid;
