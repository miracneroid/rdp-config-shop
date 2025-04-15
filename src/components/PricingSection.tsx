import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/context/SettingsContext";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

const PricingSection = ({ plans }: PricingSectionProps) => {
  const { settings } = useSettings();

  const getFeatureDescription = (feature: string) => {
    const descriptions: { [key: string]: string } = {
      "Windows or Linux OS": "Choose between Windows or Linux operating systems based on your needs",
      "Basic Software Package": "Essential software pre-installed for basic computing needs",
      "Professional Software Package": "Advanced software suite for professional workloads",
      "Enterprise Software Package": "Comprehensive software bundle for enterprise operations",
      "24/7 Access": "Round-the-clock access to your RDP environment",
      "Standard Support": "Email support with 24-hour response time",
      "Priority Support": "Priority email and chat support with 4-hour response time",
      "Daily Backups": "Automated daily backups of your RDP environment",
      "Enhanced Security": "Advanced security features including firewall and antivirus",
      "Advanced Security": "Enterprise-grade security with custom configurations",
      "Dedicated Resources": "Guaranteed dedicated CPU, RAM, and storage resources",
      "Hourly Backups": "Automated hourly backups for maximum data protection"
    };
    return descriptions[feature] || feature;
  };

  return (
    <section id="pricing" className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2 text-rdp-blue border-rdp-blue">Pricing</Badge>
          <h2 className="text-3xl font-bold text-rdp-dark dark:text-white">Simple, transparent pricing</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the plan that works best for you. All plans include 24/7 support and a 99.9% uptime guarantee.
          </p>
        </div>
        
        <div className="mt-12 grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white dark:bg-gray-800 rounded-xl border transform transition-all duration-300 
                hover:scale-105 hover:shadow-2xl hover:border-rdp-blue dark:hover:border-rdp-blue
                ${plan.popular 
                  ? "shadow-lg" 
                  : "border-gray-200 dark:border-gray-700 shadow-sm"
                } hover:shadow-xl transition-all overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-rdp-blue text-white py-1 px-4 text-sm font-medium rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <HoverCard>
                  <HoverCardTrigger>
                    <h3 className="text-xl font-bold text-rdp-dark dark:text-white cursor-pointer">{plan.name}</h3>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{plan.name} Plan Details</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Perfect for {plan.name === "Basic" ? "individuals and small projects" : 
                          plan.name === "Standard" ? "growing businesses" :
                          plan.name === "Premium" ? "larger organizations" : "enterprise operations"}
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>

                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-rdp-dark dark:text-white animate-pulse">
                    {settings.currency.symbol}{plan.price}
                  </span>
                  <span className="ml-1 text-gray-500 dark:text-gray-400">/month</span>
                </div>
                
                <div className="mt-6 space-y-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center w-full">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">CPU</span>
                        <span className="text-sm font-medium text-rdp-dark dark:text-white">{plan.cpu}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Dedicated CPU cores for your RDP instance</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger className="flex items-center w-full">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">RAM</span>
                        <span className="text-sm font-medium text-rdp-dark dark:text-white">{plan.ram}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Dedicated RAM for smooth operation</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger className="flex items-center w-full">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">Storage</span>
                        <span className="text-sm font-medium text-rdp-dark dark:text-white">{plan.storage}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>High-speed SSD storage capacity</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <TooltipProvider key={idx}>
                        <Tooltip>
                          <TooltipTrigger className="flex items-start w-full">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{getFeatureDescription(feature)}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8">
                  <Link to="/configure" className="w-full block">
                    <Button 
                      className={`w-full transform transition-all duration-300 hover:scale-105 
                        group-hover:bg-rdp-blue group-hover:text-white
                        ${plan.popular 
                          ? "bg-rdp-blue hover:bg-rdp-blue-light text-white" 
                          : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-rdp-dark dark:text-white hover:bg-rdp-blue hover:border-transparent hover:text-white dark:hover:bg-rdp-blue"
                        }`}
                    >
                      {plan.popular ? "Get Started" : "Choose Plan"}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-rdp-dark dark:text-white">Need a custom solution?</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Contact us for custom configurations, bulk pricing, or enterprise solutions.
              </p>
            </div>
            <Link to="/contact" className="mt-4 md:mt-0">
              <Button variant="outline" className="border-rdp-blue text-rdp-blue hover:bg-rdp-blue/10 transform transition-all duration-300 hover:scale-105">
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
