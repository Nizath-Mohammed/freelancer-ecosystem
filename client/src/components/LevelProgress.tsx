import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Crown, Star, Zap } from "lucide-react";

interface LevelProgressProps {
  currentLevel: number;
  experience: number;
  nextLevelRequirement: number;
  className?: string;
}

export default function LevelProgress({ 
  currentLevel, 
  experience, 
  nextLevelRequirement,
  className 
}: LevelProgressProps) {
  const progressPercentage = ((experience % 1000) / 1000) * 100;
  const experienceToNext = nextLevelRequirement - experience;

  const getLevelTier = (level: number) => {
    if (level >= 50) return { name: "Legend", color: "text-purple-600", icon: Crown };
    if (level >= 25) return { name: "Expert", color: "text-amber-600", icon: Star };
    if (level >= 10) return { name: "Pro", color: "text-blue-600", icon: Zap };
    return { name: "Rising", color: "text-green-600", icon: Zap };
  };

  const tier = getLevelTier(currentLevel);
  const TierIcon = tier.icon;

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TierIcon className={`h-6 w-6 ${tier.color}`} />
            <span>Level Progress</span>
          </div>
          <Badge variant="outline" className={`${tier.color} border-current`}>
            {tier.name} Level {currentLevel}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Experience</span>
          <span className="font-medium">
            {experience} / {nextLevelRequirement} XP
          </span>
        </div>
        
        <Progress value={progressPercentage} className="h-3" />
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-600">
            {experienceToNext} XP to next level
          </span>
          <span className={`font-semibold ${tier.color}`}>
            {Math.round(progressPercentage)}% complete
          </span>
        </div>

        {/* Level Benefits */}
        <div className="mt-6 p-4 bg-slate-50 rounded-lg">
          <h4 className="font-semibold text-slate-900 mb-2">Level {currentLevel + 1} Benefits</h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>• Reduced commission rates</li>
            <li>• Priority project matching</li>
            <li>• Exclusive networking events</li>
            {currentLevel >= 10 && <li>• Premium Q&A features</li>}
            {currentLevel >= 25 && <li>• Expert badge visibility</li>}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
