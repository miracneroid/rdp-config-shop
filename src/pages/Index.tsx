
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
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <Navbar />
      <main>
        <Hero />
        <Features />
        
        {/* Pricing Section */}
        <div className="py-24 sm:py-32 relative">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="sm:text-center">
              <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-400">Pricing</h2>
              <p className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                Choose your RDP plan
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-400">
                Select from our pre-configured plans or customize your own.
              </p>
            </div>
            
            <div className="mt-16 grid gap-8 lg:grid-cols-4 md:grid-cols-2">
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
