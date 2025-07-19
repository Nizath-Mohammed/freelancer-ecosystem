import { TrendingUp, Clock, DollarSign, Users, Star, Eye, Bookmark, MessageSquare } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProjectMetricsProps {
  totalProjects: number;
  newProjects: number;
  totalBudget: number;
  averageBudget: number;
  competitionLevel: 'low' | 'medium' | 'high';
  trendingProjects: number;
  savedProjects: number;
  viewedProjects: number;
}

export const ProjectMetrics = ({
  totalProjects,
  newProjects,
  totalBudget,
  averageBudget,
  competitionLevel,
  trendingProjects,
  savedProjects,
  viewedProjects
}: ProjectMetricsProps) => {
  const getCompetitionColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-success/10 text-success';
      case 'medium': return 'bg-warning/10 text-warning';
      case 'high': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  const metrics = [
    {
      title: 'Total Projects',
      value: totalProjects.toLocaleString(),
      change: `+${newProjects} new`,
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Total Value',
      value: `$${(totalBudget / 1000).toFixed(0)}K`,
      change: `Avg: $${averageBudget.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-success'
    },
    {
      title: 'Trending',
      value: trendingProjects.toString(),
      change: 'Hot projects',
      icon: TrendingUp,
      color: 'text-trending'
    },
    {
      title: 'Your Activity',
      value: savedProjects.toString(),
      change: `${viewedProjects} viewed`,
      icon: Bookmark,
      color: 'text-warning'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-4 hover-lift">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <h3 className="text-2xl font-bold text-foreground">{metric.value}</h3>
                <p className={`text-xs ${metric.color}`}>{metric.change}</p>
              </div>
              <div className="p-2 rounded-lg bg-secondary">
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Market Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Market Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Competition Level</span>
              <Badge className={getCompetitionColor(competitionLevel)}>
                {competitionLevel.charAt(0).toUpperCase() + competitionLevel.slice(1)}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {competitionLevel === 'low' && 'Great time to apply! Lower competition.'}
              {competitionLevel === 'medium' && 'Moderate competition. Stand out with quality.'}
              {competitionLevel === 'high' && 'High competition. Focus on niche skills.'}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Best Time to Apply</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Most clients are active 9-11 AM EST
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium">Success Rate</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Apply within first 24 hours for 3x better chances
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};