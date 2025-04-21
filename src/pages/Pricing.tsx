
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import StatsBanner from "@/components/StatsBanner";
import HomeFAQ from "@/components/HomeFAQ";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Window, Linux } from "lucide-react";

const windowsPlans = [
  {
    name: "Basic",
    price: 29,
    cpu: "2 Cores",
    ram: "4 GB",
    storage: "64 GB SSD",
    features: [
      "Windows OS",
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
      "Windows OS",
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
      "Windows OS",
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
      "Windows OS",
      "Enterprise Software Suite",
      "24/7 Access",
      "Priority Support",
      "Hourly Backups",
      "Advanced Security",
      "Dedicated Resources"
    ]
  }
];

const linuxPlans = [
  {
    name: "Basic",
    price: 19,
    cpu: "2 Cores",
    ram: "4 GB",
    storage: "64 GB SSD",
    features: [
      "Linux OS",
      "Basic Tools",
      "SSH Access",
      "24/7 Access",
      "Standard Support"
    ]
  },
  {
    name: "Standard",
    price: 39,
    cpu: "4 Cores",
    ram: "8 GB",
    storage: "128 GB SSD",
    features: [
      "Linux OS",
      "Development Tools",
      "SSH Access",
      "24/7 Access",
      "Priority Support",
      "Daily Backups"
    ],
    popular: true
  },
  {
    name: "Premium",
    price: 79,
    cpu: "8 Cores",
    ram: "16 GB",
    storage: "256 GB SSD",
    features: [
      "Linux OS",
      "Advanced Tools",
      "SSH Access",
      "24/7 Access",
      "Priority Support",
      "Daily Backups",
      "Enhanced Security"
    ]
  },
  {
    name: "Enterprise",
    price: 149,
    cpu: "16 Cores",
    ram: "32 GB",
    storage: "512 GB SSD",
    features: [
      "Linux OS",
      "Enterprise Suite",
      "SSH Access",
      "24/7 Access",
      "Priority Support",
      "Hourly Backups",
      "Advanced Security",
      "Dedicated Resources"
    ]
  }
];

const PricingPage = () => {
  const [tab, setTab] = useState<"windows" | "linux">("windows");

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
          <div className="flex justify-center mb-10">
            <Tabs value={tab} onValueChange={v => setTab(v as "windows" | "linux")}>
              <TabsList className="bg-gray-100 dark:bg-[#181927] p-1 rounded-lg w-fit gap-2">
                <TabsTrigger
                  value="windows"
                  className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white px-5 py-2 rounded-lg"
                >
                  <Window className="w-5 h-5" />
                  Windows
                </TabsTrigger>
                <TabsTrigger
                  value="linux"
                  className="flex items-center gap-2 data-[state=active]:bg-green-700 data-[state=active]:text-white px-5 py-2 rounded-lg"
                >
                  <Linux className="w-5 h-5" />
                  Linux
                </TabsTrigger>
              </TabsList>
              <TabsContent value="windows" className="w-full">
                <PricingSection plans={windowsPlans} showDetailedComparison={true} />
              </TabsContent>
              <TabsContent value="linux" className="w-full">
                <PricingSection plans={linuxPlans} showDetailedComparison={true} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <StatsBanner />
      <HomeFAQ />
      <Footer />
    </div>
  );
};

export default PricingPage;

