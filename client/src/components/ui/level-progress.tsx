import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LEVEL_THRESHOLDS } from "@/lib/constants";
import { Trophy } from "lucide-react";

interface LevelProgressProps {
  level: number;
  xp: number;
  showDetails?: boolean;
  className?: string;
}

export function LevelProgress({ level, xp, showDetails = true, className }: LevelProgressProps) {
  const currentLevelThreshold = LEVEL_THRESHOLDS[level - 1] || 0;
  const nextLevelThreshold = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  
  const xpInCurrentLevel = xp - currentLevelThreshold;
  const xpNeededForNextLevel = nextLevelThreshold - currentLevelThreshold;
  const progressPercentage = Math.min((xpInCurrentLevel / xpNeededForNextLevel) * 100, 100);
  
  const isMaxLevel = level >= LEVEL_THRESHOLDS.length;

  return (
    <div className={cn("space-y-2", className)}>
      {showDetails && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium text-slate-900">Level {level}</span>
          </div>
          {!isMaxLevel && (
            <span className="text-sm text-slate-600">
              {xpInCurrentLevel.toLocaleString()} / {xpNeededForNextLevel.toLocaleString()} XP
            </span>
          )}
        </div>
      )}
      
      {!isMaxLevel ? (
        <Progress 
          value={progressPercentage} 
          className="h-3 bg-slate-200"
        />
      ) : (
        <div className="flex items-center justify-center p-2 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-lg">
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
            <Trophy className="h-3 w-3 mr-1" />
            Max Level Reached!
          </Badge>
        </div>
      )}
      
      {showDetails && !isMaxLevel && (
        <div className="text-xs text-slate-500">
          {(xpNeededForNextLevel - xpInCurrentLevel).toLocaleString()} XP to next level
        </div>
      )}
    </div>
  );
}
