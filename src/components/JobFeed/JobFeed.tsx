import { useState, useEffect } from 'react';
import { TrendingUp, Clock, Filter, SortDesc } from 'lucide-react';
import { JobCard } from './JobCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockJobs } from '@/data/mockJobs';

interface JobFeedProps {
  variant?: 'preview' | 'full';
  limit?: number;
  jobs?: any[]; // Accept filtered jobs as prop
}

export const JobFeed = ({ variant = 'full', limit, jobs: propJobs }: JobFeedProps) => {
  const [jobs, setJobs] = useState(propJobs || mockJobs);
  const [activeTab, setActiveTab] = useState<'latest' | 'trending'>('latest');
  const [filteredJobs, setFilteredJobs] = useState(propJobs || mockJobs);

  // Update jobs when prop changes
  useEffect(() => {
    if (propJobs) {
      setJobs(propJobs);
      setFilteredJobs(propJobs);
    }
  }, [propJobs]);

  useEffect(() => {
    let sorted = [...jobs];
    
    if (activeTab === 'trending') {
      // Sort by engagement metrics (views + proposals + saves)
      sorted.sort((a, b) => {
        const aEngagement = a.views + a.proposals + a.saves;
        const bEngagement = b.views + b.proposals + b.saves;
        return bEngagement - aEngagement;
      });
    } else {
      // Sort by recency
      sorted.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
    }

    const displayJobs = limit ? sorted.slice(0, limit) : sorted;
    setFilteredJobs(displayJobs);
  }, [jobs, activeTab, limit]);

  const handleSave = (jobId: string) => {
    setJobs(prevJobs => 
      prevJobs.map(job => 
        job.id === jobId 
          ? { ...job, saves: job.saves + 1 }
          : job
      )
    );
  };

  const handleShare = (jobId: string) => {
    // Mock share functionality
    navigator.clipboard.writeText(`https://conectify.com/jobs/${jobId}`);
  };

  const handleApply = (jobId: string) => {
    // Mock apply functionality
    console.log(`Applying to job ${jobId}`);
  };

  const isPreview = variant === 'preview';
  const trendingJobs = filteredJobs.filter(job => job.isTrending).slice(0, 4);

  return (
    <div className="w-full">
      {/* Header */}
      {!isPreview && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Job Feed</h2>
            <p className="text-muted-foreground">Discover opportunities that match your skills</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <SortDesc className="w-4 h-4 mr-2" />
              Sort
            </Button>
          </div>
        </div>
      )}

      {/* Trending Carousel (if trending jobs exist and not preview) */}
      {!isPreview && trendingJobs.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-trending" />
            <h3 className="text-lg font-semibold text-foreground">Trending Jobs</h3>
            <Badge className="bg-trending/10 text-trending">Hot</Badge>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {trendingJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onSave={handleSave}
                onShare={handleShare}
                onApply={handleApply}
              />
            ))}
          </div>
        </div>
      )}

      {/* Feed Tabs */}
      {!isPreview && (
        <div className="flex items-center gap-1 mb-6 bg-secondary rounded-lg p-1">
          <Button
            variant={activeTab === 'latest' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('latest')}
            className={activeTab === 'latest' ? 'bg-card shadow-soft' : ''}
          >
            <Clock className="w-4 h-4 mr-2" />
            Latest Jobs
          </Button>
          <Button
            variant={activeTab === 'trending' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('trending')}
            className={activeTab === 'trending' ? 'bg-card shadow-soft' : ''}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending
          </Button>
        </div>
      )}

      {/* Job Cards */}
      <div className={`space-y-6 ${isPreview ? 'max-h-96 overflow-hidden' : ''}`}>
        {filteredJobs.map((job, index) => (
          <div
            key={job.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <JobCard
              job={job}
              onSave={handleSave}
              onShare={handleShare}
              onApply={handleApply}
            />
          </div>
        ))}
      </div>

      {/* Preview Footer */}
      {isPreview && (
        <div className="text-center mt-8">
          <Button className="bg-gradient-primary hover:opacity-90">
            View All Jobs
          </Button>
        </div>
      )}

      {/* Load More (for full feed) */}
      {!isPreview && filteredJobs.length > 0 && (
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Jobs
          </Button>
        </div>
      )}
    </div>
  );
};
