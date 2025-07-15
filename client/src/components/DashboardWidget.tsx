import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardWidgetProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export default function DashboardWidget({
  title,
  value,
  icon: Icon,
  color = "text-primary",
  subtitle,
  trend,
  className
}: DashboardWidgetProps) {
  return (
    <Card className={cn("enterprise-card", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm text-conectify-neutral mb-1">{title}</p>
            <p className="text-2xl font-bold text-conectify-secondary">{value}</p>
            {subtitle && (
              <p className="text-xs text-conectify-neutral/70 mt-1">{subtitle}</p>
            )}
            {trend && (
              <div className={cn(
                "flex items-center mt-2 text-xs",
                trend.isPositive ? "text-conectify-success" : "text-conectify-error"
              )}>
                <span className="mr-1">
                  {trend.isPositive ? "↗" : "↘"}
                </span>
                <span>{Math.abs(trend.value)}% from last month</span>
              </div>
            )}
          </div>
          <div className={cn("h-8 w-8", color)}>
            <Icon className="h-8 w-8" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
