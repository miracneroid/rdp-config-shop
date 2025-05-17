import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Monitor, FileCode } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import Star from "@/components/ui/star";
import ShootingStar from "@/components/ui/shootingstart";
import { InfinityBrandStrip } from "@/components/ui/infinityBrandStrip";
import { Code, Shield, Phone } from "lucide-react";
import SimpleFooter from "@/components/SimpleFooter";

const windowsPlans = [
  {
    name: "Personal",
    price: 29,
    cpu: "2 Cores",
    ram: "4 GB",
    storage: "64 GB SSD",
    features: [
      "Windows OS",
      "Basic Software Suite",
      "24/7 Access",
      "Standard Support"
    ]
  },
  {
    name: "Starter",
    price: 59,
    cpu: "4 Cores",
    ram: "8 GB",
    storage: "128 GB SSD",
    features: [
      "Windows OS",
      "Standard Software Suite",
      "24/7 Access",
      "Priority Support",
      "Daily Backups"
    ],
    popular: true
  },
  {
    name: "Premium",
    price: 99,
    cpu: "8 Cores",
    ram: "16 GB",
    storage: "256 GB SSD",
    features: [
      "Windows OS",
      "Professional Software Suite",
      "24/7 Access",
      "Priority Support",
      "Daily Backups",
      "Enhanced Security"
    ]
  }
];

const linuxPlans = [
  {
    name: "Personal",
    price: 19,
    cpu: "4 Cores",
    ram: "4 GB",
    storage: "64 GB SSD",
    features: [
      "Linux OS",
      "Basic Software Suite",
      "SSH Access",
      "24/7 Access",
      "Standard Support"
    ]
  },
  {
    name: "Starter",
    price: 39,
    cpu: "8 Cores",
    ram: "8 GB",
    storage: "128 GB SSD",
    features: [
      "Linux OS",
      "Standard Software Suite",
      "SSH Access",
      "24/7 Access",
      "Priority Support",
      "Daily Backups"
    ],
    popular: true
  },
  {
    name: "Premium",
    price: 79,
    cpu: "16 Cores",
    ram: "16 GB",
    storage: "256 GB SSD",
    features: [
      "Linux OS",
      "Professional Software Suite",
      "SSH Access",
      "24/7 Access",
      "Priority Support",
      "Daily Backups",
      "Enhanced Security"
    ]
  }
];

const PricingPage = () => {
  const [tab, setTab] = useState<"windows" | "linux">("windows");
  const [selectedPlan, setSelectedPlan] = useState("Standard"); // Default to Standard as it's popular
  
  // Handler to update selected plan
  const handlePlanSelect = (planName: string) => {
    console.log("Selected plan in PricingPage:", planName);
    setSelectedPlan(planName);
  };
  
  return (
    
    <div className="min-h-screen text-white relative overflow-hidden">
     <Navbar />
        {/* Background Gradients (Dark Mode Only) */}
        <div className="absolute left-0 top-16 z-0 pointer-events-none hidden dark:block">
          <div className="w-[320px] h-[320px] rounded-full bg-gradient-to-br from-purple-700/40 to-blue-600/30 blur-3xl" />
        </div>
        <div className="absolute right-0 bottom-0 z-0 pointer-events-none hidden dark:block">
          <div className="w-[250px] h-[250px] rounded-full bg-gradient-to-tl from-purple-600/30 to-blue-700/20 blur-3xl" />
        </div>
        
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
        
        <div className="text-center" >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight mt-10">
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
          <ShootingStar />
          <Star />
          
          {/* Pricing Cards - Centered with max-width */}
          <div className="flex justify-center">
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
                </div>
              </div>
              
              {/* Starter Plan - Now centered and semitransparent */}
              <div className="bg-[#171728]/90 rounded-3xl p-8 flex flex-col relative transform md:scale-110 z-10">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/* Plan Tabs */}
    <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
        <div className="flex justify-center">
          <Tabs value={tab} onValueChange={(v) => setTab(v as "windows" | "linux")}>
            <TabsList className="bg-gray-100 dark:bg-[#181927] p-1 rounded-lg w-fit gap-2">
              <TabsTrigger
                value="windows"
                className="flex items-center gap-3 sm:gap-5 data-[state=active]:bg-blue-600 data-[state=active]:text-white px-4 sm:px-5 py-2 rounded-lg text-sm sm:text-base"
              >
                <Monitor className="w-5 h-5 sm:w-7 sm:h-7" />
                Windows
              </TabsTrigger>
              <TabsTrigger
                value="linux"
                className="flex items-center gap-3 sm:gap-5 data-[state=active]:bg-green-700 data-[state=active]:text-white px-4 sm:px-5 py-2 rounded-lg text-sm sm:text-base"
              >
                <FileCode className="w-6 h-5 sm:w-7 sm:h-7" />
                Linux
              </TabsTrigger>
            </TabsList>

            <TabsContent value="windows" className="mt-10">
              <PricingSection plans={windowsPlans} showDetailedComparison={false} />
            </TabsContent>
            <TabsContent value="linux" className="mt-10">
              <PricingSection plans={linuxPlans} showDetailedComparison={false} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="w-full z-8 mt-6 h-[40px]">
        <InfinityBrandStrip />
      </div>      
      
      {/* Simple footer */}
      <SimpleFooter />

    </div>
  );
};

export default PricingPage;
