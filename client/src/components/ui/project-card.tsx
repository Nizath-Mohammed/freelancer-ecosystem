import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar";
import { cn } from "@/lib/utils";
import { Clock, MapPin, Star, TrendingUp } from "lucide-react";
import type { Project, User } from "@/lib/types";

interface ProjectCardProps {
  project: Project & {
    client?: User;
    matchPercentage?: number;
  };
  showMatchPercentage?: boolean;
  onViewDetails?: () => void;
  onSubmitProposal?: () => void;
  className?: string;
}

export function ProjectCard({ 
  project, 
  showMatchPercentage = false,
  onViewDetails,
  onSubmitProposal,
  className 
}: ProjectCardProps) {
  const getExperienceBadgeColor = (level: string) => {
    switch (level) {
      case 'entry':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-amber-100 text-amber-800';
      case 'expert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 border-green-600';
    if (percentage >= 75) return 'text-amber-600 border-amber-600';
    return 'text-slate-600 border-slate-600';
  };

  const formatBudget = (budget: string | null, budgetType: string) => {
    if (!budget) return 'Budget TBD';
    const amount = parseFloat(budget);
    const formatted = amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    
    return budgetType === 'hourly' ? `${formatted}/hr` : formatted;
  };

  return (
    <Card className={cn("hover:shadow-md transition-shadow cursor-pointer", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 mb-2 hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-slate-600 text-sm mb-3 line-clamp-2">
              {project.description}
            </p>
          </div>
          {showMatchPercentage && project.matchPercentage && (
            <Badge 
              variant="outline" 
              className={cn("ml-4", getMatchColor(project.matchPercentage))}
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              {project.matchPercentage}% match
            </Badge>
          )}
        </div>
        
        {project.skills && project.skills.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.skills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {project.skills.length > 4 && (
              <Badge variant="secondary" className="text-xs text-slate-500">
                +{project.skills.length - 4} more
              </Badge>
            )}
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4 text-sm text-slate-600">
            {project.duration && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{project.duration}</span>
              </div>
            )}
            {project.experienceLevel && (
              <Badge 
                variant="secondary" 
                className={cn("text-xs", getExperienceBadgeColor(project.experienceLevel))}
              >
                {project.experienceLevel.charAt(0).toUpperCase() + project.experienceLevel.slice(1)}
              </Badge>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-600 capitalize">{project.budgetType} Price</p>
            <p className="text-lg font-bold text-slate-900">
              {formatBudget(project.budget, project.budgetType)}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          {project.client && (
            <div className="flex items-center space-x-2">
              <UserAvatar user={project.client} size="sm" />
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {project.client.firstName} {project.client.lastName}
                </p>
                <div className="flex items-center text-xs text-slate-600">
                  <Star className="h-3 w-3 text-amber-400 mr-1" />
                  <span>4.8 (12 reviews)</span>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex space-x-2">
            {onViewDetails && (
              <Button variant="outline" size="sm" onClick={onViewDetails}>
                View Details
              </Button>
            )}
            {onSubmitProposal && (
              <Button size="sm" onClick={onSubmitProposal}>
                Submit Proposal
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
