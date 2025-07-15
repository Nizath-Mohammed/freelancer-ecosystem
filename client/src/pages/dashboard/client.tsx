import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/user-avatar";
import { StatsWidget } from "@/components/dashboard/stats-widget";
import { ProjectWidget } from "@/components/dashboard/project-widget";
import { ActivityWidget } from "@/components/dashboard/activity-widget";
import { RecommendationsWidget } from "@/components/dashboard/recommendations-widget";
import { Link } from "wouter";
import { 
  DollarSign, 
  Briefcase, 
  Star, 
  TrendingUp, 
  Users,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Target
} from "lucide-react";

export default function ClientDashboard() {
  const { user } = useAuth();

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: userProjects } = useQuery({
    queryKey: ["/api/projects"],
    queryFn: async () => {
      const response = await fetch("/api/projects?clientId=" + user?.id);
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = dashboardData || {};
  const projects = userProjects || [];

  const statsData = [
    {
      label: "Active Projects",
      value: stats.activeProjects || 0,
      icon: Briefcase,
      change: 8
    },
    {
      label: "Total Spent",
      value: stats.totalSpent || "0",
      format: "currency" as const,
      icon: DollarSign,
      change: 15
    },
    {
      label: "Completed Projects",
      value: stats.completedProjects || 0,
      icon: CheckCircle,
      change: 12
    },
    {
      label: "Avg Rating Given",
      value: `${stats.averageRating || "0"}/5`,
      icon: Star,
      change: 3
    }
  ];

  const recentActivities = [
    {
      id: "1",
      type: "proposal" as const,
      title: "New proposal received",
      description: "Sarah Kim submitted a proposal for Mobile App Design",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
    {
      id: "2",
      type: "project" as const,
      title: "Project milestone completed",
      description: "E-commerce Platform - Frontend development milestone",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    },
    {
      id: "3",
      type: "review" as const,
      title: "Review submitted",
      description: "Gave 5-star review to Alex Johnson",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      metadata: { rating: 5 }
    }
  ];

  const recommendations = [
    {
      id: "1",
      type: "freelancer" as const,
      title: "Top-Rated Developer",
      description: "Maria Rodriguez - Full-Stack Developer with 98% success rate",
      matchPercentage: 95,
      data: {
        id: "1",
        firstName: "Maria",
        lastName: "Rodriguez",
        profile: {
          title: "Full-Stack Developer",
          hourlyRate: "75",
          location: "San Francisco, CA",
          averageRating: "4.9"
        }
      }
    },
    {
      id: "2",
      type: "freelancer" as const,
      title: "Expert Designer",
      description: "James Chen - UI/UX Designer specializing in mobile apps",
      matchPercentage: 87,
      data: {
        id: "2",
        firstName: "James",
        lastName: "Chen",
        profile: {
          title: "UI/UX Designer",
          hourlyRate: "65",
          location: "New York, NY",
          averageRating: "4.8"
        }
      }
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome back, {user?.firstName}!</h1>
            <p className="text-slate-600">Manage your projects and find the perfect talent</p>
          </div>
          <Button asChild>
            <Link href="/projects/post" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Post New Project</span>
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Profile & Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <UserAvatar user={user} size="xl" />
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {user?.firstName} {user?.lastName}
                    </h3>
                    <p className="text-sm text-slate-600">Client</p>
                    <Badge variant="secondary" className="mt-1">
                      <Star className="h-3 w-3 mr-1 text-amber-500" />
                      Verified Client
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Projects Posted</span>
                    <span className="font-semibold">{projects.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Total Spent</span>
                    <span className="font-semibold text-green-600">
                      ${stats.totalSpent?.toLocaleString() || "0"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Hire Success Rate</span>
                    <span className="font-semibold">95%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/projects/post">
                    <Plus className="h-4 w-4 mr-2" />
                    Post Project
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/projects">
                    <Search className="h-4 w-4 mr-2" />
                    Browse Talent
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/messages">
                    <Users className="h-4 w-4 mr-2" />
                    View Messages
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Project Insights */}
            <StatsWidget
              title="Project Insights"
              stats={[
                {
                  label: "Avg Project Value",
                  value: "$4,200",
                  format: "currency",
                  icon: DollarSign
                },
                {
                  label: "Avg Completion Time",
                  value: "3.2 weeks",
                  icon: Clock
                },
                {
                  label: "Talent Retention",
                  value: "85%",
                  format: "percentage",
                  icon: Target
                }
              ]}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Overview */}
            <div className="grid md:grid-cols-2 gap-4">
              {statsData.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-slate-900">
                          {stat.format === "currency" 
                            ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(parseFloat(stat.value.toString()) || 0)
                            : stat.value
                          }
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    {stat.change && (
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-500">+{stat.change}% from last month</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Active Projects */}
            <ProjectWidget
              title="Your Projects"
              projects={projects.map(project => ({
                ...project,
                progress: Math.floor(Math.random() * 100) // This would come from actual project data
              }))}
              emptyMessage="No projects yet. Post your first project to get started!"
              actionLabel="Post Project"
              actionHref="/projects/post"
            />

            {/* Recent Activity */}
            <ActivityWidget
              title="Recent Activity"
              activities={recentActivities}
            />
          </div>

          {/* Right Sidebar - Recommendations */}
          <div className="lg:col-span-1 space-y-6">
            <RecommendationsWidget
              title="Recommended Talent"
              recommendations={recommendations}
              userRole="client"
            />

            {/* Market Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Market Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 text-sm mb-1">
                      Popular Skills This Week
                    </h4>
                    <p className="text-xs text-slate-600">
                      React, Node.js, and UI/UX Design are in high demand
                    </p>
                  </div>
                  
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 text-sm mb-1">
                      Average Response Time
                    </h4>
                    <p className="text-xs text-slate-600">
                      Freelancers respond to proposals within 4 hours
                    </p>
                  </div>

                  <div className="p-3 bg-amber-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 text-sm mb-1">
                      Budget Recommendation
                    </h4>
                    <p className="text-xs text-slate-600">
                      Projects with clear budgets get 3x more proposals
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
