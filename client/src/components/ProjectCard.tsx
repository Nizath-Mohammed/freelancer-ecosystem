import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Clock, 
  Signal, 
  Star, 
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Eye
} from "lucide-react";
import { Link } from "wouter";
import { Project } from "@shared/schema";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  showActions?: boolean;
  variant?: "default" | "compact";
}

export default function ProjectCard({ project, showActions = true, variant = "default" }: ProjectCardProps) {
  const isCompact = variant === "compact";
  
  const getMatchScore = () => {
    // Mock AI matching score - in real app this would come from API
    return Math.floor(Math.random() * 20) + 80; // 80-99%
  };

  const getMatchColor = (score: number) => {
    if (score >= 95) return "text-green-600 bg-green-100";
    if (score >= 90) return "text-blue-600 bg-blue-100";
    if (score >= 85) return "text-amber-600 bg-amber-100";
    return "text-slate-600 bg-slate-100";
  };

  const matchScore = getMatchScore();
  const matchColorClass = getMatchColor(matchScore);

  return (
    <Card className="enterprise-card cursor-pointer">
      <CardContent className={cn("p-6", isCompact && "p-4")}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <Link href={`/projects/${project.id}`}>
              <h3 className={cn(
                "font-semibold text-conectify-secondary mb-2 hover:text-conectify-primary transition-colors line-clamp-2",
                isCompact ? "text-base" : "text-lg"
              )}>
                {project.title}
              </h3>
            </Link>
            <p className={cn(
              "text-slate-600 line-clamp-3",
              isCompact ? "text-sm" : "text-base"
            )}>
              {project.description}
            </p>
          </div>
          <div className={cn("flex items-center text-xs px-2 py-1 rounded-full ml-4", matchColorClass)}>
            <div className="w-2 h-2 rounded-full mr-1" style={{backgroundColor: 'currentColor'}}></div>
            {matchScore}% match
          </div>
        </div>
        
        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills?.slice(0, 4).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {project.skills && project.skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.skills.length - 4} more
            </Badge>
          )}
        </div>

        {/* Project Details */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4 text-sm text-slate-600">
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{project.duration || "Not specified"}</span>
            </div>
            <div className="flex items-center">
              <Signal className="mr-1 h-4 w-4" />
              <span className="capitalize">{project.experienceLevel}</span>
            </div>
            {project.proposalCount > 0 && (
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                <span>{project.proposalCount} proposals</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-600 capitalize">{project.budgetType} price</p>
            <p className="text-lg font-bold text-slate-900">
              {project.budgetType === 'hourly' ? `$${project.budget}/hr` : `$${project.budget}`}
            </p>
          </div>
        </div>

        {/* Client Info & Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="text-xs">
                CL
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-slate-900">Client</p>
              <div className="flex items-center">
                <Star className="text-amber-400 h-3 w-3 mr-1" />
                <span className="text-xs text-slate-600">4.8 (12 reviews)</span>
              </div>
            </div>
          </div>
          {showActions && (
            <div className="flex items-center space-x-2">
              {!isCompact && (
                <Button variant="outline" size="sm">
                  <Eye className="mr-1 h-4 w-4" />
                  View
                </Button>
              )}
              <Button size="sm">
                Submit Proposal
              </Button>
            </div>
          )}
        </div>

        {/* Status for user's own projects */}
        {project.status !== 'open' && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <Badge 
              variant={project.status === 'completed' ? 'default' : 'secondary'}
              className={
                project.status === 'completed' ? 'bg-green-100 text-green-800' :
                project.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                'bg-slate-100 text-slate-800'
              }
            >
              {project.status === 'in_progress' ? 'In Progress' : 
               project.status === 'completed' ? 'Completed' : 
               project.status}
            </Badge>
            <div className="flex justify-between items-center mt-2 text-sm text-slate-600">
              <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
              <span>Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
