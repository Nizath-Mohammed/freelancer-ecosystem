import { Header } from '@/components/Layout/Header';
import { JobFeed } from '@/components/JobFeed/JobFeed';

const mockUser = {
  name: "Alex Chen",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  role: "freelancer" as const,
  notifications: 3
};

export const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header variant="app" user={mockUser} />
      
      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto max-w-4xl">
          <JobFeed />
        </div>
      </div>
    </div>
  );
};