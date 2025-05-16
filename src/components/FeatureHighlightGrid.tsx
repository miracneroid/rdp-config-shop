
import React from 'react';
import { Zap, Shield, MonitorCheck, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface FeatureHighlightGridProps {
  planName?: string;
}

const FeatureHighlightGrid: React.FC<FeatureHighlightGridProps> = ({ planName = "Standard" }) => {
  return (
    <div className="w-full bg-gray-950 py-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Add-Ons
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Enhance your RDP experience with powerful add-ons designed for specific use cases
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 relative overflow-hidden">
            <div className="mb-4 flex items-center justify-between">
              <div className="bg-gray-800 p-3 rounded-lg">
                <Zap size={24} className="text-indigo-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Microsoft Office</h3>
            <div className="mb-6">
              <span className="text-3xl font-bold">$2.50</span>
              <span className="text-gray-400">/month</span>
            </div>
            <p className="text-gray-400 mb-6">
              Complete Microsoft Office suite pre-installed with your RDP
            </p>
            <Button className="bg-transparent hover:bg-gray-800 border border-gray-700">
              Add to Plan
            </Button>
          </div>
          
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 relative overflow-hidden">
            <div className="mb-4 flex items-center justify-between">
              <div className="bg-gray-800 p-3 rounded-lg">
                <Shield size={24} className="text-indigo-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Premium Security</h3>
            <div className="mb-6">
              <span className="text-3xl font-bold">$3.99</span>
              <span className="text-gray-400">/month</span>
            </div>
            <p className="text-gray-400 mb-6">
              Enhanced security features and advanced malware protection
            </p>
            <Button className="bg-transparent hover:bg-gray-800 border border-gray-700">
              Add to Plan
            </Button>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 relative overflow-hidden">
            <div className="flex flex-col items-start justify-between h-full">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Try Pivien for Free</h3>
                <p className="text-gray-400 mb-8">
                  Experience our service with no commitment. Get started with a free trial today.
                </p>
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Start Free Trial
              </Button>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 relative overflow-hidden flex items-center justify-center">
            <div className="relative w-full h-full min-h-[180px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-gray-800 rounded-xl p-4 w-48">
                  <div className="text-center">
                    <div className="font-mono text-2xl mb-1">01:20:15</div>
                    <div className="text-sm text-gray-400">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlightGrid;
