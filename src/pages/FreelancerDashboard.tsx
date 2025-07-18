import { useState, useEffect } from 'react';
import { Search, Filter, SortDesc, TrendingUp, Clock, MapPin, DollarSign, Star, Users, Eye, Bookmark, Grid, List } from 'lucide-react';
import { Header } from '@/components/Layout/Header';
import { JobCard } from '@/components/JobFeed/JobCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectFilters } from '@/components/ProjectFilters/ProjectFilters';
import { ProjectMetrics } from '@/components/ProjectMetrics/ProjectMetrics';
import { mockJobs } from '@/data/mockJobs';

const mockUser = {
  name: "Alex Chen",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  role: "freelancer" as const,
  notifications: 3
};

export const FreelancerDashboard = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [budgetRange, setBudgetRange] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [budgetRangeFilter, setBudgetRangeFilter] = useState<[number, number]>([0, 10000]);
  const [projectTypeFilter, setProjectTypeFilter] = useState('all');
  const [experienceLevelFilter, setExperienceLevelFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique skills from all jobs
  const allSkills = Array.from(new Set(jobs.flatMap(job => job.skills)));

  // Filter and sort jobs
  useEffect(() => {
    let filtered = [...jobs];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Skill filter
    if (selectedSkill !== 'all') {
      filtered = filtered.filter(job => job.skills.includes(selectedSkill));
    }

    // Budget filter
    if (budgetRange !== 'all') {
      filtered = filtered.filter(job => {
        const maxBudget = job.budget.max;
        switch (budgetRange) {
          case 'under-50': return maxBudget < 50;
          case '50-100': return maxBudget >= 50 && maxBudget <= 100;
          case '100-500': return maxBudget > 100 && maxBudget <= 500;
          case 'over-500': return maxBudget > 500;
          default: return true;
        }
      });
    }

    // Advanced budget range filter
    if (budgetRangeFilter[0] > 0 || budgetRangeFilter[1] < 10000) {
      filtered = filtered.filter(job => {
        const maxBudget = job.budget.max;
        return maxBudget >= budgetRangeFilter[0] && maxBudget <= budgetRangeFilter[1];
      });
    }

    // Skills filter
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(job => 
        selectedSkills.some(skill => job.skills.includes(skill))
      );
    }

    // Project type filter
    if (projectTypeFilter !== 'all') {
      filtered = filtered.filter(job => job.budget.type === projectTypeFilter);
    }

    // Tab filter
    if (activeTab !== 'all') {
      switch (activeTab) {
        case 'trending':
          filtered = filtered.filter(job => job.isTrending);
          break;
        case 'featured':
          filtered = filtered.filter(job => job.isFeatured);
          break;
        case 'urgent':
          filtered = filtered.filter(job => job.urgency === 'high');
          break;
      }
    }

    // Sort
    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
        break;
      case 'budget-high':
        filtered.sort((a, b) => b.budget.max - a.budget.max);
        break;
      case 'budget-low':
        filtered.sort((a, b) => a.budget.max - b.budget.max);
        break;
      case 'proposals':
        filtered.sort((a, b) => a.proposals - b.proposals);
        break;
      case 'engagement':
        filtered.sort((a, b) => (b.views + b.proposals + b.saves) - (a.views + a.proposals + a.saves));
        break;
    }

    setFilteredJobs(filtered);
  }, [jobs, searchQuery, selectedSkill, budgetRange, sortBy, activeTab, selectedSkills, budgetRangeFilter, projectTypeFilter, experienceLevelFilter]);

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
    navigator.clipboard.writeText(`https://conectify.com/projects/${jobId}`);
  };

  const handleApply = (jobId: string) => {
    console.log(`Applying to project ${jobId}`);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSkill('all');
    setBudgetRange('all');
    setSortBy('latest');
    setActiveTab('all');
    setSelectedSkills([]);
    setBudgetRangeFilter([0, 10000]);
    setProjectTypeFilter('all');
    setExperienceLevelFilter('all');
  };

  // Calculate metrics
  const totalBudget = jobs.reduce((sum, job) => sum + job.budget.max, 0);
  const averageBudget = Math.round(totalBudget / jobs.length);
  const competitionLevel: 'low' | 'medium' | 'high' = 
    jobs.length < 10 ? 'low' : jobs.length < 20 ? 'medium' : 'high';

  const stats = [
    { label: 'Total Projects', value: jobs.length.toString(), icon: Users },
    { label: 'Trending Now', value: jobs.filter(job => job.isTrending).length.toString(), icon: TrendingUp },
    { label: 'Featured', value: jobs.filter(job => job.isFeatured).length.toString(), icon: Star },
    { label: 'Urgent', value: jobs.filter(job => job.urgency === 'high').length.toString(), icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header variant="app" user={mockUser} />
      
      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Freelancer Projects Dashboard
            </h1>
            <p className="text-muted-foreground">
              Discover and bid on projects that match your expertise
            </p>
          </div>

          {/* Project Metrics */}
          <div className="mb-8">
            <ProjectMetrics
              totalProjects={jobs.length}
              newProjects={3}
              totalBudget={totalBudget}
              averageBudget={averageBudget}
              competitionLevel={competitionLevel}
              trendingProjects={jobs.filter(job => job.isTrending).length}
              savedProjects={5}
              viewedProjects={12}
            />
          </div>

          {/* Search Bar */}
          <Card className="p-6 mb-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search projects by title, description, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    variant={showFilters ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </Button>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest</SelectItem>
                      <SelectItem value="budget-high">Budget: High to Low</SelectItem>
                      <SelectItem value="budget-low">Budget: Low to High</SelectItem>
                      <SelectItem value="proposals">Fewest Proposals</SelectItem>
                      <SelectItem value="engagement">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mb-6 animate-fade-in">
              <ProjectFilters
                skills={allSkills}
                selectedSkills={selectedSkills}
                onSkillChange={setSelectedSkills}
                budgetRange={budgetRangeFilter}
                onBudgetChange={setBudgetRangeFilter}
                projectType={projectTypeFilter}
                onProjectTypeChange={setProjectTypeFilter}
                experienceLevel={experienceLevelFilter}
                onExperienceLevelChange={setExperienceLevelFilter}
                onClearAll={clearFilters}
              />
            </div>
          )}

          {/* Project Categories */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Projects ({jobs.length})</TabsTrigger>
              <TabsTrigger value="trending">
                Trending ({jobs.filter(job => job.isTrending).length})
              </TabsTrigger>
              <TabsTrigger value="featured">
                Featured ({jobs.filter(job => job.isFeatured).length})
              </TabsTrigger>
              <TabsTrigger value="urgent">
                Urgent ({jobs.filter(job => job.urgency === 'high').length})
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              {filteredJobs.length} projects found
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
              <Button variant="outline" size="sm">
                <SortDesc className="w-4 h-4 mr-2" />
                Advanced Sort
              </Button>
            </div>
          </div>

          {/* Projects Grid/List */}
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 lg:grid-cols-2 gap-6'
              : 'space-y-6'
          }>
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

          {/* Empty State */}
          {filteredJobs.length === 0 && (
            <Card className="p-12 text-center">
              <div className="text-muted-foreground mb-4">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No projects found</h3>
                <p>Try adjusting your filters or search criteria</p>
              </div>
              <Button onClick={clearFilters} className="mt-4">
                Clear All Filters
              </Button>
            </Card>
          )}

          {/* Load More */}
          {filteredJobs.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="px-8">
                Load More Projects
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};