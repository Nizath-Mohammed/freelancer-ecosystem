
import { useState } from 'react';
import { X, TrendingUp, Clock, DollarSign, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockJobs } from '@/data/mockJobs';

interface TrendingSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrendingSidebar = ({ isOpen, onClose }: TrendingSidebarProps) => {
  // Filter trending jobs
  const trendingJobs = mockJobs.filter(job => job.isTrending || job.isFeatured).slice(0, 6);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-card border-r border-border z-50 overflow-y-auto animate-slide-in-left">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-trending" />
            <h2 className="font-semibold text-lg">Trending Jobs</h2>
            <Badge className="bg-trending/10 text-trending">Hot</Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {trendingJobs.map((job, index) => (
            <Card key={job.id} className="p-4 hover:shadow-md transition-shadow animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-medium text-sm line-clamp-2 leading-tight">
                    {job.title}
                  </h3>
                  {job.isTrending && (
                    <Badge className="bg-trending/10 text-trending text-xs shrink-0">
                      Trending
                    </Badge>
                  )}
                </div>

                {/* Client */}
                <div className="flex items-center gap-2">
                  <img
                    src={job.client.avatar}
                    alt={job.client.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span className="text-xs text-muted-foreground truncate">
                    {job.client.name}
                  </span>
                </div>

                {/* Budget */}
                <div className="flex items-center gap-2 text-xs">
                  <DollarSign className="w-3 h-3 text-muted-foreground" />
                  <span className="font-medium">
                    ${job.budget.min}-${job.budget.max}
                    <span className="text-muted-foreground">/{job.budget.type}</span>
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{job.proposals} proposals</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(job.postedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1">
                  {job.skills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs px-2 py-0">
                      {skill}
                    </Badge>
                  ))}
                  {job.skills.length > 3 && (
                    <Badge variant="secondary" className="text-xs px-2 py-0">
                      +{job.skills.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Action */}
                <Button size="sm" className="w-full text-xs bg-gradient-primary hover:opacity-90">
                  View Details
                </Button>
              </div>
            </Card>
          ))}

          {/* Footer */}
          <div className="text-center pt-4">
            <Button variant="outline" className="w-full">
              View All Trending Jobs
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
