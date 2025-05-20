
import React from "react";
import { Info, Check } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PlanFeature {
  name: string;
  tooltip: string;
}

interface Plan {
  name: string;
  icon: string;
  price: string;
  iconColor: string;
}

interface PlanComparisonTableProps {
  plans: Plan[];
  features: PlanFeature[];
  featureAvailability: Record<string, boolean[]>;
}

const PlanComparisonTable: React.FC<PlanComparisonTableProps> = ({ 
  plans, 
  features,
  featureAvailability 
}) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Headers for each plan */}
      <div className="col-span-1"></div> {/* Empty space for features column */}
      {plans.map((plan, index) => (
        <div key={index} className="p-3 flex flex-col items-center">
          {/* Plan icon */}
          <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-${plan.iconColor}`}>
            {index === 0 && <div className={`bg-${plan.iconColor} rounded-full w-10 h-10`}></div>}
            {index === 1 && <div className={`bg-${plan.iconColor} rounded-md w-10 h-10`}></div>}
            {index === 2 && <div className={`bg-${plan.iconColor} rounded-md w-10 h-10`}></div>}
          </div>
          
          {/* Plan name */}
          <h3 className="text-lg font-bold mt-2">{plan.name}</h3>
          
          {/* Plan price */}
          <div className="mt-2">
            <span className="text-2xl font-bold">{plan.price}</span>
            {plan.price !== "Free" && <span className="text-sm text-gray-400">/ month</span>}
          </div>
        </div>
      ))}
      
      {/* Feature rows */}
      {features.map((feature, idx) => (
        <React.Fragment key={idx}>
          <div className="col-span-1 flex items-center text-sm py-3 border-t border-[#222233]">
            <div className="flex items-center">
              <span className="text-gray-300">{feature.name}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={14} className="ml-2 text-gray-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{feature.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {/* Check for each plan */}
          {plans.map((plan, planIdx) => {
            const planName = plan.name as keyof typeof featureAvailability;
            const isAvailable = featureAvailability[planName][idx];
            
            return (
              <div 
                key={`${idx}-${planIdx}`} 
                className="col-span-1 flex justify-center items-center py-3 border-t border-[#222233]"
              >
                {isAvailable ? (
                  <Check className="h-5 w-5 text-white" />
                ) : null}
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PlanComparisonTable;
