
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, HelpCircle, ChevronUp, ChevronDown } from "lucide-react";
import PricingCard from "@/components/PricingCard";
import { supabase } from "@/integrations/supabase/client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

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

const featureAvailability = {
  "Personal": [true, true, true, false, false, false, false, false, false, false, false, false, false, false, false],
  "Starter": [true, true, true, true, true, true, true, true, true, true, true, false, false, false, false],
  "Premium": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
  "Enterprise": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
};

const renderIcon = (available: boolean) => {
  return available ? <CheckCircle className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-red-500" />;
};

const PricingSection = ({ plans, showDetailedComparison = true }: PricingSectionProps) => {
  const [stats, setStats] = useState<StatsData>({
    deployedServers: 146402,
    ticketReplies: 130414
  });
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="w-full px-2 sm:px-4">
      <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-2 w-full">
        {plans.map((plan, index) => (
          <div key={index} className="transition-all duration-300 transform hover:scale-105 flex">
            <div className="border border-gray-300 rounded-xl shadow-sm flex-grow flex flex-col">
              <PricingCard plan={plan} />
            </div>
          </div>
        ))}
      </div>

      {showDetailedComparison && (
        <div className="py-16">
          <div className="flex flex-col">
            <div className="w-full mb-4 flex justify-center">
              <span className="text-lg text-blue-400 font-medium">Compare Plans</span>
            </div>

            <div className="w-full overflow-auto backdrop-blur-sm bg-[#12121880] rounded-xl border border-gray-800">
              {/* Header Row */}
              <Table className="border-collapse border-spacing-2">
                <TableHeader className="bg-transparent">
                  <TableRow className="border-none">
                    <TableHead className="w-[250px] text-left p-6 border-none"></TableHead>
                    {plans.map((plan, index) => (
                      <TableHead 
                        key={index} 
                        className="min-w-[140px] text-center p-6 border-none"
                      >
                        <div className="mb-3 flex justify-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center
                            ${plan.name === "Personal" ? "bg-[#99ddff30]" : 
                              plan.name === "Starter" ? "bg-[#c4b1ff30]" : 
                              plan.name === "Premium" ? "bg-[#a6b1ff30]" :
                              "bg-[#f9a8d430]"}`
                          }>
                            <div className={`
                              ${plan.name === "Personal" ? "w-4 h-4 bg-[#99ddff] rounded-full" : 
                                plan.name === "Starter" ? "w-4 h-4 bg-[#c4b1ff] rounded-full" : 
                                plan.name === "Premium" ? "w-4 h-4 transform rotate-45 bg-[#a6b1ff]" :
                                "w-4 h-4 bg-[#f9a8d4] rounded-md"}`
                            }></div>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                        <div className="text-2xl font-bold">
                          {plan.price === 0 ? "Free" : (
                            <span>{`$${plan.price}`} <span className="text-sm text-gray-400">/ month</span></span>
                          )}
                        </div>
                        {plan.popular && (
                          <div className="mt-2">
                            <span className="bg-blue-600/30 text-blue-400 text-xs px-2 py-1 rounded-full">
                              Most Popular
                            </span>
                          </div>
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {/* Category Header */}
                  <TableRow className="bg-[#1a1a2480] border-none">
                    <TableCell colSpan={5} className="p-4 text-left border-none">
                      <h4 className="font-semibold text-lg text-blue-400">Features</h4>
                    </TableCell>
                  </TableRow>

                  {/* Feature Rows */}
                  {features.map((feature, idx) => (
                    <TableRow key={idx} className={`${idx % 2 === 0 ? 'bg-[#1a1a2440]' : 'bg-[#12121840]'} border-none`}>
                      <TableCell className="p-5 text-left border-none">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                                <span>{feature.name}</span>
                                <HelpCircle className="h-4 w-4 text-gray-500" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              {feature.tooltip}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </TableCell>

                      {plans.map((plan, planIdx) => {
                        // Determine plan key with fallback to Personal
                        const planKey = Object.keys(featureAvailability).includes(plan.name) 
                          ? plan.name 
                          : "Personal";
                        const isAvailable = featureAvailability[planKey]?.[idx] ?? false;
                        
                        return (
                          <TableCell 
                            key={planIdx} 
                            className={`
                              p-5 text-center border-none
                              ${isAvailable ? 'm-2 rounded-md border border-gray-700 bg-green-500/10' : 'm-2'}
                            `}
                          >
                            {isAvailable ? (
                              <div className="flex justify-center">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              </div>
                            ) : (
                              <span className="h-5 w-5 flex items-center justify-center text-gray-700">—</span>
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingSection;
