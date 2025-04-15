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
    <section className="py-16 bg-white dark:bg-gray-900 w-full">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
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
