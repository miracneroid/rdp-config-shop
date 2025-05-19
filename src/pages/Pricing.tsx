import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Star from "@/components/ui/star";
import ShootingStar from "@/components/ui/shootingstart";
import PricingSection from "@/components/PricingSection";
import PartnersMarquee from "@/components/ui/partnersMarquee";
import SimpleFooter from "@/components/SimpleFooter";
import StatsBanner from "@/components/StatsBanner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Monitor, FileCode, Code, Shield, Phone } from "lucide-react";

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
},
  {
    name: "Enterprise",
    price: 199,
    cpu: "16 Cores",
    ram: "32 GB",
    storage: "512 GB SSD",
    features: [
      "Windows OS",
      "Enterprise Software Suite",
      "24/7 Access",
      "Priority Support",
      "Hourly Backups",
      "Advanced Security",
      "Dedicated Resources"
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
},
  {
    name: "Enterprise",
    price: 199,
    cpu: "16 Cores",
    ram: "32 GB",
    storage: "512 GB SSD",
    features: [
      "Linux OS",
      "Enterprise Software Suite",
      "SSH Access",
      "24/7 Access",
      "Priority Support",
      "Hourly Backups",
      "Advanced Security",
      "Dedicated Resources"
    ]
  }
];

const partners = [
  "VISA", "CRPTOMUS", "REVOLUT", "STRIPE", "RAZORPAY", "PAYPAL","MASTERCARD",
];

const PricingPage = () => {
  const [tab, setTab] = useState<"windows" | "linux">("windows");

  return (
    
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Star background with small dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i}
            className={`absolute h-1 w-1 rounded-full bg-white/30`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1
            }}
          ></div>
        ))}
      </div>

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
        <div className="absolute h-2 w-2 rounded-full bg-white/30 top-[20%] left-[80%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/30 top-[40%] left-[10%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/30 top-[50%] left-[30%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/30 top-[30%] left-[60%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/30 top-[10%] left-[20%]"></div>
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
        <div className="absolute h-2 w-2 rounded-full bg-white/30 top-[20%] left-[80%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/30 top-[40%] left-[10%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/30 top-[50%] left-[30%]"></div>
        <div className="absolute h-2 w-2 rounded-full bg-white/30 top-[30%] left-[60%]"></div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-24 pb-17 px-4 max-w-6xl mx-auto">
        <div className="text-center" >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight mt-10">
            Security. Privacy. Freedom.<br />
            for Everyone.
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-14 text-lg">
            Select a RDP plan to access your favorite content with lightning speed 
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
                  <PricingSection plans={windowsPlans} showDetailedComparison={true} />
                </TabsContent>
                <TabsContent value="linux" className="mt-10">
                  <PricingSection plans={linuxPlans} showDetailedComparison={true} />
                </TabsContent>
              </Tabs>
            </div>
        {/* Partners Section */}
        <PartnersMarquee partners={partners} />
        </div>
      {/* Stats + Footer */}
      <StatsBanner />
      <SimpleFooter />
    </div>
            
  );
};

export default PricingPage;


