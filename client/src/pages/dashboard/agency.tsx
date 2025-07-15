import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/user-avatar";
import { StatsWidget } from "@/components/dashboard/stats-widget";
import { ProjectWidget } from "@/components/dashboard/project-widget";
import { ActivityWidget } from "@/components/dashboard/activity-widget";
import { Link } from "wouter";
import { 
  DollarSign, 
  Briefcase, 
  Star, 
  TrendingUp, 
  Users,
  Clock,
  Target,
  Plus,
  UserPlus,
  BarChart3,
  Calendar
} from "lucide-react";

export default function AgencyDashboard() {
  const { user } = useAuth();

  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = dashboardData || {};

  const statsData = [
    {
      label: "Team Members",
      value: 12,
      icon: Users,
      change: 15
    },
    {
      label: "Monthly Revenue",
      value: "$45,200",
      format: "currency" as const,
      icon: DollarSign,
      change: 22
    },
    {
      label: "Active Projects",
      value: 8,
      icon: Briefcase,
      change: 10
    },
    {
      label: "Client Satisfaction",
      value: "4.8/5",
      icon: Star,
      change: 5
    }
  ];

  const teamMembers = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Senior Developer",
      status: "available",
      activeProjects: 2,
      rating: 4.9,
      earnings: "$8,400"
    },
    {
      id: "2", 
      name: "Mike Chen",
      role: "UI/UX Designer",
      status: "busy",
      activeProjects: 3,
      rating: 4.8,
      earnings: "$6,200"
    },
    {
      id: "3",
      name: "Alex Rodriguez",
      role: "Full-Stack Developer",
      status: "available", 
      activeProjects: 1,
      rating: 4.7,
      earnings: "$7,800"
    }
  ];

  const recentActivities = [
    {
      id: "1",
      type: "project" as const,
      title: "New client onboarded",
      description: "TechFlow Inc. signed a 3-month contract",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: "2",
      type: "payment" as const,
      title: "Invoice paid",
      description: "$12,500 payment received from FinanceFlow",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      metadata: { amount: "$12,500" }
    },
    {
      id: "3",
      type: "review" as const,
      title: "5-star client review",
      description: "Excellent work on the e-commerce platform",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      metadata: { rating: 5 }
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Agency Dashboard</h1>
            <p className="text-slate-600">Manage your team, clients, and projects</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" asChild>
              <Link href="/projects/post">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Link>
            </Button>
            <Button asChild>
              <Link href="/team/invite">
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Member
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Agency Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Agency Profile */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {user?.firstName}'s Agency
                    </h3>
                    <p className="text-sm text-slate-600">Digital Solutions</p>
                    <Badge variant="secondary" className="mt-1">
                      <Star className="h-3 w-3 mr-1 text-amber-500" />
                      Top Rated Agency
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Team Size</span>
                    <span className="font-semibold">12 members</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Success Rate</span>
                    <span className="font-semibold text-green-600">98%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Avg Response</span>
                    <span className="font-semibold">2 hours</span>
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
                  <Link href="/team">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Team
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/clients">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Client CRM
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/analytics">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <StatsWidget
              title="Performance Metrics"
              stats={[
                {
                  label: "Utilization Rate",
                  value: "85%",
                  format: "percentage",
                  icon: Target
                },
                {
                  label: "Avg Project Value",
                  value: "$8,500",
                  format: "currency",
                  icon: DollarSign
                },
                {
                  label: "Team Efficiency",
                  value: "92%",
                  format: "percentage",
                  icon: TrendingUp
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
                            ? stat.value
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

            {/* Team Overview */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">Team Members</CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/team">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <UserAvatar user={{ firstName: member.name.split(' ')[0] }} size="md" />
                        <div>
                          <h4 className="font-medium text-slate-900">{member.name}</h4>
                          <p className="text-sm text-slate-600">{member.role}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge 
                              variant="secondary" 
                              className={member.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}
                            >
                              {member.status}
                            </Badge>
                            <span className="text-xs text-slate-500">{member.activeProjects} active projects</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Star className="h-3 w-3 text-amber-400 fill-current" />
                          <span className="text-sm font-medium">{member.rating}</span>
                        </div>
                        <p className="text-sm text-slate-600">{member.earnings} this month</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <ActivityWidget
              title="Recent Activity"
              activities={recentActivities}
            />
          </div>

          {/* Right Sidebar - Clients & Calendar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Client Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Active Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "TechFlow Inc.", projects: 2, value: "$15,000" },
                    { name: "FinanceFlow", projects: 1, value: "$8,500" },
                    { name: "StartupCo", projects: 3, value: "$22,000" }
                  ].map((client, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-slate-900">{client.name}</h4>
                        <p className="text-sm text-slate-600">{client.projects} active projects</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">{client.value}</p>
                        <p className="text-xs text-slate-500">total value</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/clients">View All Clients</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Upcoming Deadlines */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Upcoming Deadlines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { project: "E-commerce Platform", client: "TechFlow", due: "Tomorrow", urgent: true },
                    { project: "Mobile App Design", client: "FinanceFlow", due: "Jan 15", urgent: false },
                    { project: "API Development", client: "StartupCo", due: "Jan 20", urgent: false }
                  ].map((deadline, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900">{deadline.project}</h4>
                        <p className="text-sm text-slate-600">{deadline.client}</p>
                      </div>
                      <Badge 
                        variant={deadline.urgent ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {deadline.due}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
