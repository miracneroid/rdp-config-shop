
import { ServerIcon, ShieldCheck, Cpu, Globe, Clock, Zap } from 'lucide-react';

const features = [
  {
    name: 'High Performance',
    description: 'Powerful CPUs, fast SSD storage, and ample RAM for smooth multitasking.',
    icon: Cpu,
  },
  {
    name: 'Enterprise Security',
    description: 'Advanced security protocols to keep your remote desktop environment protected.',
    icon: ShieldCheck,
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
    icon: ServerIcon,
  },
];

const Features = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold uppercase tracking-wide text-rdp-blue">Features</h2>
          <p className="mt-2 text-3xl font-bold leading-8 tracking-tight text-rdp-dark dark:text-white sm:text-4xl">
            Enterprise-Grade RDP Solutions
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Our remote desktop environments are built for professionals who demand performance, 
            security, and reliability.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="rdp-card p-6 transform hover:scale-105 transition-all duration-300">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-rdp-blue/10 text-rdp-blue">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-medium leading-6 text-rdp-dark dark:text-white">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
