import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, DollarSign, Users, Star, Clock } from "lucide-react";

interface StatsWidgetProps {
  stats: {
    totalProjects: number;
    totalEarnings: number;
    averageRating: number;
    completionRate: number;
    activeProjects: number;
    newClients: number;
    responseTime: string;
    successRate: number;
  };
}

export default function StatsWidget({ stats }: StatsWidgetProps) {
  const statCards = [
    {
      title: "Total Earnings",
      value: `$${stats.totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      trend: { value: 12, isPositive: true },
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Active Projects",
      value: stats.activeProjects.toString(),
      icon: Users,
      trend: { value: 3, isPositive: true },
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Average Rating",
      value: `${stats.averageRating}/5`,
      icon: Star,
      trend: { value: 0.2, isPositive: true },
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Completion Rate",
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      trend: { value: 5, isPositive: true },
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "New Clients",
      value: stats.newClients.toString(),
      icon: Users,
      trend: { value: 2, isPositive: true },
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Response Time",
      value: stats.responseTime,
      icon: Clock,
      trend: { value: 15, isPositive: false },
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <Card className="enterprise-card">
      <CardHeader>
        <CardTitle className="text-conectify-secondary">Performance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`p-4 rounded-lg ${stat.bgColor} border border-opacity-20`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                    <span className="text-sm font-medium text-conectify-neutral">{stat.title}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {stat.trend.isPositive ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-xs font-medium ${
                      stat.trend.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend.isPositive ? '+' : '-'}{stat.trend.value}%
                    </span>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-2xl font-bold text-conectify-secondary">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}