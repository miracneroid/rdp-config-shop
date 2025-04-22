
import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/SimpleFooter";
import StatsBanner from "@/components/StatsBanner";
import { Button } from "@/components/ui/button";
import { Code2, Wand2, Lock, Zap } from "lucide-react";

const Api = () => {
  const features = [
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "RESTful API",
      description: "Modern REST API with JSON responses"
    },
    {
      icon: <Wand2 className="h-6 w-6" />,
      title: "Easy Integration",
      description: "Comprehensive SDK and libraries"
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Secure Access",
      description: "OAuth 2.0 and API key authentication"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Updates",
      description: "WebSocket support for live data"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">API Documentation</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Integrate our RDP services into your applications with our powerful API
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="mr-4 p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center space-x-4">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.location.href = '/docs'}
            >
              View Documentation
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.location.href = '/register'}
            >
              Get API Key
            </Button>
          </div>
        </div>
      </div>
      <StatsBanner />
      <SimpleFooter />
    </div>
  );
};

export default Api;
