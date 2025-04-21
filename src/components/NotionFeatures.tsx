
import React from 'react';
import { Server, Key, ShieldCheck, Users, Cloud, Terminal, Settings, Lock } from 'lucide-react';

const featureList = [
  {
    name: 'Instant Setup',
    description: 'Spin up your RDP server in seconds with automatic provisioning.',
    icon: Server,
  },
  {
    name: 'Full Admin Access',
    description: 'Get unrestricted administrator access for true control.',
    icon: Key,
  },
  {
    name: 'DDoS Protection',
    description: 'Proactive security keeps your sessions shielded and reliable.',
    icon: ShieldCheck,
  },
  {
    name: 'Multiple OS Options',
    description: 'Deploy Windows or Linux — your choice, every time.',
    icon: Terminal,
  },
  {
    name: 'Global Locations',
    description: 'Low latency RDP from worldwide datacenter options.',
    icon: Cloud,
  },
  {
    name: '24/7 Support',
    description: 'Reach our expert support team any time, day or night.',
    icon: Users,
  },
  {
    name: 'Easy Management',
    description: 'Simple control panel for fast reboots, rebuilds, and upgrades.',
    icon: Settings,
  },
  {
    name: 'Secure Connections',
    description: 'All data is encrypted using strong protection protocols.',
    icon: Lock,
  },
];

const NotionFeatures = () => {
  return (
    <section className="w-full border-t border-gray-200 bg-white py-14 sm:py-20">
      <div className="w-full px-2 sm:px-10">
        <h2 className="text-4xl sm:text-[44px] md:text-[52px] font-bold text-black leading-tight mb-14 mt-2" style={{ letterSpacing: "-0.03em" }}>
          Everything you need<br className="hidden sm:block" />
          for the best RDP experience.
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 w-full">
          {featureList.map(({ name, icon: Icon, description }) => (
            <div key={name} className="flex flex-col items-start group">
              <Icon className="h-14 w-14 mb-4 text-black" strokeWidth={1.6} />
              <div>
                <h3 className="font-semibold text-lg md:text-xl text-black flex items-center gap-1 mb-1 group-hover:underline group-hover:underline-offset-4 transition">
                  {name} <span aria-hidden>→</span>
                </h3>
                <p className="text-base text-gray-600">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NotionFeatures;
