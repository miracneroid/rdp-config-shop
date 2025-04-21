
import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import StatsBanner from "@/components/StatsBanner";
import HomeFAQ from "@/components/HomeFAQ";

const defaultPricingPlans = [
  {
    name: "Basic",
    price: 29,
    cpu: "2 Cores",
    ram: "4 GB",
    storage: "64 GB SSD",
    features: [
      "Windows or Linux OS",
      "Basic Software Suite",
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
      "Standard Software Suite",
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
      "Professional Software Suite",
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
      "Enterprise Software Suite",
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
        <div className="w-full px-2 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-rdp-dark dark:text-white sm:text-5xl lg:text-6xl">
              Simple, transparent pricing for everyone
            </h1>
            <p className="mt-6 text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
              Choose the plan that works best for you. All plans include 24/7 support and a 99.9% uptime guarantee.
            </p>
          </div>
          <PricingSection plans={defaultPricingPlans} showDetailedComparison={true} />
        </div>
      </div>
      <StatsBanner />
      <HomeFAQ />
      <Footer />
    </div>
  );
};

export default PricingPage;
