
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/context/SettingsContext";
import PricingCard from "@/components/PricingCard";

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
            <PricingCard key={index} plan={plan} />
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
