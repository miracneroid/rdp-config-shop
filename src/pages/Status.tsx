
import Navbar from "@/components/Navbar";
import SimpleFooter from "@/components/SimpleFooter";
import StatsBanner from "@/components/StatsBanner";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertCircle } from "lucide-react";

const Status = () => {
  const services = [
    {
      name: "RDP Services",
      status: "operational",
      uptime: "99.99%",
      lastIncident: "None"
    },
    {
      name: "API Endpoints",
      status: "operational",
      uptime: "99.95%",
      lastIncident: "2 days ago"
    },
    {
      name: "Dashboard",
      status: "operational",
      uptime: "100%",
      lastIncident: "None"
    },
    {
      name: "Billing System",
      status: "operational",
      uptime: "99.99%",
      lastIncident: "None"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <div className="relative flex-grow container mx-auto px-4 py-12">
        {/* Purple gradient background */}
        <div className="absolute top-0 left-0 z-0 w-full h-48 bg-gradient-to-br from-purple-500/10 to-blue-500/5 dark:from-purple-800/20 dark:to-blue-700/10 rounded-b-3xl" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Service Status</h1>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/60 rounded-full">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="text-green-600 dark:text-green-400 font-medium">All Systems Operational</span>
            </div>
          </div>

          <div className="grid gap-6">
            {services.map((service, index) => (
              <Card key={index} className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">{service.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Last incident: {service.lastIncident}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        {service.status === "operational" ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        ) : (
                          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                        )}
                        <span className="font-medium text-gray-900 dark:text-white capitalize">{service.status}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Uptime: {service.uptime}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <StatsBanner />
      <SimpleFooter />
    </div>
  );
};

export default Status;
