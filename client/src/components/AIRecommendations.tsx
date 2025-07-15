import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Star, 
  DollarSign, 
  Zap,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from "lucide-react";

interface AIRecommendationsProps {
  className?: string;
}

export default function AIRecommendations({ className }: AIRecommendationsProps) {
  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['/api/ai/recommendations'],
  });

  const { data: skillAssessment } = useQuery({
    queryKey: ['/api/ai/skill-assessment'],
  });

  if (isLoading) {
    return (
      <div className={className}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* AI-Powered Project Recommendations */}
      <Card className="enterprise-card mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-conectify-primary" />
            <span>AI-Powered Project Recommendations</span>
            <Badge variant="secondary" className="bg-conectify-primary/10 text-conectify-primary">
              94% Match
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {recommendations?.projects?.map((project: any, index: number) => (
            <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-conectify-secondary mb-1">
                    {project.title}
                  </h4>
                  <p className="text-sm text-conectify-neutral">
                    {project.client}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-conectify-success">
                    ${project.budget.toLocaleString()}
                  </div>
                  <Badge variant="outline" className="text-conectify-primary border-conectify-primary">
                    {project.matchScore}% Match
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-conectify-neutral mb-3">
                {project.reason}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {project.skills.map((skill: string) => (
                  <Badge key={skill} variant="secondary" className="bg-slate-100">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <Button size="sm" className="bg-conectify-primary hover:bg-conectify-primary/90">
                View Project <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skill Development Recommendations */}
      <Card className="enterprise-card mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-conectify-primary" />
            <span>Skill Development Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {skillAssessment?.nextMilestone && (
            <div className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-conectify-secondary">
                  Next Milestone: {skillAssessment.nextMilestone.skill}
                </h4>
                <Badge variant="outline" className="text-orange-600 border-orange-600">
                  {skillAssessment.nextMilestone.estimatedTime}
                </Badge>
              </div>
              
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{skillAssessment.nextMilestone.currentLevel}% → {skillAssessment.nextMilestone.targetLevel}%</span>
                </div>
                <Progress 
                  value={skillAssessment.nextMilestone.currentLevel} 
                  className="h-2"
                />
              </div>
              
              <div className="space-y-2">
                {skillAssessment.nextMilestone.suggestedActions.map((action: string, index: number) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h5 className="font-medium text-conectify-secondary mb-2">Trending Skills in Your Category</h5>
            {recommendations?.skills?.map((skill: any, index: number) => (
              <div key={skill.name} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    skill.trend === 'rising' ? 'bg-green-500' : 
                    skill.trend === 'stable' ? 'bg-blue-500' : 'bg-orange-500'
                  }`}></div>
                  <div>
                    <div className="font-medium">{skill.name}</div>
                    <div className="text-sm text-conectify-neutral">
                      {skill.demand}% demand increase
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-conectify-success">
                    {skill.marketRate}
                  </div>
                  <div className="flex items-center text-sm">
                    <TrendingUp className={`h-3 w-3 mr-1 ${
                      skill.trend === 'rising' ? 'text-green-500' : 
                      skill.trend === 'stable' ? 'text-blue-500' : 'text-orange-500'
                    }`} />
                    {skill.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-conectify-primary" />
            <span>Market Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recommendations?.market && (
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <DollarSign className="h-8 w-8 text-conectify-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-conectify-secondary">
                  {recommendations.market.averageRate}
                </div>
                <div className="text-sm text-conectify-neutral">Market Average</div>
              </div>
              
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-conectify-secondary capitalize">
                  {recommendations.market.demandTrend}
                </div>
                <div className="text-sm text-conectify-neutral">Demand Trend</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}