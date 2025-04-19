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

const PricingSection = ({ plans, showDetailedComparison = true }: PricingSectionProps) => {
  const { settings } = useSettings();
  const [stats, setStats] = useState<StatsData>({
    deployedServers: 146402,
    ticketReplies: 130414
  });
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string>(plans.find(p => p.popular)?.name || plans[0].name);
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

  const planValues = {
    "Basic": {
      "CPU Performance": { value: "Good", status: "check" },
      "SLA Uptime": { value: "99.9%", status: "check" },
      "Storage Type": { value: "SSD", status: "check" },
      "Network Speed": { value: "1 Gbps", status: "check" },
      "Automated Backups": { value: "Weekly", status: "check" },
      "Multiple OS Options": { value: "Limited", status: "partial" },
      "Root Access": { value: "Yes", status: "check" },
      "Dedicated Resources": { value: "No", status: "x" },
      "24/7 Technical Support": { value: "Email Only", status: "partial" },
      "Response Time": { value: "24 hours", status: "partial" },
      "Managed Services": { value: "No", status: "x" },
      "Priority Support Queue": { value: "No", status: "x" }
    },
    "Standard": {
      "CPU Performance": { value: "Very Good", status: "check" },
      "SLA Uptime": { value: "99.95%", status: "check" },
      "Storage Type": { value: "NVMe SSD", status: "check" },
      "Network Speed": { value: "1 Gbps", status: "check" },
      "Automated Backups": { value: "Daily", status: "check" },
      "Multiple OS Options": { value: "Yes", status: "check" },
      "Root Access": { value: "Yes", status: "check" },
      "Dedicated Resources": { value: "Partial", status: "partial" },
      "24/7 Technical Support": { value: "Email & Chat", status: "check" },
      "Response Time": { value: "12 hours", status: "check" },
      "Managed Services": { value: "Basic", status: "partial" },
      "Priority Support Queue": { value: "No", status: "x" }
    },
    "Premium": {
      "CPU Performance": { value: "Excellent", status: "check" },
      "SLA Uptime": { value: "99.99%", status: "check" },
      "Storage Type": { value: "NVMe SSD", status: "check" },
      "Network Speed": { value: "2 Gbps", status: "check" },
      "Automated Backups": { value: "Daily", status: "check" },
      "Multiple OS Options": { value: "Yes", status: "check" },
      "Root Access": { value: "Yes", status: "check" },
      "Dedicated Resources": { value: "Yes", status: "check" },
      "24/7 Technical Support": { value: "Email, Chat & Phone", status: "check" },
      "Response Time": { value: "6 hours", status: "check" },
      "Managed Services": { value: "Yes", status: "check" },
      "Priority Support Queue": { value: "Yes", status: "check" }
    },
    "Enterprise": {
      "CPU Performance": { value: "Ultimate", status: "check" },
      "SLA Uptime": { value: "99.99%", status: "check" },
      "Storage Type": { value: "NVMe SSD RAID", status: "check" },
      "Network Speed": { value: "10 Gbps", status: "check" },
      "Automated Backups": { value: "Hourly", status: "check" },
      "Multiple OS Options": { value: "Custom", status: "check" },
      "Root Access": { value: "Yes", status: "check" },
      "Dedicated Resources": { value: "Yes", status: "check" },
      "24/7 Technical Support": { value: "Dedicated Team", status: "check" },
      "Response Time": { value: "1 hour", status: "check" },
      "Managed Services": { value: "Premium", status: "check" },
      "Priority Support Queue": { value: "Yes", status: "check" }
    }
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
    <section className="py-16 bg-white dark:bg-gray-900 w-full">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-xl overflow-hidden">
          <div className="py-12 px-8 flex flex-col md:flex-row items-center justify-around text-center md:text-left">
            <div className="mb-8 md:mb-0">
              <h2 className="text-4xl font-bold text-rdp-dark dark:text-white">100%</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">Satisfaction Guarantee</p>
            </div>
            <div className="mb-8 md:mb-0">
              <h2 className="text-4xl font-bold text-rdp-dark dark:text-white animate-count">
                {loading ? (
                  <span className="inline-block w-28 h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></span>
                ) : (
                  new Intl.NumberFormat().format(stats.deployedServers)
                )}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">Deployed Servers</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-rdp-dark dark:text-white animate-count">
                {loading ? (
                  <span className="inline-block w-28 h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></span>
                ) : (
                  new Intl.NumberFormat().format(stats.ticketReplies)
                )}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">Ticket Replies</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedPlan(plan.name)}
              className={`cursor-pointer transition-all duration-300 transform ${selectedPlan === plan.name ? 'scale-105' : 'hover:scale-102'}`}
            >
              <PricingCard plan={plan} isSelected={selectedPlan === plan.name} />
            </div>
          ))}
        </div>
        
        {showDetailedComparison && (
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-rdp-dark dark:text-white mb-6">Plan Details</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                See what's included in your selected plan
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
              <Tabs value={selectedPlan} onValueChange={setSelectedPlan} className="w-full">
                <TabsList className="w-full flex justify-center mb-6 bg-transparent overflow-x-auto p-1 md:p-0 space-x-2">
                  {plans.map((plan, index) => (
                    <TabsTrigger 
                      key={index} 
                      value={plan.name}
                      className={`px-4 py-2 rounded-lg font-medium 
                        ${plan.popular ? 'data-[state=active]:bg-rdp-blue data-[state=active]:text-white' : 
                        'data-[state=active]:bg-gray-200 dark:data-[state=active]:bg-gray-700'}`}
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
                    <div className="bg-white dark:bg-gray-800/50 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-rdp-dark dark:text-white">{plan.name} Plan</h3>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">
                            {settings.currency.symbol}{plan.price}/month
                          </p>
                        </div>
                        
                        <Link to="/configure" className="mt-4 md:mt-0">
                          <Button className="bg-rdp-blue hover:bg-rdp-blue-light text-white">
                            Choose {plan.name}
                          </Button>
                        </Link>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">CPU</p>
                          <p className="text-lg font-semibold text-rdp-dark dark:text-white">{plan.cpu}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">RAM</p>
                          <p className="text-lg font-semibold text-rdp-dark dark:text-white">{plan.ram}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Storage</p>
                          <p className="text-lg font-semibold text-rdp-dark dark:text-white">{plan.storage}</p>
                        </div>
                      </div>
                      
                      <div>
                        {Object.entries(featureCategories).map(([category, features], i) => (
                          <Collapsible
                            key={category}
                            open={openCategories[category]}
                            onOpenChange={() => toggleCategory(category)}
                            className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                          >
                            <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800/80 text-left">
                              <h4 className="text-lg font-semibold text-rdp-dark dark:text-white">{category}</h4>
                              {openCategories[category] ? 
                                <ChevronUp className="h-5 w-5 text-gray-500" /> : 
                                <ChevronDown className="h-5 w-5 text-gray-500" />
                              }
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <div className="p-4 space-y-3">
                                {features.map((feature, j) => {
                                  const featureData = planValues[plan.name as keyof typeof planValues][feature.name as keyof typeof planValues["Basic"]];
                                  
                                  // Only show included features (check or partial)
                                  if (featureData.status === 'x') return null;
                                  
                                  return (
                                    <div key={j} className="flex items-start space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg">
                                      <div className="mt-0.5">
                                        {renderIcon(featureData.status)}
                                      </div>
                                      <div>
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <p className="font-medium text-gray-800 dark:text-gray-200 cursor-help">
                                                {feature.name}
                                              </p>
                                            </TooltipTrigger>
                                            <TooltipContent side="right">
                                              <p>{feature.tooltip}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{featureData.value}</p>
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
        
        <div className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-xl p-8 md:p-10 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-rdp-dark dark:text-white">Need a custom solution?</h3>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                Configure your RDP with custom specifications tailored to your needs.
              </p>
            </div>
            <Link to="/configure" className="mt-6 md:mt-0">
              <Button className="bg-rdp-blue hover:bg-rdp-blue-light text-white text-lg px-8 py-6 h-auto transform transition-all duration-300 hover:scale-105">
                Configure Your RDP
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
