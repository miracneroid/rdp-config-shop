
import { Shield, Cpu, Zap, Server, Globe, Clock, MonitorPlay, ShieldCheck, Database, Layers, GitBranch } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    name: 'Remote Desktop',
    description: 'Full access Windows and Linux environments for remote work and development.',
    icon: MonitorPlay,
  },
  {
    name: 'Dedicated Servers',
    description: 'High-performance servers with dedicated resources for demanding workloads.',
    icon: Server,
  },
  {
    name: 'Secure Access',
    description: 'Enterprise-grade security with multi-factor authentication and encryption.',
    icon: ShieldCheck,
  },
  {
    name: 'Data Storage',
    description: 'Reliable and fast SSD storage with automatic backups and redundancy.',
    icon: Database,
  },
  {
    name: 'Custom Stacks',
    description: 'Pre-configured software stacks for development, design, and data science.',
    icon: Layers,
  },
  {
    name: 'DevOps Tools',
    description: 'Integrated CI/CD pipelines and development tools for efficient workflows.',
    icon: GitBranch,
  },
];

const NotionFeatures = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="notion-page-container">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-2 text-black border-black">Solutions</Badge>
          <h2 className="text-[40px] font-bold leading-[1.2] tracking-[-0.02em] text-[#1e2537] mb-4">
            Enterprise-Grade RDP Solutions
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Our remote desktop environments are built for professionals who demand 
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mx-1">
              performance, security, and reliability
            </span>
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div 
              key={feature.name} 
              className="notion-card group p-8 rounded-xl border border-gray-100 hover:border-blue-500/20 
                        transition-all duration-300 hover:-translate-y-1 hover:shadow-lg 
                        hover:shadow-blue-500/5 bg-white"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl 
                            bg-gradient-to-br from-blue-50 to-blue-100/80 mb-6 
                            group-hover:from-blue-500 group-hover:to-blue-600 
                            group-hover:text-white transition-all duration-300">
                <feature.icon className="h-6 w-6 text-blue-500 group-hover:text-white" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1e2537] group-hover:text-blue-500 transition-colors">
                {feature.name}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotionFeatures;
