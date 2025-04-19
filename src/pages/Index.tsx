import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceOfferings from "@/components/ServiceOfferings";
import Footer from "@/components/Footer";
import StatsBanner from "@/components/StatsBanner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Cpu, Zap, Server, Globe, Clock } from "lucide-react";
import PricingCard from "@/components/PricingCard";

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

const Index = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>(defaultPricingPlans.find(p => p.popular)?.name || defaultPricingPlans[0].name);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black w-full">
      <Navbar />
      <main className="w-full bg-transparent">
        <Hero />
        
        {/* Why Choose Us Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-2 text-rdp-blue border-rdp-blue">Why Choose Us</Badge>
              <h2 className="text-3xl font-bold text-rdp-dark dark:text-white">The most powerful RDP solution</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Our Remote Desktop Protocol solutions are designed for performance, security, and reliability.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center rounded-lg mb-4">
                  <Zap className="h-6 w-6 text-rdp-blue" />
                </div>
                <h3 className="text-xl font-semibold text-rdp-dark dark:text-white mb-2">Lightning Fast</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our servers are optimized for speed with the latest hardware and network infrastructure.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 flex items-center justify-center rounded-lg mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-rdp-dark dark:text-white mb-2">Ultra Secure</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Enterprise-grade security protocols and encryption to keep your data safe.
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center rounded-lg mb-4">
                  <Server className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-rdp-dark dark:text-white mb-2">99.9% Uptime</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Reliable infrastructure with redundant systems and automatic failover.
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link to="/configure">
                <Button size="lg" className="bg-rdp-blue hover:bg-rdp-blue-light">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <ServiceOfferings />
        
        {/* Pricing Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-2 text-rdp-blue border-rdp-blue">Pricing</Badge>
              <h2 className="text-3xl font-bold text-rdp-dark dark:text-white">Choose the plan that fits your needs</h2>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Simple, transparent pricing for everyone. No hidden fees or surprise charges.
              </p>
            </div>
            
            <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
              {defaultPricingPlans.map((plan, index) => (
                <div 
                  key={index} 
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`cursor-pointer transition-all duration-300 transform ${selectedPlan === plan.name ? 'scale-105' : 'hover:scale-102'}`}
                >
                  <PricingCard plan={plan} isSelected={selectedPlan === plan.name} />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Setup Time Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center md:space-x-12">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <Badge variant="outline" className="mb-2 text-rdp-blue border-rdp-blue">Fast Setup</Badge>
                <h2 className="text-3xl font-bold text-rdp-dark dark:text-white">Ready in minutes, not hours</h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                  Our automated provisioning system gets your RDP environment up and running in just minutes after payment. 
                  No waiting for manual setup or approval.
                </p>
                
                <div className="mt-8 flex items-center space-x-6">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-rdp-blue mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">5-10 minute setup</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Cpu className="h-5 w-5 text-rdp-blue mr-2" />
                    <span className="text-gray-700 dark:text-gray-300">Instant scaling</span>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link to="/configure">
                    <Button size="lg" className="bg-rdp-blue hover:bg-rdp-blue-light">
                      Configure Your RDP
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="w-full h-64 md:h-80 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <div className="absolute inset-0">
                      <div className="animate-pulse space-y-4 p-6">
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="space-y-3">
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                        </div>
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="space-y-4 text-center">
                          <div className="flex items-center justify-center">
                            <div className="w-8 h-8 border-4 border-rdp-blue border-t-transparent rounded-full animate-spin"></div>
                          </div>
                          <div className="text-sm font-medium text-gray-600 dark:text-gray-400 animate-pulse">
                            Setting up your RDP...
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
                        <div className="h-full bg-rdp-blue animate-[progressBar_5s_ease-in-out_infinite]"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg animate-bounce">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm font-semibold text-gray-800 dark:text-white">Ready to use</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <StatsBanner />
      <Footer />
    </div>
  );
};

export default Index;
