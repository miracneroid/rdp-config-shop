
import React from "react";
import { Badge } from "./ui/badge";
import { BadgeCheck, BadgeInfo, BadgeDollarSign } from "lucide-react";

const BADGES = [
  {
    icon: <BadgeCheck className="mr-1 h-4 w-4 text-blue-700" />,
    label: "All-in-One Dashboard",
    variant: "default" as const,
  },
  {
    icon: <BadgeInfo className="mr-1 h-4 w-4 text-blue-700" />,
    label: "Live Resource Adjustments",
    variant: "outline" as const,
  },
  {
    icon: <BadgeDollarSign className="mr-1 h-4 w-4 text-blue-700" />,
    label: "No Hidden Costs",
    variant: "secondary" as const,
  },
];

const ControlPanelSection = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <section className="relative w-full py-10 bg-white border-t border-b border-gray-100 font-sans">
        <div className="w-full px-4 sm:px-8 md:px-16 mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8 text-left">
            <div className="flex flex-col">
              <h2 className="notion-heading-2 text-5xl sm:text-6xl font-bold mb-2 text-black">
                Your workflow. <br />
                Your way.
              </h2>
              <p className="notion-paragraph max-w-lg mb-0 text-lg text-gray-600">
                All-in-one panel to manage, scale, or secure your workspace. Designed for maximum control and simplicity.
              </p>
            </div>
            {/* Badges (Right) */}
            <div className="flex gap-3 mt-1 flex-wrap">
              {BADGES.map((b, idx) => (
                <Badge
                  key={idx}
                  variant={b.variant}
                  className="flex items-center font-medium px-4 py-2 rounded-full shadow-sm border border-gray-200 bg-gray-50 text-gray-900"
                >
                  {b.icon}
                  {b.label}
                </Badge>
              ))}
            </div>
          </div>
          {/* Showcase Image */}
          <div className="w-full flex justify-center">
            <img
              src="/lovable-uploads/e3cb316d-065e-4164-9419-1cacf07d64f1.png"
              alt="RDP Control Panel"
              className="w-full rounded-2xl shadow-notion-lg border border-gray-200 bg-gray-50 animate-float"
              style={{ maxHeight: 550, objectFit: "cover" }}
              draggable={false}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ControlPanelSection;
