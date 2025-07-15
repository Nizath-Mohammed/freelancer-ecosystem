import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Clock, 
  Star, 
  DollarSign,
  CheckCircle,
  Users,
  Award,
  BarChart3
} from "lucide-react";

interface PerformanceMetricsProps {
  className?: string;
}

export default function PerformanceMetrics({ className }: PerformanceMetricsProps) {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ['/api/analytics/performance'],
    queryFn: async () => {
      // Mock comprehensive performance data
      return {
        overallScore: 94,
        categories: {
          quality: { score: 96, trend: 'up', change: 3 },
          delivery: { score: 92, trend: 'up', change: 1 },
          communication: { score: 95, trend: 'stable', change: 0 },
          satisfaction: { score: 94, trend: 'up', change: 2 }
        },
        metrics: {
          responseTime: { value: '1.2 hours', improvement: 15, isGood: true },
          projectSuccess: { value: 98, improvement: 2, isGood: true },
          clientRetention: { value: 87, improvement: 5, isGood: true },
          deadlineMet: { value: 96, improvement: 1, isGood: true }
        },
        comparison: {
          categoryRank: 15,
          totalFreelancers: 2847,
          percentile: 95
        },
        achievements: [
          { title: 'Top 5% Performer', description: 'Consistently high ratings', earned: true },
          { title: 'Fast Responder', description: 'Average response < 2 hours', earned: true },
          { title: 'Quality Expert', description: '95%+ satisfaction rate', earned: true },
          { title: 'Deadline Master', description: '95%+ on-time delivery', earned: false, progress: 96 }
        ]
      };
    },
  });

  if (isLoading) {
    return (
      <div className={className}>
        <div className="space-y-6 animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <BarChart3 className="h-4 w-4 text-blue-500" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-blue-600';
    }
  };

  return (
    <div className={className}>
      {/* Overall Performance Score */}
      <Card className="enterprise-card mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Performance Overview</span>
            <Badge variant="outline" className="text-conectify-primary border-conectify-primary">
              Top {metrics?.comparison?.percentile}% Performer
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-conectify-primary">
                    {metrics?.overallScore}
                  </div>
                  <div className="text-sm text-conectify-neutral">Overall Score</div>
                </div>
              </div>
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="transparent"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="transparent"
                  stroke="#007bff"
                  strokeWidth="2"
                  strokeDasharray={`${metrics?.overallScore || 0} 100`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(metrics?.categories || {}).map(([category, data]: [string, any]) => (
              <div key={category} className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <span className="text-lg font-bold text-conectify-secondary">{data.score}</span>
                  {getTrendIcon(data.trend)}
                </div>
                <div className="text-sm text-conectify-neutral capitalize">{category}</div>
                {data.change !== 0 && (
                  <div className={`text-xs ${getTrendColor(data.trend)}`}>
                    {data.change > 0 ? '+' : ''}{data.change} pts
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card className="enterprise-card mb-6">
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(metrics?.metrics || {}).map(([key, metric]: [string, any]) => {
              const icons = {
                responseTime: Clock,
                projectSuccess: CheckCircle,
                clientRetention: Users,
                deadlineMet: Target
              };
              const Icon = icons[key as keyof typeof icons] || BarChart3;

              return (
                <div key={key} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-conectify-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-conectify-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-conectify-secondary capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      {metric.improvement > 0 && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          +{metric.improvement}%
                        </Badge>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-conectify-secondary">
                      {typeof metric.value === 'number' ? `${metric.value}%` : metric.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Achievements & Goals */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-conectify-primary" />
            <span>Achievements & Goals</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics?.achievements?.map((achievement: any, index: number) => (
              <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  achievement.earned ? 'bg-green-100' : 'bg-slate-100'
                }`}>
                  {achievement.earned ? (
                    <Award className="h-6 w-6 text-green-600" />
                  ) : (
                    <Target className="h-6 w-6 text-slate-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-conectify-secondary">
                      {achievement.title}
                    </h4>
                    {achievement.earned ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Earned
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-slate-600">
                        In Progress
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-conectify-neutral mb-2">
                    {achievement.description}
                  </p>
                  {!achievement.earned && achievement.progress && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}