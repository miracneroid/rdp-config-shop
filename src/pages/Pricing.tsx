
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ShieldCheck, Info } from "lucide-react";
import SimpleFooter from "@/components/SimpleFooter";
import HomeFAQ from "@/components/HomeFAQ";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  const plans = [
    {
      name: "Personal",
      icon: "circle",
      price: "Free",
      description: "For individuals who want to securely connect personal devices, for free.",
      features: ["1 device"],
      buttonText: "Try Now",
      buttonVariant: "outline",
      popular: false,
    },
    {
      name: "Starter",
      icon: "square",
      price: "$2.99",
      description: "For teams or organizations looking for an easy-to-use, secure, legacy VPN replacement.",
      features: ["Covers 5 devices"],
      buttonText: "Subscribe Now",
      buttonVariant: "primary",
      popular: true,
      discount: "Save 65%",
      extraMonths: "+3 EXTRA months"
    },
    {
      name: "Premium",
      icon: "diamond",
      price: "$6.99",
      description: "For companies who need service and resource level authentication and access control.",
      features: ["Covers 10 devices"],
      buttonText: "Subscribe Now",
      buttonVariant: "outline",
      popular: false,
      discount: "Save 75%",
      extraMonths: "+3 EXTRA months"
    }
  ];

  const partners = [
    "slack", "stripe", "airwallex", "spotify", "booking.com", "gusto"
  ];
  
  // Features for comparison table
  const features = [
    { name: "Block viruses, ransomware and malware", tooltip: "Protection against malicious software" },
    { name: "Monitor your apps for any suspicious activity", tooltip: "Real-time app monitoring" },
    { name: "Block intruders with advanced firewall", tooltip: "Prevents unauthorized access" },
    { name: "Stop webcam spies", tooltip: "Blocks unauthorized webcam access" },
    { name: "Avoid fake and dangerous websites", tooltip: "Web protection" },
    { name: "Give your sensitive info extra protection", tooltip: "Enhanced data security" },
    { name: "Enjoy unlimited VPN with 55 locations", tooltip: "Global VPN network" },
    { name: "Monitor your online accounts for breaches", tooltip: "Account breach alerts" },
    { name: "Avoid being tracked by advertisers", tooltip: "Anti-tracking protection" },
    { name: "Update your drivers automatically", tooltip: "Automatic driver updates" },
    { name: "Clean up and tune up your devices", tooltip: "Device optimization" },
    { name: "Get an alert if your identity has been compromised", tooltip: "Identity monitoring" },
    { name: "Get up to $2 million reimbursement for identity theft*", tooltip: "Financial protection" },
    { name: "Enjoy 24/7 personal support for identity and tech issues", tooltip: "Premium customer support" },
    { name: "Monitor credit reports from 3 leading credit bureaus", tooltip: "Credit monitoring" }
  ];
  
  // Features availability by plan
  const featureAvailability = {
    "Personal": [true, true, true, false, false, false, false, false, false, false, false, false, false, false, false],
    "Starter": [true, true, true, true, true, true, true, true, true, true, true, false, false, false, false],
    "Premium": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
  };

  return (
    <div className="min-h-screen bg-[#0c0c20] text-white">
      {/* Star background with small dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i}
            className={`absolute h-1 w-1 rounded-full bg-white/20`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1
            }}
          ></div>
        ))}
      </div>

      {/* Pricing Section */}
      <div className="relative z-10 pt-24 pb-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Security. Privacy. Freedom.<br />
            for Everyone.
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
            Select a VPN plan to access your favorite content with lightning speed 
            and unlimited data.
          </p>
          
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
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`relative bg-[#171728] rounded-3xl overflow-hidden ${plan.popular ? 'border border-indigo-400/30' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 flex justify-center">
                    <div className="bg-indigo-400/30 text-blue-300 px-4 py-1.5 rounded-b-xl flex items-center text-sm font-medium">
                      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 mr-1.5" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" />
                      </svg>
                      Best Deal
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <div className="flex justify-between items-start">
                    <div className="bg-[#222233] rounded-full p-4 w-12 h-12 flex items-center justify-center mb-6">
                      {index === 0 && <div className="bg-white rounded-full w-4 h-4"></div>}
                      {index === 1 && <div className="bg-[#696cff] rounded-md w-5 h-5"></div>}
                      {index === 2 && <div className="bg-white rounded-md transform rotate-45 w-4 h-4"></div>}
                    </div>
                    
                    {plan.discount && (
                      <div className="bg-blue-500 text-xs rounded-full px-2 py-0.5 font-medium">
                        {plan.discount}
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 min-h-[40px]">
                    {plan.description}
                  </p>
                  
                  <div className="mt-6 mb-2">
                    <span className="text-5xl font-bold">{plan.price}</span>
                    {plan.price !== "Free" && <span className="text-gray-400 ml-1">/ month</span>}
                  </div>
                  
                  {plan.extraMonths && (
                    <div className="text-[#696cff] mb-6 font-semibold">{plan.extraMonths}</div>
                  )}
                  
                  <div className="mt-auto space-y-4">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <div className="mr-2 p-1">
                          <Check size={16} className="text-gray-400" />
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full mt-8 ${plan.popular 
                      ? 'bg-indigo-500 hover:bg-indigo-600 text-white' 
                      : 'bg-[#222233] hover:bg-[#2a2a40] text-white border-0'}`}
                  >
                    {plan.buttonText}
                  </Button>
                  
                  {plan.popular && (
                    <div className="text-center mt-4 text-sm text-gray-400 flex items-center justify-center">
                      <ShieldCheck size={14} className="mr-1" />
                      <span>30-day money-back guarantee</span>
                    </div>
                  )}
                  
                  {!plan.popular && plan.price !== "Free" && (
                    <div className="text-center mt-4 text-sm text-gray-400 flex items-center justify-center">
                      <ShieldCheck size={14} className="mr-1" />
                      <span>30-day money-back guarantee</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Partners Section */}
        <div className="py-20">
          <div className="text-center mb-12">
            <p className="text-xl text-gray-400 mb-10">
              Our trusted partners and companies, relying on our safe services.
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              {partners.map((partner, index) => (
                <div key={index} className="text-gray-500 text-2xl md:text-3xl font-bold">
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Compare Plans Section - New design based on reference image */}
        <div className="py-16">
          <div className="flex flex-col md:flex-row gap-10">
            {/* Left column: Compare Plans title */}
            <div className="w-full md:w-1/4">
              <h2 className="text-4xl font-bold mb-4">Compare Plans</h2>
            </div>
            
            {/* Right column: Comparison table */}
            <div className="w-full md:w-3/4">
              <div className="grid grid-cols-4 gap-4">
                {/* Headers for each plan */}
                <div className="col-span-1"></div> {/* Empty space for features column */}
                {plans.map((plan, index) => (
                  <div key={index} className="p-3 flex flex-col items-center">
                    {/* Plan icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-[#4cc9f0]' : 
                      index === 1 ? 'bg-[#da7dff]' : 
                      'bg-[#926dff]'
                    }`}>
                      {index === 0 && <div className="bg-[#4cc9f0] rounded-full w-10 h-10"></div>}
                      {index === 1 && <div className="bg-[#da7dff] rounded-md w-10 h-10"></div>}
                      {index === 2 && <div className="bg-[#926dff] rounded-md w-10 h-10"></div>}
                    </div>
                    
                    {/* Plan name */}
                    <h3 className="text-lg font-bold mt-2">{plan.name}</h3>
                    
                    {/* Plan price */}
                    <div className="mt-2">
                      <span className="text-2xl font-bold">{plan.price}</span>
                      {plan.price !== "Free" && <span className="text-sm text-gray-400">/ month</span>}
                    </div>
                  </div>
                ))}
                
                {/* Feature rows */}
                {features.map((feature, idx) => (
                  <React.Fragment key={idx}>
                    <div className="col-span-1 flex items-center text-sm py-3 border-t border-[#222233]">
                      <div className="flex items-center">
                        <span className="text-gray-300">{feature.name}</span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info size={14} className="ml-2 text-gray-500 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{feature.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                    
                    {/* Check for each plan */}
                    {plans.map((plan, planIdx) => {
                      const planName = plan.name as keyof typeof featureAvailability;
                      const isAvailable = featureAvailability[planName][idx];
                      
                      return (
                        <div 
                          key={`${idx}-${planIdx}`} 
                          className="col-span-1 flex justify-center items-center py-3 border-t border-[#222233]"
                        >
                          {isAvailable ? (
                            <Check className="h-5 w-5 text-white" />
                          ) : null}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <HomeFAQ />
      
      {/* Simple footer */}
      <SimpleFooter />
    </div>
  );
};

export default PricingPage;
