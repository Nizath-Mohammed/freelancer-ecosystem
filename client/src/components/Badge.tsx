import { cn } from "@/lib/utils";
import { 
  Award, 
  Star, 
  Code, 
  Brain, 
  Trophy, 
  Shield,
  Target,
  Zap,
  Crown,
  Medal
} from "lucide-react";

interface BadgeProps {
  type: "skill" | "achievement" | "level" | "review" | "qa";
  name?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "earned" | "locked";
  className?: string;
}

const badgeIcons = {
  skill: Code,
  achievement: Trophy,
  level: Crown,
  review: Star,
  qa: Brain,
};

const badgeColors = {
  skill: "bg-blue-100 text-blue-600",
  achievement: "bg-amber-100 text-amber-600", 
  level: "bg-purple-100 text-purple-600",
  review: "bg-green-100 text-green-600",
  qa: "bg-indigo-100 text-indigo-600",
};

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12", 
  lg: "w-16 h-16",
};

const iconSizes = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
};

export default function BadgeComponent({ 
  type, 
  name, 
  size = "md", 
  variant = "earned",
  className 
}: BadgeProps) {
  const Icon = badgeIcons[type];
  const colorClass = variant === "locked" ? "bg-slate-100 text-slate-400" : badgeColors[type];
  
  return (
    <div className={cn("flex flex-col items-center space-y-2", className)}>
      <div className={cn(
        "rounded-full flex items-center justify-center transition-all",
        sizeClasses[size],
        colorClass,
        variant === "earned" && "shadow-sm hover:shadow-md",
        variant === "locked" && "opacity-50"
      )}>
        <Icon className={iconSizes[size]} />
      </div>
      {name && (
        <span className={cn(
          "text-center font-medium",
          size === "sm" ? "text-xs" : "text-sm",
          variant === "locked" ? "text-slate-400" : "text-slate-700"
        )}>
          {name}
        </span>
      )}
    </div>
  );
}
