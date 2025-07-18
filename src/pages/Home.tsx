
import { useState, useMemo } from 'react';
import { Header } from '@/components/Layout/Header';
import { JobFeed } from '@/components/JobFeed/JobFeed';
import { TrendingSidebar } from '@/components/TrendingSidebar/TrendingSidebar';
import { SearchBar } from '@/components/SearchBar/SearchBar';
import { JobCategories } from '@/components/JobCategories/JobCategories';
import { mockJobs } from '@/data/mockJobs';

const mockUser = {
  name: "Alex Chen",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  role: "freelancer" as const,
  notifications: 3
};

export const Home = () => {
  const [isTrendingSidebarOpen, setIsTrendingSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleTrendingClick = () => {
    setIsTrendingSidebarOpen(true);
  };

  // Filter jobs based on search query and category
  const filteredJobs = useMemo(() => {
    let filtered = mockJobs;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        job.client.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(job => {
        const categoryKeywords = {
          'AI & Machine Learning': ['ai', 'machine learning', 'ml', 'artificial intelligence', 'deep learning'],
          'Software Development': ['software', 'programming', 'development', 'coding', 'backend', 'frontend'],
          'Web Development': ['web', 'website', 'html', 'css', 'javascript', 'react', 'vue', 'angular'],
          'Mobile Development': ['mobile', 'ios', 'android', 'flutter', 'react native', 'swift', 'kotlin'],
          'Data Science': ['data', 'analytics', 'python', 'r', 'statistics', 'visualization'],
          'UI/UX Design': ['ui', 'ux', 'design', 'user interface', 'user experience', 'figma', 'sketch'],
          'Graphic Design': ['graphic', 'logo', 'branding', 'illustration', 'photoshop', 'illustrator'],
          'Digital Marketing': ['marketing', 'seo', 'social media', 'advertising', 'campaigns'],
          'Content Writing': ['writing', 'content', 'copywriting', 'blog', 'articles'],
          'SEO': ['seo', 'search engine', 'optimization', 'ranking', 'keywords'],
          'Video Editing': ['video', 'editing', 'motion', 'after effects', 'premiere'],
          'Photography': ['photography', 'photo', 'lightroom', 'photoshoot'],
          'Virtual Assistant': ['virtual', 'assistant', 'admin', 'support'],
          'Translation': ['translation', 'language', 'localization'],
          'Accounting': ['accounting', 'bookkeeping', 'finance', 'quickbooks'],
          'Legal': ['legal', 'law', 'contract', 'compliance'],
          'Consulting': ['consulting', 'strategy', 'business', 'advisory']
        };

        const keywords = categoryKeywords[selectedCategory as keyof typeof categoryKeywords] || [];
        return keywords.some(keyword => 
          job.title.toLowerCase().includes(keyword) ||
          job.description.toLowerCase().includes(keyword) ||
          job.skills.some(skill => skill.toLowerCase().includes(keyword))
        );
      });
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        variant="app" 
        user={mockUser} 
        onTrendingClick={handleTrendingClick}
      />
      
      <div className="pt-20">
        {/* Search and Categories */}
        <div className="sticky top-20 z-30 bg-background border-b border-border">
          <div className="container mx-auto max-w-4xl px-4 py-4">
            <SearchBar 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
          <JobCategories 
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Job Feed */}
        <div className="px-4 pb-8 pt-6">
          <div className="container mx-auto max-w-4xl">
            {filteredJobs.length > 0 ? (
              <JobFeed jobs={filteredJobs} />
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  No jobs found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search terms or category filter
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <TrendingSidebar 
        isOpen={isTrendingSidebarOpen}
        onClose={() => setIsTrendingSidebarOpen(false)}
      />
    </div>
  );
};
