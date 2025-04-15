
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MonitorPlay, Server, ShieldCheck, Database, Layers, GitBranch } from "lucide-react";

const ServiceOfferings = () => {
  const services = [
    {
      icon: MonitorPlay,
      title: "Remote Desktop",
      description: "Full access Windows and Linux environments for remote work and development.",
      color: "blue"
    },
    {
      icon: Server,
      title: "Dedicated Servers",
      description: "High-performance servers with dedicated resources for demanding workloads.",
      color: "purple"
    },
    {
      icon: ShieldCheck,
      title: "Secure Access",
      description: "Enterprise-grade security with multi-factor authentication and encryption.",
      color: "green"
    },
    {
      icon: Database,
      title: "Data Storage",
      description: "Reliable and fast SSD storage with automatic backups and redundancy.",
      color: "amber"
    },
    {
      icon: Layers,
      title: "Custom Stacks",
      description: "Pre-configured software stacks for development, design, and data science.",
      color: "indigo"
    },
    {
      icon: GitBranch,
      title: "DevOps Tools",
      description: "Integrated CI/CD pipelines and development tools for efficient workflows.",
      color: "rose"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-2 text-rdp-blue border-rdp-blue">Services</Badge>
          <h2 className="text-3xl font-bold text-rdp-dark dark:text-white">Complete RDP Solutions</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From basic remote access to complex development environments, we have everything you need.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => {
            const ColorIcon = service.icon;
            const colorClasses = {
              blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600",
              purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600",
              green: "bg-green-100 dark:bg-green-900/30 text-green-600",
              amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-600",
              indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600",
              rose: "bg-rose-100 dark:bg-rose-900/30 text-rose-600"
            };
            
            return (
              <div 
                key={index}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all p-6"
              >
                <div className={`w-12 h-12 ${colorClasses[service.color as keyof typeof colorClasses]} flex items-center justify-center rounded-lg mb-4`}>
                  <ColorIcon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-rdp-dark dark:text-white mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{service.description}</p>
                <Link to="/configure" className="text-rdp-blue hover:text-rdp-blue-light font-medium">
                  Learn more →
                </Link>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/configure">
            <Button size="lg" className="bg-rdp-blue hover:bg-rdp-blue-light">
              Configure Custom Solution
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceOfferings;
