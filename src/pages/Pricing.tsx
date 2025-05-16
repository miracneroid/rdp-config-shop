
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code, Shield, Phone } from "lucide-react";
import SimpleFooter from "@/components/SimpleFooter";

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  return (
    <div className="min-h-screen bg-[#0c0c20] bg-gradient-to-br from-[#0c0c20] via-[#111133] to-[#0c0c20] text-white relative overflow-hidden">
      {/* Starry background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute h-2 w-2 rounded-full bg-white/30 top-[10%] left-[20%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/30 top-[15%] left-[50%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/30 top-[20%] left-[80%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/30 top-[40%] left-[10%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/30 top-[50%] left-[30%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/30 top-[30%] left-[60%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/30 top-[60%] left-[70%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/30 top-[70%] left-[90%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/30 top-[80%] left-[40%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/30 top-[90%] left-[20%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/20 top-[25%] left-[15%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/20 top-[35%] left-[45%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/20 top-[85%] left-[85%]"></div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-24 pb-20 px-4 max-w-6xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-indigo-100/10 px-3 py-1 text-sm font-medium text-blue-300 mb-5">
            Pricing
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Security. Privacy. Freedom.<br />
            for Everyone.
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-14 text-lg">
            Select a VPN plan to access your favorite content with lightning speed 
            and unlimited data.
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-16">
            <div className="flex items-center">
              <div className="mr-2 p-1">
                <Code size={18} className="text-blue-400" />
              </div>
              <span className="text-gray-300">Open source</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 p-1">
                <Shield size={18} className="text-blue-400" />
              </div>
              <span className="text-gray-300">No-logs policy</span>
            </div>
            <div className="flex items-center">
              <div className="mr-2 p-1">
                <Phone size={18} className="text-blue-400" />
              </div>
              <span className="text-gray-300">24/7 Live support</span>
            </div>
          </div>
          
          {/* Curved line */}
          <div className="relative w-full max-w-2xl mx-auto h-16 mb-8">
            <svg className="absolute inset-0 w-full" viewBox="0 0 400 50" preserveAspectRatio="none">
              <path d="M0,50 C100,0 300,0 400,50" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
            </svg>
          </div>
          
          {/* Billing toggle */}
          <div className="flex items-center justify-center mb-16">
            <button 
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-l-full ${billingCycle === "monthly" 
                ? "bg-blue-500 bg-opacity-20 text-white" 
                : "bg-[#1e1e3a] text-gray-400"}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle("annually")}
              className={`px-6 py-2 rounded-r-full ${billingCycle === "annually" 
                ? "bg-blue-500 bg-opacity-20 text-white" 
                : "bg-[#1e1e3a] text-gray-400"}`}
            >
              Annually
            </button>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Personal Plan */}
            <div className="bg-[#171728] rounded-3xl p-8 flex flex-col">
              <div className="bg-[#222233] rounded-full p-4 w-12 h-12 flex items-center justify-center mb-6">
                <div className="bg-white rounded-full w-4 h-4"></div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Personal</h3>
              <p className="text-gray-400 text-sm mb-4">
                For individuals who want to securely connect personal devices, for free.
              </p>
              <div className="mt-6 mb-6">
                <span className="text-5xl font-bold">Free</span>
              </div>
              
              <div className="flex items-center mt-auto mb-4">
                <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                </svg>
                <span className="text-gray-300 text-sm">1 device</span>
              </div>
            </div>
            
            {/* Starter Plan */}
            <div className="bg-[#171728] rounded-3xl p-8 flex flex-col relative">
              {/* Best Deal Label */}
              <div className="absolute -top-5 left-0 right-0 flex justify-center">
                <div className="bg-[#696cff] bg-opacity-30 text-blue-300 px-4 py-1.5 rounded-full flex items-center text-sm font-medium">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mr-1.5" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" />
                  </svg>
                  Best Deal
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-[#696cff] bg-opacity-20 rounded-xl p-4 w-12 h-12 flex items-center justify-center mb-6">
                  <div className="bg-[#696cff] rounded-md w-5 h-5"></div>
                </div>
                <div className="absolute top-0 right-0">
                  <div className="bg-blue-500 text-xs rounded-full px-2 py-0.5 font-medium">
                    Save 65%
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Starter</h3>
              <p className="text-gray-400 text-sm mb-4">
                For teams or organizations looking for an easy-to-use, secure, legacy VPN replacement.
              </p>
              <div className="mt-6 mb-2">
                <span className="text-5xl font-bold">$2.99</span>
                <span className="text-gray-400 ml-1">/ month</span>
              </div>
              <div className="text-[#696cff] mb-6 font-semibold">+3 EXTRA months</div>
              
              <div className="flex items-center mt-auto mb-4">
                <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                </svg>
                <span className="text-gray-300 text-sm">Covers 5 devices</span>
              </div>
            </div>
            
            {/* Premium Plan */}
            <div className="bg-[#171728] rounded-3xl p-8 flex flex-col">
              <div className="relative">
                <div className="bg-[#222233] rounded-full p-4 w-12 h-12 flex items-center justify-center mb-6">
                  <div className="bg-white rounded-md transform rotate-45 w-4 h-4"></div>
                </div>
                <div className="absolute top-0 right-0">
                  <div className="bg-blue-500 text-xs rounded-full px-2 py-0.5 font-medium">
                    Save 75%
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <p className="text-gray-400 text-sm mb-4">
                For companies who need service and resource level authentication and access control.
              </p>
              <div className="mt-6 mb-2">
                <span className="text-5xl font-bold">$6.99</span>
                <span className="text-gray-400 ml-1">/ month</span>
              </div>
              <div className="text-[#696cff] mb-6 font-semibold">+3 EXTRA months</div>
              
              <div className="flex items-center mt-auto mb-4">
                <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                </svg>
                <span className="text-gray-300 text-sm">Covers 10 devices</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Simple footer */}
      <SimpleFooter />
    </div>
  );
};

export default PricingPage;
