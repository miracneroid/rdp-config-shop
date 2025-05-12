
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
    <section className="w-full bg-white dark:bg-gray-950 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="inline-block rounded-lg bg-blue-600 px-4 py-2 mb-4">
            <h2 className="text-xl font-bold text-white">Enterprise-grade RDP Solutions</h2>
          </div>
          <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl mb-6">
            Premium performance with uncompromising reliability
          </h3>
          <p className="max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Experience enterprise-level Windows and Linux environments with guaranteed resources, 
            deployed instantly with complete administrative control and unlimited bandwidth.
          </p>
        </div>
        
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <Feature
            icon={<Zap size={24} />}
            title="Rapid Deployment"
            description="Servers provisioned within minutes after payment confirmation for immediate access to your environment."
          />
          <Feature
            icon={<Shield size={24} />}
            title="Complete Privacy"
            description="Dedicated resources with guaranteed CPU and RAM allocation for consistent performance."
          />
          <Feature
            icon={<MonitorCheck size={24} />}
            title="Full Administrative Access"
            description="Total control with administrator/root privileges for complete customization of your server."
          />
          <Feature
            icon={<Globe size={24} />}
            title="Global Infrastructure"
            description="Strategic data center locations worldwide ensuring optimal latency and connectivity."
          />
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center space-x-2">
            <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700 dark:text-gray-300">Guaranteed resource allocation with no overselling</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700 dark:text-gray-300">Unmetered bandwidth with no transfer limits</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700 dark:text-gray-300">Premium network connectivity with 99.9% uptime guarantee</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-700 dark:text-gray-300">Advanced security with DDoS protection included</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlightSection;
