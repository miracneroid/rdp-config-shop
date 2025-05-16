
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/SimpleFooter";
import HomeFAQ from "@/components/HomeFAQ";
import FeatureHighlightGrid from "@/components/FeatureHighlightGrid";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useSettings } from "@/context/SettingsContext";

interface PricingPlan {
  name: string;
  price: number;
  popular?: boolean;
  features: {
    name: string;
    included: boolean;
  }[];
  buttonText: string;
  buttonVariant: "default" | "outline" | "secondary";
}

const PricingPage = () => {
  const { settings } = useSettings();
  const [tab, setTab] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlan, setSelectedPlan] = useState("Standard");

  const plans: PricingPlan[] = [
    {
      name: "Free",
      price: 0,
      features: [
        { name: "1 Core CPU", included: true },
        { name: "2 GB RAM", included: true },
        { name: "20 GB SSD", included: true },
        { name: "Basic Support", included: true },
        { name: "Limited Bandwidth", included: true },
        { name: "Single User", included: true },
        { name: "Standard Security", included: true },
        { name: "Manual Backups", included: false },
        { name: "Advanced Monitoring", included: false },
        { name: "Custom Domain", included: false },
      ],
      buttonText: "Try for Free",
      buttonVariant: "outline"
    },
    {
      name: "Standard",
      price: tab === "monthly" ? 2.99 : 29.99,
      popular: true,
      features: [
        { name: "4 Core CPU", included: true },
        { name: "8 GB RAM", included: true },
        { name: "100 GB SSD", included: true },
        { name: "Priority Support", included: true },
        { name: "Unlimited Bandwidth", included: true },
        { name: "5 Users", included: true },
        { name: "Enhanced Security", included: true },
        { name: "Daily Backups", included: true },
        { name: "Advanced Monitoring", included: true },
        { name: "Custom Domain", included: false },
      ],
      buttonText: "Choose Standard",
      buttonVariant: "default"
    },
    {
      name: "Premium",
      price: tab === "monthly" ? 6.99 : 69.99,
      features: [
        { name: "8 Core CPU", included: true },
        { name: "16 GB RAM", included: true },
        { name: "250 GB SSD", included: true },
        { name: "24/7 Support", included: true },
        { name: "Unlimited Bandwidth", included: true },
        { name: "Unlimited Users", included: true },
        { name: "Enterprise Security", included: true },
        { name: "Hourly Backups", included: true },
        { name: "Enterprise Monitoring", included: true },
        { name: "Custom Domain", included: true },
      ],
      buttonText: "Choose Premium",
      buttonVariant: "outline"
    }
  ];

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
  };

  useEffect(() => {
    // Set the initially selected plan
    const popularPlan = plans.find(p => p.popular);
    setSelectedPlan(popularPlan?.name || plans[1].name);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white w-full">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Security. Privacy. Freedom.<br />
            for Everyone.
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Deploy a full-featured RDP in seconds with no setup required
          </p>
          
          {/* Pricing Toggle */}
          <div className="mb-16">
            <Tabs 
              value={tab} 
              onValueChange={(v) => setTab(v as "monthly" | "yearly")} 
              className="inline-flex mx-auto bg-gray-900 p-1 rounded-full"
            >
              <TabsList className="bg-transparent">
                <TabsTrigger 
                  value="monthly" 
                  className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-full px-6 py-2"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger 
                  value="yearly" 
                  className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white rounded-full px-6 py-2"
                >
                  Yearly (Save 20%)
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={`bg-gray-900 rounded-2xl p-8 border ${
                  plan.popular ? 'border-indigo-500 relative shadow-lg shadow-indigo-500/20' : 'border-gray-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price === 0 ? 'Free' : `${settings.currency.symbol}${plan.price.toFixed(2)}`}</span>
                  {plan.price > 0 && <span className="text-gray-400">/{tab === "monthly" ? "mo" : "yr"}</span>}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      {feature.included ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-5 w-5 text-gray-600 mr-3 flex-shrink-0" />
                      )}
                      <span className={feature.included ? "text-gray-300" : "text-gray-500"}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.buttonVariant === "default" 
                      ? "bg-indigo-600 hover:bg-indigo-700" 
                      : "bg-transparent border border-gray-700 hover:bg-gray-800"
                  }`}
                  onClick={() => handlePlanSelect(plan.name)}
                  asChild
                >
                  <Link to="/configure">
                    {plan.buttonText}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Trusted By Section */}
      <div className="py-12 border-t border-gray-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-10 items-center opacity-70">
            <div className="text-gray-400 font-medium">slack</div>
            <div className="text-gray-400 font-medium">stripe</div>
            <div className="text-gray-400 font-medium">Airwallex</div>
            <div className="text-gray-400 font-medium">Spotify</div>
            <div className="text-gray-400 font-medium">Booking.com</div>
            <div className="text-gray-400 font-medium">gusto</div>
          </div>
        </div>
      </div>
      
      {/* Comparison Table */}
      <div className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-16">Compare Plans</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-4">Features</th>
                  {plans.map(plan => (
                    <th key={plan.name} className="text-center py-4">
                      <div className="flex flex-col items-center">
                        <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${
                          plan.name === "Free" ? "bg-gray-800" :
                          plan.name === "Standard" ? "bg-indigo-600" : "bg-purple-600"
                        } mb-2`}>
                          {plan.name === "Free" ? "F" : plan.name.charAt(0)}
                        </span>
                        {plan.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  "CPU Allocation",
                  "RAM",
                  "Storage",
                  "Support Level",
                  "Bandwidth",
                  "User Access",
                  "Security Features",
                  "Automated Backups",
                  "Monitoring Tools",
                  "Custom Domain Support"
                ].map((feature, idx) => (
                  <tr key={idx} className="border-b border-gray-800">
                    <td className="py-4 text-gray-300">{feature}</td>
                    {plans.map(plan => (
                      <td key={`${plan.name}-${idx}`} className="text-center py-4">
                        {plan.features[idx].included ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="h-5 w-5 text-gray-600 mx-auto" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-8 flex justify-center gap-4">
            {plans.map(plan => (
              <Button 
                key={plan.name}
                className={`${
                  plan.name === "Standard" 
                    ? "bg-indigo-600 hover:bg-indigo-700" 
                    : "bg-transparent border border-gray-700 hover:bg-gray-800"
                }`}
                asChild
              >
                <Link to="/configure">
                  {plan.buttonText}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Feature Highlight Grid - Add-Ons Section */}
      <FeatureHighlightGrid planName={selectedPlan} />
      
      {/* FAQ Section */}
      <HomeFAQ />
      
      <SimpleFooter />
    </div>
  );
};

export default PricingPage;
