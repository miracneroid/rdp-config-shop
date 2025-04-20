import { Shield, Cpu, Zap, Server, Globe, Clock } from 'lucide-react';

const features = [
  {
    name: 'High Performance',
    description: 'Powerful CPUs, fast SSD storage, and ample RAM for smooth multitasking.',
    icon: Cpu,
  },
  {
    name: 'Enterprise Security',
    description: 'Advanced security protocols to keep your remote desktop environment protected.',
    icon: Shield,
  },
  {
    name: 'Global Deployment',
    description: 'Choose from data centers around the world for optimal latency and performance.',
    icon: Globe,
  },
  {
    name: 'Instant Setup',
    description: 'Your configured RDP environment is ready within minutes, not hours or days.',
    icon: Clock,
  },
  {
    name: 'Optimized Performance',
    description: 'Tuned for the best possible remote desktop experience, even over lower bandwidth.',
    icon: Zap,
  },
  {
    name: 'Reliable Infrastructure',
    description: '99.9% uptime guarantee with redundant systems and regular backups.',
    icon: Server,
  },
];

const NotionFeatures = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="notion-page-container">
        <div className="text-center mb-16">
          <h2 className="notion-heading-2">Enterprise-Grade RDP Solutions</h2>
          <p className="notion-paragraph max-w-2xl mx-auto">
            Our remote desktop environments are built for professionals who demand performance, 
            security, and reliability.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="notion-card group hover:-translate-y-1 transition-all duration-300">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gray-100 mb-5 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#1e2537]">{feature.name}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotionFeatures;
