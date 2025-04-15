
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/context/SettingsContext";

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
              className={`relative bg-white dark:bg-gray-800 rounded-xl border ${
                plan.popular 
                  ? "border-rdp-blue shadow-lg dark:border-rdp-blue" 
                  : "border-gray-200 dark:border-gray-700 shadow-sm"
              } hover:shadow-xl transition-all overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-rdp-blue text-white py-1 px-4 text-sm font-medium rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-rdp-dark dark:text-white">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-rdp-dark dark:text-white">{settings.currency.symbol}{plan.price}</span>
                  <span className="ml-1 text-gray-500 dark:text-gray-400">/month</span>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">CPU</span>
                    <span className="text-sm font-medium text-rdp-dark dark:text-white">{plan.cpu}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">RAM</span>
                    <span className="text-sm font-medium text-rdp-dark dark:text-white">{plan.ram}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-20">Storage</span>
                    <span className="text-sm font-medium text-rdp-dark dark:text-white">{plan.storage}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8">
                  <Link to="/configure" className="w-full block">
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? "bg-rdp-blue hover:bg-rdp-blue-light text-white" 
                          : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-rdp-dark dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
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
              <Button variant="outline" className="border-rdp-blue text-rdp-blue hover:bg-rdp-blue/10">
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
