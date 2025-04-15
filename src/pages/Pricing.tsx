
import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

const defaultPricingPlans = [
  {
    name: "Basic",
    price: 29,
    cpu: "2 Cores",
    ram: "4 GB",
    storage: "64 GB SSD",
    features: [
      "Windows or Linux OS",
      "Basic Software Package",
      "24/7 Access",
      "Standard Support"
    ]
  },
  {
    name: "Standard",
    price: 59,
    cpu: "4 Cores",
    ram: "8 GB",
    storage: "128 GB SSD",
    features: [
      "Windows or Linux OS",
      "Basic Software Package",
      "24/7 Access",
      "Priority Support",
      "Daily Backups"
    ],
    popular: true
  },
  {
    name: "Premium",
    price: 99,
    cpu: "8 Cores",
    ram: "16 GB",
    storage: "256 GB SSD",
    features: [
      "Windows or Linux OS",
      "Professional Software Package",
      "24/7 Access",
      "Priority Support",
      "Daily Backups",
      "Enhanced Security"
    ]
  },
  {
    name: "Enterprise",
    price: 199,
    cpu: "16 Cores",
    ram: "32 GB",
    storage: "512 GB SSD",
    features: [
      "Windows or Linux OS",
      "Enterprise Software Package",
      "24/7 Access",
      "Priority Support",
      "Hourly Backups",
      "Advanced Security",
      "Dedicated Resources"
    ]
  }
];

const PricingPage = () => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-rdp-dark w-full">
      <Navbar />
      <div className="bg-white dark:bg-rdp-dark py-16 flex-grow w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-2 text-rdp-blue border-rdp-blue">Pricing</Badge>
            <h1 className="text-3xl font-bold tracking-tight text-rdp-dark dark:text-white sm:text-4xl">
              Simple, transparent pricing for everyone
            </h1>
            <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">
              Choose the plan that works best for you. All plans include 24/7 support and a 99.9% uptime guarantee.
            </p>
          </div>
          
          <PricingSection plans={defaultPricingPlans} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;

