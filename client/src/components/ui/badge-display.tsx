import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Star, 
  Code, 
  Brain, 
  Trophy, 
  Award, 
  Target,
  CheckCircle,
  Medal,
  Crown,
  Zap
} from "lucide-react";

interface BadgeDisplayProps {
  badges?: Array<{
    id: number;
    name: string;
    description: string | null;
    icon: string | null;
    category: 'project' | 'skill' | 'review' | 'qa' | 'special';
    xpReward: number | null;
    earnedAt: Date | null;
  }>;
  showDescription?: boolean;
  variant?: "default" | "compact" | "detailed";
  className?: string;
}

const getBadgeIcon = (iconName: string | null, category: string) => {
  switch (iconName) {
    case "star":
      return Star;
    case "code":
      return Code;
    case "brain":
      return Brain;
    case "trophy":
      return Trophy;
    case "award":
      return Award;
    case "target":
      return Target;
    case "check":
      return CheckCircle;
    case "medal":
      return Medal;
    case "crown":
      return Crown;
    case "zap":
      return Zap;
    default:
      // Default icons by category
      switch (category) {
        case "project":
          return Trophy;
        case "skill":
          return Code;
        case "review":
          return Star;
        case "qa":
          return Brain;
        case "special":
          return Crown;
        default:
          return Award;
      }
  }
};

const getBadgeColor = (category: string) => {
  switch (category) {
    case "project":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "skill":
      return "bg-green-100 text-green-800 border-green-200";
    case "review":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "qa":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "special":
      return "bg-pink-100 text-pink-800 border-pink-200";
    default:
      return "bg-slate-100 text-slate-800 border-slate-200";
  }
};

export function BadgeDisplay({ 
  badges = [], 
  showDescription = false, 
  variant = "default",
  className 
}: BadgeDisplayProps) {
  if (!badges.length) {
    return (
      <div className={cn("text-center py-4", className)}>
        <p className="text-sm text-slate-500">No badges earned yet</p>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex flex-wrap gap-1", className)}>
        {badges.slice(0, 3).map((badge) => {
          const IconComponent = getBadgeIcon(badge.icon, badge.category);
          return (
            <div
              key={badge.id}
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full",
                getBadgeColor(badge.category)
              )}
              title={badge.name}
            >
              <IconComponent className="h-4 w-4" />
            </div>
          );
        })}
        {badges.length > 3 && (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 text-xs">
            +{badges.length - 3}
          </div>
        )}
      </div>
    );
  }

  if (variant === "detailed") {
    return (
      <div className={cn("space-y-3", className)}>
        {badges.map((badge) => {
          const IconComponent = getBadgeIcon(badge.icon, badge.category);
          return (
            <div
              key={badge.id}
              className="flex items-center space-x-3 p-3 bg-white border rounded-lg shadow-sm"
            >
              <div className={cn(
                "flex items-center justify-center w-12 h-12 rounded-full",
                getBadgeColor(badge.category)
              )}>
                <IconComponent className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-slate-900">{badge.name}</h4>
                {badge.description && (
                  <p className="text-sm text-slate-600">{badge.description}</p>
                )}
                {badge.earnedAt && (
                  <p className="text-xs text-slate-500">
                    Earned {new Date(badge.earnedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              {badge.xpReward && (
                <Badge variant="outline" className="text-amber-600 border-amber-600">
                  +{badge.xpReward} XP
                </Badge>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {badges.map((badge) => {
        const IconComponent = getBadgeIcon(badge.icon, badge.category);
        return (
          <Badge
            key={badge.id}
            variant="secondary"
            className={cn(
              "flex items-center space-x-1 px-3 py-1",
              getBadgeColor(badge.category)
            )}
          >
            <IconComponent className="h-3 w-3" />
            <span>{badge.name}</span>
          </Badge>
        );
      })}
    </div>
  );
}
