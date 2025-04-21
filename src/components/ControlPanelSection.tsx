
import React from "react";
import { SlidersHorizontal, Server, ShieldCheck, LayoutDashboard } from "lucide-react";

const FEATURES = [
  {
    icon: <LayoutDashboard className="h-8 w-8 text-blue-700" />,
    title: "One-Click Control",
    description: "Manage all your cloud desktops and servers in a simple, unified dashboard.",
  },
  {
    icon: <SlidersHorizontal className="h-8 w-8 text-blue-700" />,
    title: "Real-Time Adjustments",
    description: "Scale CPU, RAM, and storage instantly with live resource controls.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-blue-700" />,
    title: "Maximum Security",
    description: "Enterprise encryption & access logs keep your workspace ultra-secure.",
  },
  {
    icon: <Server className="h-8 w-8 text-blue-700" />,
    title: "Instant Deployments",
    description: "Spin up new RDP instances and manage users, backups, and networks fast.",
  },
];

const ControlPanelSection = () => {
  return (
    <section className="bg-white py-16 font-sans border-t border-b border-gray-100">
      <div className="notion-page-container max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Text content */}
          <div className="max-w-xl w-full">
            <h2 className="notion-heading-2 mb-4">
              Your Powerful Control Panel
            </h2>
            <p className="notion-paragraph mb-8">
              Seamlessly control every aspect of your RDP workspace. Whether you’re deploying new servers, managing users, or scaling resources, our panel gives you effortless control—all in a beautiful, intuitive interface.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div>{feature.icon}</div>
                  <div>
                    <h4 className="font-semibold text-lg text-black mb-1">{feature.title}</h4>
                    <p className="text-gray-500 text-base leading-snug">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Illustration */}
          <div className="flex-1 flex items-center justify-center w-full max-w-2xl">
            <img
              src="/lovable-uploads/e3cb316d-065e-4164-9419-1cacf07d64f1.png"
              alt="RDP Control Panel"
              className="w-full rounded-xl shadow-notion-lg border border-gray-200 bg-gray-50 animate-float"
              style={{ maxHeight: 475, objectFit: "cover" }}
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ControlPanelSection;

