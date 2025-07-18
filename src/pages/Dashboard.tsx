import { useState } from 'react';
import { BarChart3, TrendingUp, Award, MessageSquare, Settings, Calendar, DollarSign, Eye, Users, Star } from 'lucide-react';
import { Header } from '@/components/Layout/Header';
import { JobFeed } from '@/components/JobFeed/JobFeed';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockUser = {
  name: "Alex Chen",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  role: "freelancer" as const,
  notifications: 3
};

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: "Total Earnings",
      value: "$24,680",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-success"
    },
    {
      title: "Active Projects",
      value: "8",
      change: "+2",
      icon: BarChart3,
      color: "text-primary"
    },
    {
      title: "Profile Views",
      value: "1,234",
      change: "+18.2%",
      icon: Eye,
      color: "text-warning"
    },
    {
      title: "Client Rating",
      value: "4.9",
      change: "+0.1",
      icon: Star,
      color: "text-destructive"
    }
  ];

  const badges = [
    { name: "Top Rated", icon: "⭐", level: "Gold", description: "Maintained 4.8+ rating for 6 months" },
    { name: "Fast Delivery", icon: "⚡", level: "Silver", description: "Delivered 95% of projects on time" },
    { name: "Knowledge Leader", icon: "🧠", level: "Bronze", description: "Top contributor in Q&A platform" },
    { name: "Client Favorite", icon: "❤️", level: "Gold", description: "High repeat client rate" }
  ];

  const recentProjects = [
    {
      id: "1",
      title: "E-commerce React App",
      client: "TechCorp",
      status: "In Progress",
      progress: 75,
      deadline: "Dec 15, 2024",
      value: "$2,500"
    },
    {
      id: "2",
      title: "Mobile App UI Design",
      client: "StartupXYZ",
      status: "Review",
      progress: 100,
      deadline: "Dec 10, 2024",
      value: "$1,800"
    },
    {
      id: "3",
      title: "API Development",
      client: "DataCorp",
      status: "Planning",
      progress: 25,
      deadline: "Jan 5, 2025",
      value: "$3,200"
    }
  ];

  const qaStats = [
    { label: "Questions Asked", value: "12" },
    { label: "Answers Provided", value: "89" },
    { label: "Best Answers", value: "34" },
    { label: "Reputation Points", value: "2,145" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header variant="app" user={mockUser} />
      
      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {mockUser.name}! 👋
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your freelance career today.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 hover-lift">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-secondary`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="qa">Q&A</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Level Progress */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-foreground">Level Progress</h3>
                    <Badge className="bg-primary/10 text-primary">Level 12</Badge>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current Level</span>
                      <span className="text-foreground font-medium">12 / 50</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-3">
                      <div className="bg-gradient-primary h-3 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Complete 3 more projects to reach Level 13
                    </p>
                  </div>
                </Card>

                {/* Quick Actions */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-12 flex-col gap-1">
                      <Calendar className="w-4 h-4" />
                      Schedule
                    </Button>
                    <Button variant="outline" className="h-12 flex-col gap-1">
                      <Settings className="w-4 h-4" />
                      Settings
                    </Button>
                    <Button variant="outline" className="h-12 flex-col gap-1">
                      <MessageSquare className="w-4 h-4" />
                      Messages
                    </Button>
                    <Button variant="outline" className="h-12 flex-col gap-1">
                      <TrendingUp className="w-4 h-4" />
                      Analytics
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Recent Activity & Job Feed */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Recommended Jobs</h3>
                  <JobFeed variant="preview" limit={3} />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Recent Projects</h3>
                  <div className="space-y-4">
                    {recentProjects.map((project) => (
                      <Card key={project.id} className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-foreground">{project.title}</h4>
                            <Badge variant={project.status === 'In Progress' ? 'default' : 'secondary'}>
                              {project.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Client: {project.client}
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Due: {project.deadline}</span>
                            <span className="font-medium text-success">{project.value}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Project Management</h3>
                <p className="text-muted-foreground">Kanban board and project management tools coming soon...</p>
              </Card>
            </TabsContent>

            {/* Badges Tab */}
            <TabsContent value="badges">
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Your Achievements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {badges.map((badge, index) => (
                      <Card key={index} className="p-4 text-center hover-lift badge-glow">
                        <div className="text-4xl mb-2">{badge.icon}</div>
                        <h4 className="font-semibold text-foreground mb-1">{badge.name}</h4>
                        <Badge className={`mb-2 ${
                          badge.level === 'Gold' ? 'bg-warning text-warning-foreground' :
                          badge.level === 'Silver' ? 'bg-muted text-muted-foreground' :
                          'bg-primary/20 text-primary'
                        }`}>
                          {badge.level}
                        </Badge>
                        <p className="text-xs text-muted-foreground">{badge.description}</p>
                      </Card>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Q&A Tab */}
            <TabsContent value="qa">
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {qaStats.map((stat, index) => (
                    <Card key={index} className="p-4 text-center">
                      <h4 className="text-2xl font-bold text-foreground">{stat.value}</h4>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </Card>
                  ))}
                </div>
                
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Recent Q&A Activity</h3>
                  <p className="text-muted-foreground">Your questions and answers will appear here...</p>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};