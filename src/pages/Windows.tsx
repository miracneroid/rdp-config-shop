
import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/SimpleFooter";
import StatsBanner from "@/components/StatsBanner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Monitor, Lock, Cpu, Wifi } from "lucide-react";

const Windows = () => {
  const features = [
    {
      icon: <Monitor className="h-8 w-8 text-blue-500" />,
      title: "Remote Desktop Access",
      description: "Secure RDP access from anywhere in the world"
    },
    {
      icon: <Lock className="h-8 w-8 text-blue-500" />,
      title: "Enterprise Security",
      description: "Built-in Windows Defender and regular security updates"
    },
    {
      icon: <Cpu className="h-8 w-8 text-blue-500" />,
      title: "Dedicated Resources",
      description: "Guaranteed CPU, RAM, and storage allocation"
    },
    {
      icon: <Wifi className="h-8 w-8 text-blue-500" />,
      title: "High-Speed Network",
      description: "1Gbps network with unlimited bandwidth"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Windows RDP Solutions</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Professional Windows Remote Desktop Services with dedicated resources and premium support
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-200 dark:border-gray-700">
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

        <div className="text-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => window.location.href = '/configure'}
          >
            Configure Your RDP
          </Button>
        </div>
      </div>
      <StatsBanner />
      <SimpleFooter />
    </div>
  );
};

export default Windows;
