
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HelpCircle, Check, X, ChevronDown } from "lucide-react";
import SimpleFooter from "@/components/SimpleFooter";
import HomeFAQ from "@/components/HomeFAQ";
import InteractivePuzzle from "@/components/3d/InteractivePuzzle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const pricingPlans = [
  {
    name: "Free",
    price: 0,
    highlight: false,
    features: [
      "1 user",
      "1 GB storage",
      "Community support",
      "Basic features"
    ],
    button: "Get started",
    buttonVariant: "outline"
  },
  {
    name: "Pro",
    price: 2.99,
    highlight: true,
    features: [
      "Unlimited users",
      "10 GB storage",
      "Priority support",
      "Advanced features",
      "Custom branding"
    ],
    button: "Get started",
    buttonVariant: "default"
  },
  {
    name: "Business",
    price: 6.99,
    highlight: false,
    features: [
      "Unlimited users",
      "100 GB storage",
      "24/7 support",
      "All features",
      "Custom branding",
      "Advanced security"
    ],
    button: "Contact us",
    buttonVariant: "outline"
  }
];

const comparisonFeatures = [
  "Custom branding",
  "Custom domain",
  "Priority support",
  "Advanced analytics",
  "Team collaboration",
  "API access",
  "SSO integration",
  "Data export",
  "Custom templates",
  "Dedicated account manager",
  "SLA uptime guarantee",
  "Advanced security"
];

const addOns = [
  {
    name: "Microsoft Office",
    price: 2.50,
    description: "Access to all Microsoft Office apps",
    button: "Add to plan"
  },
  {
    name: "Premium Security",
    price: 3.99,
    description: "Enhanced security features and firewall",
    button: "Add to plan"
  }
];

const trustedBy = [
  "slack",
  "stripe",
  "airwallex",
  "spotify",
  "booking.com",
  "gusto"
];

const PricingPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("Pro");

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#090918] text-white">
      {/* Hero Section */}
      <div className="relative pt-16 pb-32 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-indigo-100/10 px-3 py-1 text-sm font-medium text-indigo-300 mb-5">
            Pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Security. Privacy. Freedom.<br />
            for Everyone.
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            Choose a plan that works best for you and your team. All plans include a 30-day free trial.
          </p>
          
          {/* Pricing Toggle - Monthly/Annual */}
          <div className="flex items-center justify-center mb-12">
            <span className="text-gray-400 mr-3">Monthly</span>
            <div className="w-12 h-6 bg-indigo-500/30 rounded-full p-1">
              <div className="w-4 h-4 bg-indigo-500 rounded-full transform translate-x-6"></div>
            </div>
            <span className="text-white ml-3">Annual</span>
            <span className="ml-2 bg-indigo-500/20 text-indigo-300 text-xs px-2 py-1 rounded-full">
              Save 20%
            </span>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.name}
                className={`bg-[#0D0D1F] rounded-xl p-6 border transition-all ${
                  plan.highlight 
                    ? "border-indigo-500 shadow-lg shadow-indigo-500/20 transform scale-105" 
                    : "border-gray-800"
                }`}
              >
                <div className="text-xl font-semibold">{plan.name}</div>
                <div className="mt-2 flex items-end">
                  {plan.price === 0 ? (
                    <span className="text-3xl font-bold">Free</span>
                  ) : (
                    <>
                      <span className="text-2xl font-bold mr-1">$</span>
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-400 ml-1">/mo</span>
                    </>
                  )}
                </div>
                
                <div className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start">
                      <Check className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant={plan.buttonVariant as "outline" | "default"}
                  className={`w-full mt-6 ${
                    plan.buttonVariant === "default" 
                      ? "bg-indigo-600 hover:bg-indigo-700" 
                      : "border-gray-700 hover:border-indigo-500 text-white"
                  }`}
                >
                  {plan.button}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Trusted By */}
      <div className="py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8">
            {trustedBy.map((company) => (
              <div key={company} className="flex justify-center items-center opacity-50 hover:opacity-75 transition">
                <span className="text-gray-400 font-semibold">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Compare Plans */}
      <div className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-12">
            <h2 className="text-3xl font-bold">Compare Plans</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-6 text-gray-400 font-medium"></th>
                  {pricingPlans.map((plan) => (
                    <th key={plan.name} className="pb-6 px-6">
                      <div className="flex items-center">
                        <div className="size-6 rounded-full bg-indigo-500/20 flex items-center justify-center mr-2">
                          <div className={plan.name === "Pro" ? "size-3 bg-indigo-500 rounded-full" : ""}></div>
                        </div>
                        <span>{plan.name}</span>
                      </div>
                      <div className="mt-1">
                        {plan.price === 0 ? (
                          <span className="text-lg font-bold">Free</span>
                        ) : (
                          <span className="text-lg font-bold">${plan.price}/mo</span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index} className="border-t border-gray-800">
                    <td className="py-4 text-gray-400">{feature}</td>
                    <td className="py-4 px-6">
                      {index < 2 ? <X className="text-gray-600" size={18} /> : <Check className="text-green-500" size={18} />}
                    </td>
                    <td className="py-4 px-6">
                      <Check className="text-green-500" size={18} />
                    </td>
                    <td className="py-4 px-6">
                      <Check className="text-green-500" size={18} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="grid grid-cols-3 mt-8 max-w-5xl mx-auto">
            <div className="px-6 text-center">
              <Button variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600">
                Get started
              </Button>
            </div>
            <div className="px-6 text-center">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Get started
              </Button>
            </div>
            <div className="px-6 text-center">
              <Button variant="outline" className="border-gray-700 text-gray-400 hover:border-gray-600">
                Contact us
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Need help section */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto bg-[#0D0D1F] rounded-xl p-6 border border-gray-800 flex items-center">
          <div className="bg-indigo-500/20 rounded-full p-2 mr-4">
            <HelpCircle className="h-6 w-6 text-indigo-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Need a little help deciding?</h3>
            <p className="text-gray-400 text-sm">Our experts are just a click away to help you choose the right plan.</p>
          </div>
          <Button variant="outline" className="border-gray-700 hover:border-indigo-500 whitespace-nowrap">
            Contact us
          </Button>
        </div>
      </div>
      
      {/* Add-Ons */}
      <div className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Add-Ons</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Enhance your experience with powerful add-ons tailored to your needs
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
            {addOns.map((addon) => (
              <div key={addon.name} className="bg-[#0D0D1F] rounded-xl p-6 border border-gray-800">
                <div className="bg-indigo-500/20 size-10 rounded-full flex items-center justify-center mb-4">
                  <div className="size-4 bg-indigo-500 rounded-full"></div>
                </div>
                <h3 className="text-xl font-semibold mb-1">{addon.name}</h3>
                <div className="flex items-baseline mb-3">
                  <span className="text-2xl font-bold">${addon.price}</span>
                  <span className="text-gray-400 ml-1">/mo</span>
                </div>
                <p className="text-gray-400 text-sm mb-6">{addon.description}</p>
                <Button variant="outline" className="border-gray-700 hover:border-indigo-500 w-full">
                  {addon.button}
                </Button>
              </div>
            ))}
          </div>
          
          {/* Try for Free Section */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#0D0D1F] rounded-xl p-8 border border-gray-800">
              <h3 className="text-2xl font-bold mb-3">Try Pivien for Free</h3>
              <p className="text-gray-400 mb-6">
                Get started with our free plan. No credit card required.
              </p>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Sign up now
              </Button>
            </div>
            <div className="bg-[#0D0D1F] rounded-xl p-8 border border-gray-800 flex items-center justify-center">
              <div className="relative w-full h-full">
                <div className="absolute inset-0">
                  <img 
                    src="/lovable-uploads/0f4f4047-517b-42aa-9666-c8a130a5a0ca.png" 
                    alt="App preview" 
                    className="object-contain w-full h-full opacity-70"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="py-24 px-4 bg-black">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-gray-800">
              <AccordionTrigger className="text-left hover:no-underline">
                How does Pivien's free trial work?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Our free trial gives you full access to all features for 30 days. No credit card required to sign up.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2" className="border-gray-800">
              <AccordionTrigger className="text-left hover:no-underline">
                What happens after my free trial?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                After your trial ends, you can choose to upgrade to a paid plan or continue with our limited free tier.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3" className="border-gray-800">
              <AccordionTrigger className="text-left hover:no-underline">
                Can I change my plan later?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4" className="border-gray-800">
              <AccordionTrigger className="text-left hover:no-underline">
                What payment methods do you accept?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                We accept all major credit cards, PayPal, and select cryptocurrencies.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5" className="border-gray-800">
              <AccordionTrigger className="text-left hover:no-underline">
                Is there a setup fee?
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                No, there are no setup fees or hidden costs associated with any of our plans.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      
      <SimpleFooter />
    </div>
  );
};

export default PricingPage;
