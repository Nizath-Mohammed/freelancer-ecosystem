import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsWidget } from "@/components/dashboard/stats-widget";
import { ProjectWidget } from "@/components/dashboard/project-widget";
import { ActivityWidget } from "@/components/dashboard/activity-widget";
import { Link } from "wouter";
import { 
  DollarSign, 
  Briefcase, 
  Users, 
  TrendingUp, 
  Building,
  Shield,
  Globe,
  BarChart3,
  Settings,
  Plus,
  FileText,
  Zap
} from "lucide-react";

export default function EnterpriseDashboard() {
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
      label: "Active Vendors",
      value: 45,
      icon: Users,
      change: 18
    },
    {
      label: "Total Spend",
      value: "$1.2M",
      format: "currency" as const,
      icon: DollarSign,
      change: 32
    },
    {
      label: "Active Projects",
      value: 23,
      icon: Briefcase,
      change: 15
    },
    {
      label: "Cost Savings",
      value: "35%",
      icon: TrendingUp,
      change: 8
    }
  ];

  const vendorCategories = [
    { name: "Software Development", count: 18, spend: "$450K", performance: 94 },
    { name: "Design & Creative", count: 12, spend: "$180K", performance: 91 },
    { name: "Marketing & Content", count: 8, spend: "$220K", performance: 88 },
    { name: "Data & Analytics", count: 7, spend: "$350K", performance: 96 }
  ];

  const recentActivities = [
    {
      id: "1",
      type: "project" as const,
      title: "New enterprise project initiated",
      description: "Digital transformation initiative - Phase 2 launched",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
    },
    {
      id: "2",
      type: "payment" as const,
      title: "Quarterly payment processed",
      description: "$125,000 paid to preferred vendor pool",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      metadata: { amount: "$125,000" }
    },
    {
      id: "3",
      type: "review" as const,
      title: "Vendor performance review completed",
      description: "Q4 vendor evaluation and ratings updated",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Enterprise Command Center</h1>
            <p className="text-slate-600">Oversee your global vendor network and project portfolio</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" asChild>
              <Link href="/vendors/manage">
                <Users className="h-4 w-4 mr-2" />
                Manage Vendors
              </Link>
            </Button>
            <Button asChild>
              <Link href="/projects/enterprise-post">
                <Plus className="h-4 w-4 mr-2" />
                New Initiative
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Enterprise Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Enterprise Profile */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
                    <Building className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Enterprise Account
                    </h3>
                    <p className="text-sm text-slate-600">Fortune 500 Company</p>
                    <Badge variant="secondary" className="mt-1">
                      <Shield className="h-3 w-3 mr-1 text-green-500" />
                      Verified Enterprise
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Global Vendors</span>
                    <span className="font-semibold">45 active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Compliance Score</span>
                    <span className="font-semibold text-green-600">98%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Risk Level</span>
                    <span className="font-semibold text-green-600">Low</span>
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
                  <Link href="/analytics/enterprise">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Advanced Analytics
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/compliance">
                    <Shield className="h-4 w-4 mr-2" />
                    Compliance Center
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/settings/enterprise">
                    <Settings className="h-4 w-4 mr-2" />
                    Enterprise Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Global Metrics */}
            <StatsWidget
              title="Global Metrics"
              stats={[
                {
                  label: "Regions Active",
                  value: "12",
                  icon: Globe
                },
                {
                  label: "Avg Project Size",
                  value: "$52K",
                  format: "currency",
                  icon: DollarSign
                },
                {
                  label: "Delivery Success",
                  value: "94%",
                  format: "percentage",
                  icon: Zap
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
                          {stat.value}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <stat.icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    {stat.change && (
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-500">+{stat.change}% from last quarter</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Vendor Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Vendor Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vendorCategories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-900">{category.name}</h4>
                        <p className="text-sm text-slate-600">{category.count} active vendors</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">{category.spend}</p>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm text-slate-600">Performance:</span>
                          <Badge 
                            variant="secondary" 
                            className={
                              category.performance >= 95 
                                ? 'bg-green-100 text-green-800' 
                                : category.performance >= 90 
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-red-100 text-red-800'
                            }
                          >
                            {category.performance}%
                          </Badge>
                        </div>
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

          {/* Right Sidebar - Strategic Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Strategic Initiatives */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Strategic Initiatives</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Digital Transformation", progress: 75, budget: "$500K", phase: "Phase 2" },
                    { name: "Cloud Migration", progress: 45, budget: "$300K", phase: "Phase 1" },
                    { name: "AI Implementation", progress: 30, budget: "$400K", phase: "Planning" }
                  ].map((initiative, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-slate-900">{initiative.name}</h4>
                        <Badge variant="outline">{initiative.phase}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Progress</span>
                          <span>{initiative.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${initiative.progress}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-slate-600">Budget: {initiative.budget}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compliance Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Compliance Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { item: "Security Audits", status: "Compliant", color: "green" },
                    { item: "Data Privacy", status: "Compliant", color: "green" },
                    { item: "Vendor Certifications", status: "Review Required", color: "amber" },
                    { item: "Contract Renewals", status: "3 Pending", color: "blue" }
                  ].map((compliance, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">{compliance.item}</span>
                      <Badge 
                        variant="secondary"
                        className={
                          compliance.color === 'green' 
                            ? 'bg-green-100 text-green-800'
                            : compliance.color === 'amber'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-blue-100 text-blue-800'
                        }
                      >
                        {compliance.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/compliance">
                    <FileText className="h-4 w-4 mr-2" />
                    Full Report
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
