import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/SimpleFooter";
import StatsBanner from "@/components/StatsBanner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Monitor, Lock, Cpu, Wifi } from "lucide-react";
import { useEffect } from 'react';

const Windows = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Monitor className="h-8 w-8 text-purple-500" />,
      title: "Remote Desktop Access",
      description: "Secure RDP access from anywhere in the world"
    },
    {
      icon: <Lock className="h-8 w-8 text-purple-500" />,
      title: "Enterprise Security",
      description: "Built-in Windows Defender and regular security updates"
    },
    {
      icon: <Cpu className="h-8 w-8 text-purple-500" />,
      title: "Dedicated Resources",
      description: "Guaranteed CPU, RAM, and storage allocation"
    },
    {
      icon: <Wifi className="h-8 w-8 text-purple-500" />,
      title: "High-Speed Network",
      description: "1Gbps network with unlimited bandwidth"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <div className="relative flex-grow container mx-auto px-4 py-12">
        <div className="absolute top-0 left-0 z-0 w-full h-48 bg-gradient-to-br from-purple-500/10 to-blue-500/5 dark:from-purple-800/20 dark:to-blue-700/10 rounded-b-3xl" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center mb-12 animate-slide-down">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Windows RDP Solutions</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Professional Windows Remote Desktop Services with dedicated resources and premium support
          </p>
        </div>

        <div className="relative z-10 grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="animate-on-scroll opacity-0 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow"
            >
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

        <div className="relative z-10 text-center animate-on-scroll opacity-0">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
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
