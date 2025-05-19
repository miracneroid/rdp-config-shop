
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, HelpCircle, ChevronUp, ChevronDown } from "lucide-react";
import PricingCard from "@/components/PricingCard";
import { supabase } from "@/integrations/supabase/client";
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
  "Premium": [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true]
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
            <div className="w-full mb-8">
              <h2 className="text-4xl font-bold mb-4">Compare Plans</h2>
            </div>

            <div className="w-full overflow-auto bg-[#121218] rounded-xl">
              {/* Header Row */}
              <div className="grid grid-cols-[1fr_repeat(3,minmax(150px,1fr))] w-full">
                <div className="p-6"></div>
                {plans.map((plan, index) => (
                  <div key={index} className="text-center p-6">
                    <div className="mb-2 flex justify-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center
                        ${plan.name === "Personal" ? "bg-[#99ddff30]" : 
                          plan.name === "Starter" ? "bg-[#c4b1ff30]" : 
                          "bg-[#a6b1ff30]"}`
                      }>
                        <div className={`
                          ${plan.name === "Personal" ? "w-3 h-3 bg-[#99ddff] rounded-full" : 
                            plan.name === "Starter" ? "w-3 h-3 bg-[#c4b1ff] rounded-full" : 
                            "w-3 h-3 transform rotate-45 bg-[#a6b1ff]"}`
                        }></div>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                    <div className="mt-2 text-2xl font-bold">
                      {plan.price === 0 ? "Free" : (
                        <span>{`$${plan.price}`} <span className="text-sm text-gray-400">/ month</span></span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Feature Rows */}
              {features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className={`grid grid-cols-[1fr_repeat(3,minmax(150px,1fr))] w-full 
                    ${idx % 2 === 0 ? 'bg-[#1a1a24]' : 'bg-[#121218]'}`
                  }
                >
                  <div className="p-5 flex items-center">
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
                  </div>
                  {plans.map((plan, planIdx) => (
                    <div key={planIdx} className="flex justify-center items-center p-5">
                      {featureAvailability[plan.name as keyof typeof featureAvailability][idx] ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <span className="h-5 w-5 flex items-center justify-center text-gray-700">—</span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingSection;
