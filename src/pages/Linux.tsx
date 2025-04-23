
import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/SimpleFooter";
import StatsBanner from "@/components/StatsBanner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Server, Shield, Zap, Clock } from "lucide-react";

const Linux = () => {
  const features = [
    {
      icon: <Server className="h-8 w-8 text-purple-500" />,
      title: "High Performance VPS",
      description: "Enterprise-grade hardware with NVMe SSDs and latest-gen processors"
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-500" />,
      title: "Advanced Security",
      description: "DDoS protection, firewall, and regular security updates included"
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-500" />,
      title: "99.9% Uptime",
      description: "Guaranteed uptime with redundant infrastructure"
    },
    {
      icon: <Clock className="h-8 w-8 text-purple-500" />,
      title: "24/7 Support",
      description: "Round-the-clock technical support and monitoring"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <div className="relative flex-grow container mx-auto px-4 py-12">
        {/* Purple gradient background */}
        <div className="absolute top-0 left-0 z-0 w-full h-48 bg-gradient-to-br from-purple-500/10 to-blue-500/5 dark:from-purple-800/20 dark:to-blue-700/10 rounded-b-3xl" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Linux VPS Hosting</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            High-performance Linux Virtual Private Servers with guaranteed resources and full root access
          </p>
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="mr-4">{feature.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="relative z-10 text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            onClick={() => window.location.href = '/configure'}
          >
            Configure Your VPS
          </Button>
        </div>
      </div>
      <StatsBanner />
      <SimpleFooter />
    </div>
  );
};

export default Linux;
