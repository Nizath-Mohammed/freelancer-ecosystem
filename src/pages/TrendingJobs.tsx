
import { useState } from 'react';
import { ArrowLeft, TrendingUp, Filter, SortDesc } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Layout/Header';
import { JobCard } from '@/components/JobFeed/JobCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockJobs } from '@/data/mockJobs';

const mockUser = {
  name: "Alex Chen",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  role: "freelancer" as const,
  notifications: 3
};

export const TrendingJobs = () => {
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'budget'>('popular');
  const [filterBy, setFilterBy] = useState<'all' | 'hourly' | 'fixed'>('all');

  // Generate trending jobs (expand the existing ones and add more)
  const generateTrendingJobs = () => {
    const baseTrendingJobs = mockJobs.filter(job => job.isTrending || job.isFeatured);
    const expandedJobs = [];
    
    // Add the existing trending jobs multiple times with slight variations
    for (let i = 0; i < 50; i++) {
      const baseJob = baseTrendingJobs[i % baseTrendingJobs.length];
      expandedJobs.push({
        ...baseJob,
        id: `trending-${i + 1}`,
        title: `${baseJob.title} ${i > baseTrendingJobs.length - 1 ? `(${Math.floor(i / baseTrendingJobs.length) + 1})` : ''}`,
        proposals: Math.floor(Math.random() * 50) + 1,
        views: Math.floor(Math.random() * 500) + 50,
        saves: Math.floor(Math.random() * 100) + 5,
        postedAt: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
        isTrending: true,
      });
    }
    
    return expandedJobs;
  };

  const trendingJobs = generateTrendingJobs();

  const filteredAndSortedJobs = trendingJobs
    .filter(job => {
      if (filterBy === 'all') return true;
      return job.budget.type === filterBy;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
        case 'budget':
          return b.budget.max - a.budget.max;
        case 'popular':
        default:
          return b.views - a.views;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Header variant="app" user={mockUser} />
      
      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link to="/home">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Feed
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-trending" />
              <h1 className="text-2xl font-bold">Top 50 Trending Jobs Today</h1>
              <Badge className="bg-trending/10 text-trending">🔥 Hot</Badge>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-card rounded-lg border">
            <div className="flex items-center gap-2">
              <SortDesc className="w-4 h-4" />
              <span className="text-sm font-medium">Sort by:</span>
              <div className="flex gap-2">
                {(['popular', 'newest', 'budget'] as const).map((option) => (
                  <Button
                    key={option}
                    variant={sortBy === option ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy(option)}
                  >
                    {option === 'popular' ? 'Most Popular' : option === 'newest' ? 'Newest' : 'Highest Budget'}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2 ml-auto">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter:</span>
              <div className="flex gap-2">
                {(['all', 'hourly', 'fixed'] as const).map((option) => (
                  <Button
                    key={option}
                    variant={filterBy === option ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterBy(option)}
                  >
                    {option === 'all' ? 'All Jobs' : option === 'hourly' ? 'Hourly' : 'Fixed Price'}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="space-y-4">
            {filteredAndSortedJobs.map((job, index) => (
              <div key={job.id} className="animate-fade-in" style={{ animationDelay: `${(index % 10) * 0.05}s` }}>
                <JobCard job={job} />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Trending Jobs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
