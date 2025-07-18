import { Header } from '@/components/Layout/Header';
import { QuestionFeed } from '@/components/QA/QuestionFeed';

const mockUser = {
  name: "Alex Chen",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  role: "freelancer" as const,
  notifications: 3
};

export const QA = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header variant="app" user={mockUser} />
      
      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Q&A Community</h1>
            <p className="text-muted-foreground">
              Get help from the community and share your knowledge
            </p>
          </div>
          <QuestionFeed />
        </div>
      </div>
    </div>
  );
};