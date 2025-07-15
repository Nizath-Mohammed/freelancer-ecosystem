import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Clock, 
  Target, 
  Award,
  DollarSign,
  Users,
  CheckCircle,
  Star,
  Zap
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface AdvancedAnalyticsProps {
  className?: string;
}

export default function AdvancedAnalytics({ className }: AdvancedAnalyticsProps) {
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['/api/analytics/dashboard'],
  });

  if (isLoading) {
    return (
      <div className={className}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const performanceMetrics = [
    {
      title: "Response Time",
      value: analytics?.performance?.responseTime || "0",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "Average response to messages"
    },
    {
      title: "Completion Rate", 
      value: `${analytics?.performance?.completionRate || 0}%`,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "Projects completed successfully"
    },
    {
      title: "Client Satisfaction",
      value: `${analytics?.performance?.clientSatisfaction || 0}/5`,
      icon: Star,
      color: "text-yellow-600", 
      bgColor: "bg-yellow-100",
      description: "Average client rating"
    },
    {
      title: "Repeat Clients",
      value: `${analytics?.performance?.repeatClientRate || 0}%`,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100", 
      description: "Clients who return for more work"
    }
  ];

  return (
    <div className={className}>
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="enterprise-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-conectify-neutral mb-1">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold text-conectify-secondary">
                    {metric.value}
                  </p>
                  <p className="text-xs text-conectify-neutral mt-1">
                    {metric.description}
                  </p>
                </div>
                <div className={`w-12 h-12 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
                  <metric.icon className={`h-6 w-6 ${metric.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Earnings Analytics */}
      <Card className="enterprise-card mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-conectify-primary" />
            <span>Earnings Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-conectify-neutral">This Month</p>
                <p className="text-3xl font-bold text-conectify-secondary">
                  ${analytics?.earnings?.thisMonth?.toLocaleString() || 0}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500">
                    +{analytics?.earnings?.growth || 0}% from last month
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-conectify-neutral">Projected Next Month</p>
                <p className="text-xl font-semibold text-conectify-primary">
                  ${analytics?.earnings?.projection?.toLocaleString() || 0}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-conectify-neutral">Average Hourly Rate</p>
                <p className="text-2xl font-bold text-conectify-success">
                  ${analytics?.earnings?.averageHourlyRate || 0}/hr
                </p>
              </div>
              
              <div>
                <p className="text-sm text-conectify-neutral">Top Paying Client</p>
                <p className="font-medium text-conectify-secondary">
                  {analytics?.earnings?.topPayingClient || "N/A"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center p-4 bg-gradient-to-br from-conectify-primary/10 to-blue-50 rounded-lg">
                <Award className="h-8 w-8 text-conectify-primary mx-auto mb-2" />
                <p className="text-sm text-conectify-neutral">Total Earned</p>
                <p className="text-2xl font-bold text-conectify-primary">
                  ${((analytics?.earnings?.thisMonth || 0) + (analytics?.earnings?.lastMonth || 0)).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity & Market Position */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-conectify-primary" />
              <span>Activity Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-conectify-neutral">Projects Completed</span>
              <span className="font-semibold">{analytics?.activity?.projectsCompleted || 0}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-conectify-neutral">Active Projects</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {analytics?.activity?.activeProjects || 0}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-conectify-neutral">Proposal Win Rate</span>
              <div className="flex items-center space-x-2">
                <Progress 
                  value={analytics?.activity?.proposalWinRate || 0} 
                  className="w-16 h-2"
                />
                <span className="font-semibold">{analytics?.activity?.proposalWinRate || 0}%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-conectify-neutral">Total Hours Worked</span>
              <span className="font-semibold">{analytics?.activity?.totalHoursWorked || 0}h</span>
            </div>
          </CardContent>
        </Card>

        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-conectify-primary" />
              <span>Market Position</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-conectify-neutral">Category Ranking</span>
                <Badge variant="outline" className="text-conectify-primary border-conectify-primary">
                  #{analytics?.market?.rankingInCategory || 0}
                </Badge>
              </div>
              <p className="text-xs text-conectify-neutral">
                Out of {analytics?.market?.totalFreelancers?.toLocaleString() || 0} freelancers
              </p>
            </div>

            <div>
              <p className="text-sm text-conectify-neutral mb-2">Skill Demand</p>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="font-medium capitalize text-green-600">
                  {analytics?.market?.skillDemandTrend || "stable"}
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm text-conectify-neutral mb-2">Competitive Advantages</p>
              <div className="space-y-1">
                {analytics?.market?.competitiveAdvantage?.map((advantage: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Zap className="h-3 w-3 text-conectify-primary" />
                    <span className="text-sm">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}