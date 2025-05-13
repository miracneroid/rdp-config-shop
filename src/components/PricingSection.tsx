import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/context/SettingsContext";
import PricingCard from "@/components/PricingCard";
import { CheckCircle, XCircle, HelpCircle, ChevronUp, ChevronDown, Zap, Shield, Monitor, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface PricingPlan {
  name: string;
  price: number;
  cpu: string;
  ram: string;
  storage: string;
  features: string[];
  popular?: boolean;
}

interface PricingSectionProps {
  plans: PricingPlan[];
  showDetailedComparison?: boolean;
  onSelectPlan?: (planName: string) => void;
}

interface StatsData {
  deployedServers: number;
  ticketReplies: number;
}

const planValues = {
  "Basic": {
    "CPU Performance": { status: "check", value: "Standard" },
    "SLA Uptime": { status: "check", value: "99.9%" },
    "Storage Type": { status: "check", value: "SSD" },
    "Network Speed": { status: "check", value: "Up to 1 Gbps" },
    "Automated Backups": { status: "partial", value: "Daily" },
    "Multiple OS Options": { status: "check", value: "Windows & Linux" },
    "Root Access": { status: "check", value: "Yes" },
    "Dedicated Resources": { status: "x", value: "No" },
    "24/7 Technical Support": { status: "check", value: "Yes" },
    "Response Time": { status: "check", value: "Within 24 hours" },
    "Managed Services": { status: "x", value: "No" },
    "Priority Support Queue": { status: "x", value: "No" }
  },
  "Standard": {
    "CPU Performance": { status: "check", value: "Enhanced" },
    "SLA Uptime": { status: "check", value: "99.95%" },
    "Storage Type": { status: "check", value: "SSD" },
    "Network Speed": { status: "check", value: "Up to 2 Gbps" },
    "Automated Backups": { status: "check", value: "Daily" },
    "Multiple OS Options": { status: "check", value: "Windows & Linux" },
    "Root Access": { status: "check", value: "Yes" },
    "Dedicated Resources": { status: "partial", value: "Partial" },
    "24/7 Technical Support": { status: "check", value: "Yes" },
    "Response Time": { status: "check", value: "Within 12 hours" },
    "Managed Services": { status: "x", value: "No" },
    "Priority Support Queue": { status: "check", value: "Yes" }
  },
  "Premium": {
    "CPU Performance": { status: "check", value: "High Performance" },
    "SLA Uptime": { status: "check", value: "99.99%" },
    "Storage Type": { status: "check", value: "NVMe SSD" },
    "Network Speed": { status: "check", value: "Up to 5 Gbps" },
    "Automated Backups": { status: "check", value: "Daily" },
    "Multiple OS Options": { status: "check", value: "Windows & Linux" },
    "Root Access": { status: "check", value: "Yes" },
    "Dedicated Resources": { status: "check", value: "Yes" },
    "24/7 Technical Support": { status: "check", value: "Yes" },
    "Response Time": { status: "check", value: "Within 6 hours" },
    "Managed Services": { status: "partial", value: "Basic" },
    "Priority Support Queue": { status: "check", value: "Yes" }
  },
  "Enterprise": {
    "CPU Performance": { status: "check", value: "Maximum Performance" },
    "SLA Uptime": { status: "check", value: "99.999%" },
    "Storage Type": { status: "check", value: "NVMe SSD" },
    "Network Speed": { status: "check", value: "Up to 10 Gbps" },
    "Automated Backups": { status: "check", value: "Hourly" },
    "Multiple OS Options": { status: "check", value: "Windows & Linux" },
    "Root Access": { status: "check", value: "Yes" },
    "Dedicated Resources": { status: "check", value: "Yes" },
    "24/7 Technical Support": { status: "check", value: "Yes" },
    "Response Time": { status: "check", value: "Within 1 hour" },
    "Managed Services": { status: "check", value: "Full" },
    "Priority Support Queue": { status: "check", value: "Yes" }
  }
};

const PricingSection = ({ plans, showDetailedComparison = true, onSelectPlan }: PricingSectionProps) => {
  const { settings } = useSettings();
  const [stats, setStats] = useState<StatsData>({
    deployedServers: 146402,
    ticketReplies: 130414
  });
  const [loading, setLoading] = useState(true);
  
  // Selected plan state
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  
  useEffect(() => {
    // Initialize the selected plan to the popular plan or the first plan
    const popularPlan = plans.find(p => p.popular);
    const initialPlan = popularPlan?.name || plans[0].name;
    setSelectedPlan(initialPlan);
    
    // Call onSelectPlan with the initial plan if provided
    if (onSelectPlan) {
      onSelectPlan(initialPlan);
    }
    
    const fetchStats = async () => {
      try {
        const { count: serversCount, error: serversError } = await supabase
          .from('rdp_instances')
          .select('*', { count: 'exact', head: true });
        
        const { count: repliesCount, error: repliesError } = await supabase
          .from('ticket_responses')
          .select('*', { count: 'exact', head: true });
        
        if (!serversError && !repliesError && serversCount !== null && repliesCount !== null) {
          setStats({
            deployedServers: serversCount + 146402,
            ticketReplies: repliesCount + 130414
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, [plans, onSelectPlan]);

  // Handle plan selection
  const handlePlanSelection = (planName: string) => {
    setSelectedPlan(planName);
    if (onSelectPlan) {
      onSelectPlan(planName);
    }
  };

  // Find the currently selected plan
  const currentPlan = plans.find(plan => plan.name === selectedPlan) || plans[0];

  // Function to render the feature value with appropriate icon
  const renderFeatureValue = (status: string, value: string) => {
    const icon = status === "check" ? 
      <CheckCircle className="h-5 w-5 text-green-500" /> : 
      status === "x" ? 
      <XCircle className="h-5 w-5 text-red-500" /> : 
      <HelpCircle className="h-5 w-5 text-amber-500" />;
    
    return (
      <div className="flex items-center space-x-2">
        {icon}
        <span>{value}</span>
      </div>
    );
  };

  return (
    <div className="w-full px-2 sm:px-4">
      <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2 w-full">
        {plans.map((plan, index) => (
          <div 
            key={index}
            className={`transition-all duration-300 transform ${selectedPlan === plan.name ? 'scale-105' : 'hover:scale-105'} flex`}
            onClick={() => handlePlanSelection(plan.name)}
          >
            {/* Flex-grow to make all cards the same height, and full height */}
            <div className={`border ${selectedPlan === plan.name ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300'} rounded-xl shadow-sm flex-grow flex flex-col`}>
              <PricingCard 
                plan={plan} 
                selected={selectedPlan === plan.name} 
                onClick={() => handlePlanSelection(plan.name)}
              />
            </div>
          </div>
        ))}
      </div>
      
      {showDetailedComparison && (
        <div className="mt-12 sm:mt-16 w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Plan Details</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              See what's included in your selected plan
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-sm w-full">
            {/* Plan Selection Pills */}
            <div className="flex justify-center mb-10 overflow-x-auto">
              <div className="inline-flex bg-white dark:bg-gray-900 p-1 rounded-lg shadow-sm">
                {plans.map((plan, index) => (
                  <button
                    key={index}
                    onClick={() => handlePlanSelection(plan.name)}
                    className={`px-5 py-2 rounded-lg font-medium text-sm md:text-base whitespace-nowrap
                      ${selectedPlan === plan.name 
                        ? plan.popular 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      } relative flex items-center`}
                  >
                    {plan.name}
                    {plan.popular && (
                      <span className="ml-2 text-[0.65rem] absolute -top-2 right-1 font-semibold bg-green-500 text-white px-1.5 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Plan Detail Card */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{currentPlan.name} Plan</h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {settings.currency.symbol}{currentPlan.price}/month
                  </p>
                </div>
                <Link to="/configure" className="mt-4 md:mt-0">
                  <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                    Choose {currentPlan.name}
                  </Button>
                </Link>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">CPU</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">{currentPlan.cpu}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">RAM</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">{currentPlan.ram}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Storage</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">{currentPlan.storage}</p>
                </div>
              </div>
              
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="performance" className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-5 py-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    Performance
                  </AccordionTrigger>
                  <AccordionContent className="px-5 py-4 bg-white dark:bg-gray-900">
                    <div className="space-y-4">
                      {["CPU Performance", "SLA Uptime", "Storage Type", "Network Speed"].map((feature, i) => {
                        const planKey = currentPlan.name as keyof typeof planValues;
                        const featureKey = feature as keyof typeof planValues["Basic"];
                        const featureData = planValues[planKey]?.[featureKey];
                        
                        if (!featureData) return null;
                        
                        return (
                          <div key={i} className="flex justify-between items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                            <p className="font-medium text-gray-800 dark:text-gray-200">{feature}</p>
                            {featureData && renderFeatureValue(featureData.status, featureData.value)}
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="features" className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-5 py-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    Features
                  </AccordionTrigger>
                  <AccordionContent className="px-5 py-4 bg-white dark:bg-gray-900">
                    <div className="space-y-4">
                      {["Automated Backups", "Multiple OS Options", "Root Access", "Dedicated Resources"].map((feature, i) => {
                        const planKey = currentPlan.name as keyof typeof planValues;
                        const featureKey = feature as keyof typeof planValues["Basic"];
                        const featureData = planValues[planKey]?.[featureKey];
                        
                        if (!featureData) return null;
                        
                        return (
                          <div key={i} className="flex justify-between items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                            <p className="font-medium text-gray-800 dark:text-gray-200">{feature}</p>
                            {featureData && renderFeatureValue(featureData.status, featureData.value)}
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="support" className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <AccordionTrigger className="px-5 py-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    Support
                  </AccordionTrigger>
                  <AccordionContent className="px-5 py-4 bg-white dark:bg-gray-900">
                    <div className="space-y-4">
                      {["24/7 Technical Support", "Response Time", "Managed Services", "Priority Support Queue"].map((feature, i) => {
                        const planKey = currentPlan.name as keyof typeof planValues;
                        const featureKey = feature as keyof typeof planValues["Basic"];
                        const featureData = planValues[planKey]?.[featureKey];
                        
                        if (!featureData) return null;
                        
                        return (
                          <div key={i} className="flex justify-between items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg">
                            <p className="font-medium text-gray-800 dark:text-gray-200">{feature}</p>
                            {featureData && renderFeatureValue(featureData.status, featureData.value)}
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingSection;
