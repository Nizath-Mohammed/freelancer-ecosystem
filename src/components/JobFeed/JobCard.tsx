
import { useState } from 'react';
import { Heart, Share2, MessageCircle, Clock, DollarSign, User, MapPin, Star, Bookmark, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    description: string;
    budget: {
      min: number;
      max: number;
      type: 'fixed' | 'hourly';
    };
    skills: string[];
    client: {
      name: string;
      avatar: string;
      rating: number;
      location: string;
      verified: boolean;
    };
    postedAt: string;
    proposals: number;
    views: number;
    saves: number;
    isTrending?: boolean;
    isFeatured?: boolean;
    urgency?: 'low' | 'medium' | 'high';
  };
  onSave?: (jobId: string) => void;
  onShare?: (jobId: string) => void;
  onApply?: (jobId: string) => void;
}

export const JobCard = ({ job, onSave, onShare, onApply }: JobCardProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.(job.id);
  };

  const handleShare = () => {
    onShare?.(job.id);
  };

  const handleApply = () => {
    onApply?.(job.id);
  };

  const formatBudget = (budget: typeof job.budget) => {
    if (budget.type === 'fixed') {
      return `$${budget.min.toLocaleString()} - $${budget.max.toLocaleString()}`;
    }
    return `$${budget.min}/hr - $${budget.max}/hr`;
  };

  const getUrgencyColor = (urgency?: string) => {
    switch (urgency) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      default: return 'bg-success text-success-foreground';
    }
  };

  const timeAgo = (dateString: string) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <Card className="job-card p-6 hover:border-primary-glow/50 transition-all duration-300 bg-card/50 backdrop-blur-sm max-w-full overflow-hidden">
      {/* Header with badges */}
      <div className="flex items-start justify-between mb-4 gap-4">
        <div className="flex flex-wrap gap-2 min-w-0 flex-1">
          {job.isTrending && (
            <Badge className="bg-trending text-trending-foreground trending-pulse shrink-0">
              🔥 Trending
            </Badge>
          )}
          {job.isFeatured && (
            <Badge className="bg-featured text-featured-foreground shrink-0">
              ⭐ Featured
            </Badge>
          )}
          {job.urgency && (
            <Badge className={`${getUrgencyColor(job.urgency)} shrink-0`}>
              {job.urgency === 'high' ? '🚨 Urgent' : job.urgency === 'medium' ? '⚡ Medium' : '🕐 Low'}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSave}
            className={`transition-fast ${isSaved ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleShare} className="text-muted-foreground">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Job Title */}
      <h3 className="text-lg font-semibold text-foreground mb-2 hover:text-primary transition-fast cursor-pointer line-clamp-2">
        {job.title}
      </h3>

      {/* Budget and Type */}
      <div className="flex items-center gap-4 mb-3 flex-wrap">
        <div className="flex items-center gap-1 text-success">
          <DollarSign className="w-4 h-4 shrink-0" />
          <span className="font-semibold">{formatBudget(job.budget)}</span>
          <span className="text-muted-foreground text-sm">({job.budget.type})</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <Clock className="w-4 h-4 shrink-0" />
          <span>{timeAgo(job.postedAt)}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground mb-4 leading-relaxed">
        {showFullDescription 
          ? job.description 
          : `${job.description.slice(0, 150)}${job.description.length > 150 ? '...' : ''}`
        }
        {job.description.length > 150 && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-primary hover:underline ml-2 shrink-0"
          >
            {showFullDescription ? 'Show less' : 'Show more'}
          </button>
        )}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.slice(0, 5).map((skill, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {skill}
          </Badge>
        ))}
        {job.skills.length > 5 && (
          <Badge variant="secondary" className="text-xs text-muted-foreground">
            +{job.skills.length - 5} more
          </Badge>
        )}
      </div>

      {/* Client Info */}
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <img
            src={job.client.avatar}
            alt={job.client.name}
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-medium text-foreground truncate">{job.client.name}</h4>
              {job.client.verified && (
                <Badge variant="secondary" className="text-xs bg-success/10 text-success shrink-0">
                  ✓ Verified
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-current text-warning shrink-0" />
                <span>{job.client.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate">{job.client.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border gap-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap min-w-0">
          <div className="flex items-center gap-1 shrink-0">
            <User className="w-4 h-4" />
            <span>{job.proposals} proposals</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Eye className="w-4 h-4" />
            <span>{job.views} views</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Bookmark className="w-4 h-4" />
            <span>{job.saves} saves</span>
          </div>
        </div>

        <div className="flex gap-2 shrink-0">
          <Button variant="outline" size="sm" className="whitespace-nowrap">
            Learn More
          </Button>
          <Button 
            size="sm" 
            onClick={handleApply}
            className="bg-gradient-primary hover:opacity-90 whitespace-nowrap"
          >
            Apply Now
          </Button>
        </div>
      </div>
    </Card>
  );
};
