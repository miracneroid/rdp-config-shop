import React from "react";
import { Check, CalendarDays, UserRoundCog } from "lucide-react";

const FEATURE_BADGES = [
  {
    icon: <Check size={44} strokeWidth={1.6} className="mb-3 text-gray-900 dark:text-white" />,
    title: "Effortless Server Control",
    description: "Deploy, reboot & manage your RDP with a click — instantly."
  },
  {
    icon: <CalendarDays size={44} strokeWidth={1.6} className="mb-3 text-gray-900 dark:text-white" />,
    title: "Flexible Scheduling",
    description: "Automate backup, resource scaling, and billing cycles."
  },
  {
    icon: <UserRoundCog size={44} strokeWidth={1.6} className="mb-3 text-gray-900 dark:text-white" />,
    title: "Team Access",
    description: "Invite teammates, set permissions, collaborate securely."
  },
];

const ControlPanelSection = () => {
  return (
    <section className="relative w-full bg-white dark:bg-black py-12 sm:py-20 border-t border-b border-gray-100 dark:border-[#222] font-sans">
      <div className="w-full px-4 sm:px-8 md:px-16 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 sm:gap-10 mb-8 sm:mb-10 text-left">
          <div className="flex flex-col max-w-2xl">
            <h2 className="notion-heading-2 text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 text-black dark:text-white">
              Your workflow.<br />
              Your way.
            </h2>
            <p className="notion-paragraph max-w-lg mb-4 text-base sm:text-lg text-gray-600 dark:text-gray-300">
              All-in-one panel to manage, scale, or secure your workspace.<br className="hidden sm:inline" />
              Designed for maximum control and simplicity.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 lg:gap-20 items-start w-full lg:w-auto justify-center mt-3">
            {FEATURE_BADGES.map((f, idx) => (
              <div key={idx} className="flex flex-col items-center text-center w-full sm:w-[220px]">
                <div className="mb-1 flex items-center justify-center">
                  {f.icon}
                </div>
                <div className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-1">{f.title}</div>
                <div className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">{f.description}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center mt-8">
          <img
            src="/lovable-uploads/e3cb316d-065e-4164-9419-1cacf07d64f1.png"
            alt="RDP Control Panel"
            className="w-full rounded-2xl shadow-notion-lg border border-gray-200 dark:border-[#232323] bg-gray-50 dark:bg-[#222] animate-float"
            style={{ maxHeight: 700, objectFit: "cover" }}
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
};

export default ControlPanelSection;
