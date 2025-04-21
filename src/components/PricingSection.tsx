import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/context/SettingsContext";
import PricingCard from "@/components/PricingCard";
import { CheckCircle, XCircle, HelpCircle, ChevronUp, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

const PricingSection = ({ plans, showDetailedComparison = true }: PricingSectionProps) => {
  const { settings } = useSettings();
  const [stats, setStats] = useState<StatsData>({
    deployedServers: 146402,
    ticketReplies: 130414
  });
  const [loading, setLoading] = useState(true);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    'Performance': true,
    'Features': false,
    'Support': false,
  });
  
  useEffect(() => {
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
  }, []);

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const featureCategories = {
    "Performance": [
      { name: "CPU Performance", tooltip: "Higher is better" },
      { name: "SLA Uptime", tooltip: "Guaranteed server uptime" },
      { name: "Storage Type", tooltip: "Type of storage used" },
      { name: "Network Speed", tooltip: "Maximum network throughput" }
    ],
    "Features": [
      { name: "Automated Backups", tooltip: "Regular system backups" },
      { name: "Multiple OS Options", tooltip: "Choice of operating systems" },
      { name: "Root Access", tooltip: "Full administrator access" },
      { name: "Dedicated Resources", tooltip: "Non-shared CPU & RAM" }
    ],
    "Support": [
      { name: "24/7 Technical Support", tooltip: "Round-the-clock assistance" },
      { name: "Response Time", tooltip: "Average time to first response" },
      { name: "Managed Services", tooltip: "We handle maintenance & updates" },
      { name: "Priority Support Queue", tooltip: "Jump ahead in support queue" }
    ]
  };

  const renderIcon = (status: string) => {
    switch (status) {
      case "check":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "x":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "partial":
        return <HelpCircle className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-16 bg-white w-full">
      <div className="w-full px-2 sm:px-4 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2 w-full">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className="transition-all duration-300 transform hover:scale-105"
            >
              <PricingCard plan={plan} />
            </div>
          ))}
        </div>
        
        {showDetailedComparison && (
          <div className="mt-16 w-full">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Plan Details</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                See what's included in your selected plan
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm w-full">
              <Tabs value={plans.find(p => p.popular)?.name || plans[0].name} onValueChange={() => {}} className="w-full">
                <TabsList className="w-full flex justify-center mb-6 bg-transparent overflow-x-auto p-1 md:p-0 space-x-2">
                  {plans.map((plan, index) => (
                    <TabsTrigger 
                      key={index} 
                      value={plan.name}
                      className={`px-4 py-2 rounded-lg font-medium 
                        ${plan.popular ? 'data-[state=active]:bg-blue-600 data-[state=active]:text-white' : 
                        'data-[state=active]:bg-gray-200'}`}
                    >
                      {plan.name}
                      {plan.popular && (
                        <span className="ml-2 text-xs font-semibold bg-green-500 text-white px-2 py-0.5 rounded-full">Popular</span>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {plans.map((plan, index) => (
                  <TabsContent key={index} value={plan.name} className="space-y-6">
                    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{plan.name} Plan</h3>
                          <p className="text-gray-600 mt-1">
                            {settings.currency.symbol}{plan.price}/month
                          </p>
                        </div>
                        
                        <Link to="/configure" className="mt-4 md:mt-0">
                          <Button className="bg-blue-600 hover:bg-blue-500 text-white">
                            Choose {plan.name}
                          </Button>
                        </Link>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-500">CPU</p>
                          <p className="text-lg font-semibold text-gray-900">{plan.cpu}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-500">RAM</p>
                          <p className="text-lg font-semibold text-gray-900">{plan.ram}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-500">Storage</p>
                          <p className="text-lg font-semibold text-gray-900">{plan.storage}</p>
                        </div>
                      </div>
                      
                      <div>
                        {Object.entries(featureCategories).map(([category, features], i) => (
                          <Collapsible
                            key={category}
                            open={openCategories[category]}
                            onOpenChange={() => toggleCategory(category)}
                            className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
                          >
                            <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-gray-100 text-left">
                              <h4 className="text-lg font-semibold text-gray-900">{category}</h4>
                              {openCategories[category] ? 
                                <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                                <ChevronDown className="h-5 w-5 text-gray-500" />
                              }
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <div className="p-4 space-y-3">
                                {features.map((feature, j) => {
                                  const featureData = planValues[plan.name as keyof typeof planValues][feature.name as keyof typeof planValues["Basic"]];
                                  
                                  if (featureData.status === 'x') return null;
                                  
                                  return (
                                    <div key={j} className="flex items-start space-x-3 p-2 hover:bg-gray-50 rounded-lg">
                                      <div className="mt-0.5">
                                        {renderIcon(featureData.status)}
                                      </div>
                                      <div>
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <p className="font-medium text-gray-800 cursor-help">
                                                {feature.name}
                                              </p>
                                            </TooltipTrigger>
                                            <TooltipContent side="right">
                                              <p>{feature.tooltip}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                        <p className="text-sm text-gray-600">{featureData.value}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingSection;
