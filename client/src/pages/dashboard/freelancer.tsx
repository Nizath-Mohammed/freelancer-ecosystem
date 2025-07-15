import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BadgeDisplay } from "@/components/ui/badge-display";
import { LevelProgress } from "@/components/ui/level-progress";
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
  Clock,
  Target,
  Award,
  Edit,
  Plus
} from "lucide-react";

export default function FreelancerDashboard() {
  const { user } = useAuth();

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: proposalsData } = useQuery({
    queryKey: ["/api/proposals/my"],
  });

  const { data: userProfile } = useQuery({
    queryKey: ["/api/auth/user"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = dashboardData || {};
  const profile = userProfile?.profile || {};
  const badges = userProfile?.badges || [];

  const statsData = [
    {
      label: "Active Projects",
      value: stats.activeProjects || 0,
      icon: Briefcase,
      change: 12
    },
    {
      label: "Total Earnings",
      value: stats.totalEarnings || "0",
      format: "currency" as const,
      icon: DollarSign,
      change: 25
    },
    {
      label: "Success Rate",
      value: stats.successRate || "0",
      format: "percentage" as const,
      icon: Target,
      change: 5
    },
    {
      label: "Avg Rating",
      value: `${stats.averageRating || "0"}/5`,
      icon: Star,
      change: 2
    }
  ];

  const recentActivities = [
    {
      id: "1",
      type: "payment" as const,
      title: "Payment received",
      description: "$2,450 from E-commerce Platform project",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      metadata: { amount: "$2,450" }
    },
    {
      id: "2",
      type: "review" as const,
      title: "5-star review received",
      description: "Excellent work on the mobile app design",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      metadata: { rating: 5 }
    },
    {
      id: "3",
      type: "badge" as const,
      title: "New badge earned",
      description: '"AI Expert" achievement unlocked',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      metadata: { badgeName: "AI Expert" }
    }
  ];

  const recommendations = [
    {
      id: "1",
      type: "project" as const,
      title: "React Dashboard Development",
      description: "Build a modern admin dashboard with React, TypeScript, and Tailwind CSS...",
      matchPercentage: 98,
      data: {
        id: "1",
        budget: "3200",
        budgetType: "fixed",
        skills: ["React", "TypeScript", "Tailwind CSS"]
      }
    },
    {
      id: "2",
      type: "project" as const,
      title: "API Development",
      description: "Node.js REST API for mobile app with MongoDB integration...",
      matchPercentage: 85,
      data: {
        id: "2",
        budget: "2800",
        budgetType: "fixed",
        skills: ["Node.js", "MongoDB", "Express"]
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
            <p className="text-slate-600">Here's what's happening with your freelancing business</p>
          </div>
          <Button asChild>
            <Link href="/profile/edit" className="flex items-center space-x-2">
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Profile & Stats */}
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
                    <p className="text-sm text-slate-600">{profile.title || "Freelancer"}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="text-amber-400 h-4 w-4 fill-current" />
                      <span className="text-sm font-medium text-slate-900">
                        {profile.averageRating || "5.0"}
                      </span>
                      <span className="text-sm text-slate-600">
                        ({profile.totalEarnings || "$0"} earned)
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Level Progress */}
                <div className="mb-4">
                  <LevelProgress 
                    level={profile.level || 1} 
                    xp={profile.xp || 0} 
                  />
                </div>
                
                {/* Badges */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-slate-900 mb-2">Recent Badges</h4>
                  <BadgeDisplay badges={badges} variant="compact" />
                </div>

                {/* Availability */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Availability</span>
                  <Badge 
                    variant="secondary" 
                    className={
                      profile.availability === 'available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'
                    }
                  >
                    {profile.availability || 'Available'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <StatsWidget
              title="Quick Stats"
              stats={[
                {
                  label: "Response Time",
                  value: `${profile.responseTime || 24}h`,
                  icon: Clock
                },
                {
                  label: "Success Rate",
                  value: `${profile.successRate || 0}%`,
                  icon: TrendingUp
                },
                {
                  label: "Total Projects",
                  value: profile.totalProjects || 0,
                  icon: Briefcase
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
              title="Active Projects"
              projects={[]}
              emptyMessage="No active projects. Browse available projects to get started!"
              actionLabel="Browse Projects"
              actionHref="/projects"
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
              title="Recommended Projects"
              recommendations={recommendations}
              userRole="freelancer"
            />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/projects">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Browse Projects
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/qa">
                    <Plus className="h-4 w-4 mr-2" />
                    Ask Question
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/profile/edit">
                    <Award className="h-4 w-4 mr-2" />
                    Take Skill Test
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Skill Development */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Skill Development</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <span className="text-orange-600 font-bold text-sm">R</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">React Advanced</p>
                        <p className="text-xs text-slate-600">Level 4/5</p>
                      </div>
                    </div>
                    <div className="w-16 bg-slate-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-sm">A</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">AWS Cloud</p>
                        <p className="text-xs text-slate-600">Level 2/5</p>
                      </div>
                    </div>
                    <div className="w-16 bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Take Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
