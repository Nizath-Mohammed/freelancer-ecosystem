import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Star, 
  Clock,
  DollarSign,
  Users,
  ArrowRight,
  Lightbulb
} from "lucide-react";
import { Link } from "wouter";

interface RecommendationItem {
  id: string;
  type: 'project' | 'skill' | 'opportunity' | 'tip';
  title: string;
  description: string;
  action: string;
  actionUrl?: string;
  icon: any;
  priority: 'high' | 'medium' | 'low';
  metadata?: {
    budget?: number;
    match?: number;
    timeToComplete?: string;
    clients?: number;
  };
}

interface RecommendationsWidgetProps {
  recommendations?: RecommendationItem[];
}

export default function RecommendationsWidget({ recommendations }: RecommendationsWidgetProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'project':
        return 'bg-blue-100 text-blue-800';
      case 'skill':
        return 'bg-green-100 text-green-800';
      case 'opportunity':
        return 'bg-purple-100 text-purple-800';
      case 'tip':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const mockRecommendations: RecommendationItem[] = [
    {
      id: '1',
      type: 'project',
      title: 'AI Chatbot Development',
      description: 'High-paying project matching your React and Node.js skills',
      action: 'View Project',
      actionUrl: '/projects/ai-chatbot-dev',
      icon: Target,
      priority: 'high',
      metadata: {
        budget: 4500,
        match: 94,
        timeToComplete: '2 weeks'
      }
    },
    {
      id: '2',
      type: 'skill',
      title: 'Learn TypeScript',
      description: 'Increase your hourly rate by 25% with TypeScript certification',
      action: 'Start Learning',
      actionUrl: '/learning/typescript',
      icon: TrendingUp,
      priority: 'medium',
      metadata: {
        timeToComplete: '3 weeks'
      }
    },
    {
      id: '3',
      type: 'opportunity',
      title: 'Enterprise Client Match',
      description: 'Fortune 500 company looking for your expertise',
      action: 'Connect Now',
      actionUrl: '/enterprise/connect',
      icon: Zap,
      priority: 'high',
      metadata: {
        clients: 3,
        match: 89
      }
    },
    {
      id: '4',
      type: 'tip',
      title: 'Optimize Your Profile',
      description: 'Add portfolio samples to increase proposal acceptance by 40%',
      action: 'Update Profile',
      actionUrl: '/profile/edit',
      icon: Lightbulb,
      priority: 'medium'
    },
    {
      id: '5',
      type: 'project',
      title: 'E-commerce Integration',
      description: 'Perfect match for your JavaScript and API experience',
      action: 'Submit Proposal',
      actionUrl: '/projects/ecommerce-integration',
      icon: Target,
      priority: 'medium',
      metadata: {
        budget: 3200,
        match: 87,
        timeToComplete: '10 days'
      }
    },
  ];

  return (
    <Card className="enterprise-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-conectify-secondary flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            AI Recommendations
          </CardTitle>
          <Badge variant="outline" className="text-conectify-primary border-conectify-primary">
            {mockRecommendations.length} new
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockRecommendations.slice(0, 4).map((recommendation) => {
            const Icon = recommendation.icon;
            return (
              <div
                key={recommendation.id}
                className={`p-4 rounded-lg border-2 ${getPriorityColor(recommendation.priority)} hover:shadow-sm transition-all`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      <Icon className="h-5 w-5 text-conectify-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-conectify-secondary truncate">
                        {recommendation.title}
                      </h4>
                      <Badge variant="outline" className={getTypeColor(recommendation.type)}>
                        {recommendation.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-conectify-neutral mb-3 line-clamp-2">
                      {recommendation.description}
                    </p>
                    
                    {/* Metadata */}
                    {recommendation.metadata && (
                      <div className="flex items-center space-x-4 mb-3 text-xs text-conectify-neutral">
                        {recommendation.metadata.budget && (
                          <div className="flex items-center">
                            <DollarSign className="h-3 w-3 mr-1" />
                            ${recommendation.metadata.budget.toLocaleString()}
                          </div>
                        )}
                        {recommendation.metadata.match && (
                          <div className="flex items-center">
                            <Target className="h-3 w-3 mr-1" />
                            {recommendation.metadata.match}% match
                          </div>
                        )}
                        {recommendation.metadata.timeToComplete && (
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {recommendation.metadata.timeToComplete}
                          </div>
                        )}
                        {recommendation.metadata.clients && (
                          <div className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {recommendation.metadata.clients} clients
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          recommendation.priority === 'high' ? 'bg-red-100 text-red-800' :
                          recommendation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {recommendation.priority} priority
                        </span>
                      </div>
                      {recommendation.actionUrl ? (
                        <Link href={recommendation.actionUrl}>
                          <Button size="sm" className="bg-conectify-primary hover:bg-conectify-primary/90 text-white">
                            {recommendation.action}
                            <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </Link>
                      ) : (
                        <Button size="sm" className="bg-conectify-primary hover:bg-conectify-primary/90 text-white">
                          {recommendation.action}
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}