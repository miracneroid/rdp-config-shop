
import React from "react";
import {
  Monitor,
  SlidersHorizontal,
  Users,
  ShieldCheck,
  LayoutDashboard,
  Server,
  Network,
  BarChartHorizontal,
  HardDrive,
} from "lucide-react";

const FEATURES = [
  {
    icon: <Monitor className="h-9 w-9 text-blue-700" />,
    title: "Instant Access",
    description: "Connect to your RDP desktops and servers from anywhere, on any device.",
  },
  {
    icon: <SlidersHorizontal className="h-9 w-9 text-blue-700" />,
    title: "Custom Configurations",
    description: "Easily upgrade CPU, memory, or storage without downtime—make your workspace fit your needs.",
  },
  {
    icon: <Users className="h-9 w-9 text-blue-700" />,
    title: "Team Collaboration",
    description: "Manage multiple users with granular access controls and simple invites.",
  },
  {
    icon: <LayoutDashboard className="h-9 w-9 text-blue-700" />,
    title: "Unified Dashboard",
    description: "See all your RDP instances, health, and usage stats in one clear overview.",
  },
  {
    icon: <ShieldCheck className="h-9 w-9 text-blue-700" />,
    title: "Top-Tier Security",
    description: "Advanced encryption, DDoS protection, and activity logging keep your data safe.",
  },
  {
    icon: <Server className="h-9 w-9 text-blue-700" />,
    title: "Fast Deployments",
    description: "1-click deployments bring new Windows or Linux desktops online within minutes.",
  },
  {
    icon: <Network className="h-9 w-9 text-blue-700" />,
    title: "Reliable Networking",
    description: "High-speed connections and private networks for worry-free remote work.",
  },
  {
    icon: <BarChartHorizontal className="h-9 w-9 text-blue-700" />,
    title: "Usage Insights",
    description: "Visual dashboards let you monitor usage, billing, and performance trends.",
  },
];

const NotionFeatures = () => (
  <section className="bg-white py-16 w-full font-sans border-t border-b border-gray-100">
    <div className="notion-page-container max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="notion-heading-2 mb-3">
          Everything you need for the best RDP experience
        </h2>
        <p className="notion-paragraph max-w-3xl mx-auto">
          From deployment to security, our platform provides every feature for effortless and powerful RDP management.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 mt-12">
        {FEATURES.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-start px-4 py-6 rounded-lg hover:shadow-notion transition bg-white">
            {feature.icon}
            <h3 className="notion-heading-3 mt-4 mb-2">{feature.title}</h3>
            <p className="text-gray-500 text-base">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default NotionFeatures;
