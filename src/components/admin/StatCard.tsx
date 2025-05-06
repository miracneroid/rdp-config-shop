
import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  change?: number;
  trend?: "up" | "down" | "neutral";
}

const StatCard = ({ 
  title, 
  value, 
  description, 
  icon: Icon,
  iconColor = "text-rdp-blue dark:text-rdp-blue-light",
  change,
  trend
}: StatCardProps) => {
  return (
    <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center text-foreground">
          {Icon && <Icon className={`h-5 w-5 ${iconColor} mr-2`} />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {(description || change !== undefined) && (
          <div className="flex justify-between items-center mt-1">
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
            {change !== undefined && (
              <div className={`text-xs font-medium flex items-center ${
                trend === "up" ? "text-green-500" : 
                trend === "down" ? "text-red-500" : 
                "text-gray-500"
              }`}>
                {trend === "up" && "↑ "}
                {trend === "down" && "↓ "}
                {change}%
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;
