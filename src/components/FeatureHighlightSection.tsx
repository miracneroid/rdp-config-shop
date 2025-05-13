
import React from "react";
import { Shield, Zap, HardDrive, HeadphonesIcon, Check } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureHighlightSectionProps {
  planName?: string;
}

const FeatureHighlightSection = ({ planName = "Basic" }: FeatureHighlightSectionProps) => {
  return (
    <section className="w-full bg-gradient-to-br from-gray-900 to-black text-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block rounded-lg bg-blue-600/20 px-4 py-2 mb-4 border border-blue-500/30">
            <h2 className="text-xl font-bold text-white">
              <span className="text-blue-400">Plan Selected: </span>
              <span className="text-white font-extrabold">{planName}</span>
            </h2>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            Your RDP Configuration Details
          </h3>
          
          <p className="text-gray-300 md:text-lg max-w-3xl mx-auto">
            {planName === "Basic" && "Reliable performance with our essential Windows RDP solution. Perfect for everyday computing needs."}
            {planName === "Standard" && "Enhanced performance with our balanced Windows RDP package. Perfect for daily operations with improved resources and priority support."}
            {planName === "Premium" && "Superior performance with our advanced Windows RDP configuration. Designed for demanding workloads with premium resources and enhanced security."}
            {planName === "Enterprise" && "Ultimate performance with our enterprise-grade Windows RDP infrastructure. Maximum resources for mission-critical applications with dedicated support."}
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left side content with feature highlights */}
          <div className="lg:w-1/2 bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-blue-900/30">
            <h4 className="text-2xl font-semibold text-blue-400 mb-6">Key Features</h4>
            
            <div className="space-y-5 mt-6">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                </div>
                <div>
                  <h5 className="font-medium text-white mb-1">Computing Power</h5>
                  <p className="text-gray-300 text-sm">
                    {planName === "Basic" && "Standard computing resources for everyday tasks"}
                    {planName === "Standard" && "Enhanced computing resources for improved multitasking"}
                    {planName === "Premium" && "Premium computing power for resource-intensive applications"}
                    {planName === "Enterprise" && "Maximum computing capacity for enterprise workloads"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                </div>
                <div>
                  <h5 className="font-medium text-white mb-1">Deployment</h5>
                  <p className="text-gray-300 text-sm">
                    {planName === "Basic" && "Standard deployment within minutes of payment"}
                    {planName === "Standard" && "Priority deployment after payment confirmation"}
                    {planName === "Premium" && "Expedited setup with priority provisioning"}
                    {planName === "Enterprise" && "Immediate deployment with highest priority"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                </div>
                <div>
                  <h5 className="font-medium text-white mb-1">Administrative Control</h5>
                  <p className="text-gray-300 text-sm">
                    {planName === "Basic" && "Full administrator access to your RDP environment"}
                    {planName === "Standard" && "Complete control with enhanced administrative tools"}
                    {planName === "Premium" && "Advanced administrative capabilities with custom configurations"}
                    {planName === "Enterprise" && "Enterprise-level control with custom security policies"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                </div>
                <div>
                  <h5 className="font-medium text-white mb-1">Privacy Protection</h5>
                  <p className="text-gray-300 text-sm">
                    {planName === "Basic" && "DMCA ignored hosting for complete privacy"}
                    {planName === "Standard" && "Privacy-focused infrastructure with DMCA protection"}
                    {planName === "Premium" && "Enhanced privacy measures with comprehensive DMCA protection"}
                    {planName === "Enterprise" && "Maximum privacy guarantees with robust legal protections"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side content - Performance cards */}
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 group">
              <div className="bg-blue-600/20 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-600/40 transition-all duration-300">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Performance</h3>
              <p className="text-gray-300">
                {planName === "Basic" && "2 CPU cores with standard performance"}
                {planName === "Standard" && "4 CPU cores with enhanced performance"}
                {planName === "Premium" && "8 CPU cores with high-performance compute"}
                {planName === "Enterprise" && "16 CPU cores with maximum performance"}
              </p>
            </div>
            
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 group">
              <div className="bg-blue-600/20 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-600/40 transition-all duration-300">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Memory</h3>
              <p className="text-gray-300">
                {planName === "Basic" && "4 GB RAM with guaranteed allocation"}
                {planName === "Standard" && "8 GB RAM with optimized memory management"}
                {planName === "Premium" && "16 GB RAM for memory-intensive applications"}
                {planName === "Enterprise" && "32 GB RAM for enterprise-grade operations"}
              </p>
            </div>
            
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 group">
              <div className="bg-blue-600/20 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-600/40 transition-all duration-300">
                <HardDrive className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Storage</h3>
              <p className="text-gray-300">
                {planName === "Basic" && "64 GB SSD with reliable performance"}
                {planName === "Standard" && "128 GB SSD with improved I/O speeds"}
                {planName === "Premium" && "256 GB SSD for ample storage capacity"}
                {planName === "Enterprise" && "512 GB SSD with enterprise-grade reliability"}
              </p>
            </div>
            
            <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-900/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 group">
              <div className="bg-blue-600/20 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4 group-hover:bg-blue-600/40 transition-all duration-300">
                <HeadphonesIcon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Support</h3>
              <p className="text-gray-300">
                {planName === "Basic" && "Standard support with 24-hour response time"}
                {planName === "Standard" && "Priority support with 12-hour response time"}
                {planName === "Premium" && "Premium support with 6-hour response time"}
                {planName === "Enterprise" && "24/7 dedicated support with 1-hour response time"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlightSection;
