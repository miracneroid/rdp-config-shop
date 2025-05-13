
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
    <section className="w-full bg-black text-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Left side content */}
          <div className="lg:w-1/2">
            <div className="inline-block rounded-lg bg-blue-600 px-4 py-2 mb-4">
              <h2 className="text-xl font-bold text-white">Plan Details - <span className="text-white font-extrabold">{planName} Plan</span></h2>
            </div>
            
            <p className="max-w-3xl text-xl mb-6">
              {planName === "Basic" && "Efficient performance with our essential Windows RDP solution. Get started quickly with reliable access and all the core functionality you need."}
              {planName === "Standard" && "Enhanced performance with our balanced Windows RDP package. Perfect for daily operations with improved resources and priority support."}
              {planName === "Premium" && "Superior performance with our advanced Windows RDP configuration. Designed for demanding workloads with premium resources and enhanced security."}
              {planName === "Enterprise" && "Ultimate performance with our enterprise-grade Windows RDP infrastructure. Maximum resources for mission-critical applications with dedicated support."}
            </p>
            
            <div className="space-y-3 mt-6">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-300">
                  {planName === "Basic" && "Standard computing resources for everyday tasks"}
                  {planName === "Standard" && "Enhanced computing resources for improved multitasking"}
                  {planName === "Premium" && "Premium computing power for resource-intensive applications"}
                  {planName === "Enterprise" && "Maximum computing capacity for enterprise workloads"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-300">
                  {planName === "Basic" && "Standard deployment within minutes of payment"}
                  {planName === "Standard" && "Priority deployment after payment confirmation"}
                  {planName === "Premium" && "Expedited setup with priority provisioning"}
                  {planName === "Enterprise" && "Immediate deployment with highest priority"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-300">
                  {planName === "Basic" && "Full administrator access to your RDP environment"}
                  {planName === "Standard" && "Complete control with enhanced administrative tools"}
                  {planName === "Premium" && "Advanced administrative capabilities with custom configurations"}
                  {planName === "Enterprise" && "Enterprise-level control with custom security policies"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-300">
                  {planName === "Basic" && "DMCA ignored hosting for complete privacy"}
                  {planName === "Standard" && "Privacy-focused infrastructure with DMCA protection"}
                  {planName === "Premium" && "Enhanced privacy measures with comprehensive DMCA protection"}
                  {planName === "Enterprise" && "Maximum privacy guarantees with robust legal protections"}
                </span>
              </div>
            </div>
          </div>
          
          {/* Right side content - Performance cards */}
          <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 lg:mt-0">
            <div className="space-y-3">
              <div className="bg-blue-900/30 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold">Performance</h3>
              <p className="text-gray-400">
                {planName === "Basic" && "2 CPU cores with standard performance"}
                {planName === "Standard" && "4 CPU cores with enhanced performance"}
                {planName === "Premium" && "8 CPU cores with high-performance compute"}
                {planName === "Enterprise" && "16 CPU cores with maximum performance"}
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-blue-900/30 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold">Memory</h3>
              <p className="text-gray-400">
                {planName === "Basic" && "4 GB RAM with guaranteed allocation"}
                {planName === "Standard" && "8 GB RAM with optimized memory management"}
                {planName === "Premium" && "16 GB RAM for memory-intensive applications"}
                {planName === "Enterprise" && "32 GB RAM for enterprise-grade operations"}
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-blue-900/30 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                <HardDrive className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold">Storage</h3>
              <p className="text-gray-400">
                {planName === "Basic" && "64 GB SSD with reliable performance"}
                {planName === "Standard" && "128 GB SSD with improved I/O speeds"}
                {planName === "Premium" && "256 GB SSD for ample storage capacity"}
                {planName === "Enterprise" && "512 GB SSD with enterprise-grade reliability"}
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-blue-900/30 rounded-full p-3 w-12 h-12 flex items-center justify-center">
                <HeadphonesIcon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold">Support</h3>
              <p className="text-gray-400">
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
