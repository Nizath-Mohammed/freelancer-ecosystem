import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, CheckCircle } from 'lucide-react';

interface FreelancerCardProps {
  freelancer: {
    id: string;
    name: string;
    title: string;
    avatar: string;
    hourlyRate: number;
    rating: number;
    totalJobs: number;
    successRate: number;
    location: string;
    skills: string[];
    verified: boolean;
    availability: string;
    level: string;
    description: string;
    badges: string[];
  };
  variant?: 'default' | 'preview';
}

export const FreelancerCard = ({ freelancer, variant = 'default' }: FreelancerCardProps) => {
  return (
    <Card className="p-6 hover-lift bg-card/80 backdrop-blur-sm">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <img
            src={freelancer.avatar}
            alt={freelancer.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {freelancer.verified && (
            <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-primary bg-background rounded-full" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
            {freelancer.name}
          </h3>
          <p className="text-muted-foreground mb-2 text-sm line-clamp-1">
            {freelancer.title}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-current text-warning" />
              <span className="font-medium text-foreground">{freelancer.rating}</span>
              <span>({freelancer.totalJobs} jobs)</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{freelancer.location}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm mb-3">
            <span className="font-medium text-foreground">${freelancer.hourlyRate}/hr</span>
            <span className="text-muted-foreground">•</span>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="text-muted-foreground">{freelancer.availability}</span>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {freelancer.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {freelancer.skills.slice(0, variant === 'preview' ? 4 : 6).map((skill, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {skill}
          </Badge>
        ))}
        {freelancer.skills.length > (variant === 'preview' ? 4 : 6) && (
          <Badge variant="secondary" className="text-xs">
            +{freelancer.skills.length - (variant === 'preview' ? 4 : 6)} more
          </Badge>
        )}
      </div>
      
      <div className="flex flex-wrap gap-1 mb-4">
        {freelancer.badges.map((badge, index) => (
          <Badge key={index} className="text-xs bg-primary/10 text-primary hover:bg-primary/20">
            {badge}
          </Badge>
        ))}
      </div>
      
      <div className="flex gap-2">
        <Button className="flex-1">
          View Profile
        </Button>
        <Button variant="outline">
          Message
        </Button>
      </div>
    </Card>
  );
};