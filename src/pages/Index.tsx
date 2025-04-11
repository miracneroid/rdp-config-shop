
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PricingCard, { PricingPlan } from "@/components/PricingCard";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const pricingPlans: PricingPlan[] = [
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

const Index = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Features />
        
        {/* Pricing Section */}
        <div className="bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="sm:text-center">
              <h2 className="text-base font-semibold uppercase tracking-wide text-rdp-blue">Pricing</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-rdp-dark sm:text-4xl">
                Choose your RDP plan
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
                Select from our pre-configured plans or customize your own.
              </p>
            </div>
            
            <div className="mt-12 grid gap-8 lg:grid-cols-4 md:grid-cols-2">
              {pricingPlans.map((plan) => (
                <PricingCard key={plan.name} plan={plan} />
              ))}
            </div>
          </div>
        </div>
        
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
