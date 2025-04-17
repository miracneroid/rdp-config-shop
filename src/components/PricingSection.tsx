import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/context/SettingsContext";
import PricingCard from "@/components/PricingCard";
import { CheckCircle, XCircle, HelpCircle, ChevronUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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
}

interface StatsData {
  deployedServers: number;
  ticketReplies: number;
}

const PricingSection = ({ plans }: PricingSectionProps) => {
  const { settings } = useSettings();
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

  const featureComparison = [
    {
      category: "Performance",
      features: [
        { name: "CPU Performance", tooltip: "Higher is better" },
        { name: "SLA Uptime", tooltip: "Guaranteed server uptime" },
        { name: "Storage Type", tooltip: "Type of storage used" },
        { name: "Network Speed", tooltip: "Maximum network throughput" }
      ]
    },
    {
      category: "Features",
      features: [
        { name: "Automated Backups", tooltip: "Regular system backups" },
        { name: "Multiple OS Options", tooltip: "Choice of operating systems" },
        { name: "Root Access", tooltip: "Full administrator access" },
        { name: "Dedicated Resources", tooltip: "Non-shared CPU & RAM" }
      ]
    },
    {
      category: "Support",
      features: [
        { name: "24/7 Technical Support", tooltip: "Round-the-clock assistance" },
        { name: "Response Time", tooltip: "Average time to first response" },
        { name: "Managed Services", tooltip: "We handle maintenance & updates" },
        { name: "Priority Support Queue", tooltip: "Jump ahead in support queue" }
      ]
    }
  ];

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
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
        
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-rdp-dark dark:text-white mb-6">Compare Plans in Detail</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              See how our plans stack up against each other with this detailed feature comparison.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <th className="p-4 text-left font-semibold text-gray-700 dark:text-gray-300 w-1/5"></th>
                  {plans.map((plan, index) => (
                    <th key={index} className="p-4 text-center font-semibold text-rdp-dark dark:text-white">
                      <div className={`text-xl ${plan.popular ? 'text-rdp-blue' : ''}`}>{plan.name}</div>
                      <div className="text-xl font-bold mt-1">
                        {settings.currency.symbol}{plan.price}<span className="text-sm font-normal text-gray-500 dark:text-gray-400">/mo</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              
              <tbody>
                {featureComparison.map((category, categoryIndex) => (
                  <React.Fragment key={categoryIndex}>
                    <tr className="bg-gray-100 dark:bg-gray-800/50">
                      <td colSpan={plans.length + 1} className="p-4 font-semibold text-rdp-dark dark:text-white text-lg">
                        {category.category}
                      </td>
                    </tr>
                    
                    {category.features.map((feature, featureIndex) => (
                      <tr 
                        key={featureIndex} 
                        className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors duration-150`}
                      >
                        <td className="p-4 text-left font-medium text-gray-700 dark:text-gray-300 group relative">
                          {feature.name}
                          {feature.tooltip && (
                            <div className="absolute left-0 -bottom-10 z-10 w-64 p-2 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                              {feature.tooltip}
                            </div>
                          )}
                        </td>
                        
                        {plans.map((plan, planIndex) => {
                          const featureData = planValues[plan.name as keyof typeof planValues][feature.name as keyof typeof planValues["Basic"]];
                          
                          return (
                            <td key={planIndex} className="p-4 text-center align-middle">
                              <div className="flex flex-col items-center">
                                <div className="mb-1">{renderIcon(featureData.status)}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">{featureData.value}</div>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-xl p-8 md:p-10 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-rdp-dark dark:text-white">Need a custom solution?</h3>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                Contact us for custom configurations, bulk pricing, or enterprise solutions.
              </p>
            </div>
            <Link to="/contact" className="mt-6 md:mt-0">
              <Button variant="outline" className="border-rdp-blue text-rdp-blue hover:bg-rdp-blue/10 transform transition-all duration-300 hover:scale-105 text-lg px-8 py-6 h-auto">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
