
import { useState } from 'react';
import { Header } from '@/components/Layout/Header';
import { JobFeed } from '@/components/JobFeed/JobFeed';
import { TrendingSidebar } from '@/components/TrendingSidebar/TrendingSidebar';

const mockUser = {
  name: "Alex Chen",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  role: "freelancer" as const,
  notifications: 3
};

export const Home = () => {
  const [isTrendingSidebarOpen, setIsTrendingSidebarOpen] = useState(false);

  const handleTrendingClick = () => {
    setIsTrendingSidebarOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        variant="app" 
        user={mockUser} 
        onTrendingClick={handleTrendingClick}
      />
      
      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto max-w-4xl">
          <JobFeed />
        </div>
      </div>

      <TrendingSidebar 
        isOpen={isTrendingSidebarOpen}
        onClose={() => setIsTrendingSidebarOpen(false)}
      />
    </div>
  );
};
