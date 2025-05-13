
import React from "react";
import { Shield, Zap, MonitorCheck, Globe } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

const FeatureHighlightSection = () => {
  return (
    <section className="w-full bg-black text-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="inline-block rounded-lg bg-blue-600 px-4 py-2 mb-4">
            <h2 className="text-xl font-bold text-white">Privacy-focused Windows RDPs</h2>
          </div>
          
          <p className="max-w-3xl text-xl mb-6">
            Experience premium performance with our customizable Windows RDPs.
            Deployed instantly with full admin/root access and unmetered bandwidth.
          </p>
          
          <div className="space-y-3 mt-6">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Dedicated resources with guaranteed performance</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Instant deployment after payment</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Full administrative control</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">DMCA ignored hosting</span>
            </div>
          </div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-12">
          <div className="space-y-3">
            <div className="bg-blue-900/30 rounded-full p-3 w-12 h-12 flex items-center justify-center">
              <Zap className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold">Instant Deployment</h3>
            <p className="text-gray-400">Servers ready within minutes after payment confirmation.</p>
          </div>
          
          <div className="space-y-3">
            <div className="bg-blue-900/30 rounded-full p-3 w-12 h-12 flex items-center justify-center">
              <Shield className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold">100% Private</h3>
            <p className="text-gray-400">Dedicated resources with guaranteed CPU and RAM.</p>
          </div>
          
          <div className="space-y-3">
            <div className="bg-blue-900/30 rounded-full p-3 w-12 h-12 flex items-center justify-center">
              <MonitorCheck className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold">Full Admin Access</h3>
            <p className="text-gray-400">Complete control with administrator privileges.</p>
          </div>
          
          <div className="space-y-3">
            <div className="bg-blue-900/30 rounded-full p-3 w-12 h-12 flex items-center justify-center">
              <Globe className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold">Global Network</h3>
            <p className="text-gray-400">Multiple data center locations for optimal latency.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlightSection;
