
import React from "react";
import {
  Monitor,
  SlidersHorizontal,
  Users,
  ShieldCheck,
  Layout,
  Server,
  Network,
  BarChartHorizontal,
} from "lucide-react";

const FEATURES = [
  {
    icon: Monitor,
    title: "Instant Access",
    description: "Connect to your RDP desktops and servers from anywhere, on any device.",
  },
  {
    icon: SlidersHorizontal,
    title: "Custom Configurations",
    description: "Easily upgrade CPU, memory, or storage without downtime—make your workspace fit your needs.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Manage multiple users with granular access controls and simple invites.",
  },
  {
    icon: Layout,
    title: "Unified Dashboard",
    description: "See all your RDP instances, health, and usage stats in one clear overview.",
  },
  {
    icon: ShieldCheck,
    title: "Top-Tier Security",
    description: "Advanced encryption, DDoS protection, and activity logging keep your data safe.",
  },
  {
    icon: Server,
    title: "Fast Deployments",
    description: "1-click deployments bring new Windows or Linux desktops online within minutes.",
  },
  {
    icon: Network,
    title: "Reliable Networking",
    description: "High-speed connections and private networks for worry-free remote work.",
  },
  {
    icon: BarChartHorizontal,
    title: "Usage Insights",
    description: "Visual dashboards let you monitor usage, billing, and performance trends.",
  },
];

const NotionFeatures = () => (
  <section className="bg-white dark:bg-black py-16 w-full font-sans border-t border-b border-gray-100 dark:border-[#222]">
    <div className="w-full px-4 sm:px-8 md:px-16 mx-auto">
      <div className="text-center mb-12">
        <h2 className="notion-heading-2 mb-3">
          Everything you need for the best RDP experience
        </h2>
        <p className="notion-paragraph max-w-3xl mx-auto">
          From deployment to security, our platform provides every feature for effortless and powerful RDP management.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7 mt-12">
        {FEATURES.map((feature, idx) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={idx}
              className={`
                flex flex-col items-center px-5 py-8 rounded-2xl
                border border-gray-200 dark:border-[#232323] bg-white dark:bg-[#18181a] shadow-md
                hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-400 transition-all duration-300 ease-in-out
                hover:scale-[1.02] cursor-pointer
              `}
              style={{ minHeight: '270px' }}
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-50 dark:bg-[#232a46] shadow-sm mb-3">
                <IconComponent className="h-8 w-8 text-blue-700 dark:text-white" aria-hidden="true" />
              </div>
              <h3 className="notion-heading-3 text-center mt-2 mb-2">{feature.title}</h3>
              <p className="text-gray-500 dark:text-gray-300 text-base text-center">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default NotionFeatures;

