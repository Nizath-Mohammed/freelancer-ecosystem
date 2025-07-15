import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MessageSquare, 
  Briefcase, 
  Award, 
  DollarSign, 
  Clock, 
  CheckCircle,
  AlertCircle,
  TrendingUp
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ActivityItem {
  id: string;
  type: 'message' | 'project' | 'badge' | 'payment' | 'proposal' | 'review';
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
  };
  metadata?: {
    amount?: number;
    rating?: number;
    status?: string;
  };
}

interface ActivityWidgetProps {
  activities: ActivityItem[];
}

export default function ActivityWidget({ activities }: ActivityWidgetProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'project':
        return <Briefcase className="h-4 w-4 text-green-500" />;
      case 'badge':
        return <Award className="h-4 w-4 text-yellow-500" />;
      case 'payment':
        return <DollarSign className="h-4 w-4 text-emerald-500" />;
      case 'proposal':
        return <TrendingUp className="h-4 w-4 text-purple-500" />;
      case 'review':
        return <CheckCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-slate-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'message':
        return 'border-l-blue-500 bg-blue-50';
      case 'project':
        return 'border-l-green-500 bg-green-50';
      case 'badge':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'payment':
        return 'border-l-emerald-500 bg-emerald-50';
      case 'proposal':
        return 'border-l-purple-500 bg-purple-50';
      case 'review':
        return 'border-l-orange-500 bg-orange-50';
      default:
        return 'border-l-slate-500 bg-slate-50';
    }
  };

  const mockActivities: ActivityItem[] = [
    {
      id: '1',
      type: 'payment',
      title: 'Payment Received',
      description: 'E-commerce Platform Development',
      timestamp: new Date().toISOString(),
      user: { name: 'TechCorp Inc.' },
      metadata: { amount: 2500 }
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      description: 'Thanks for the excellent work on the project!',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      user: { name: 'Sarah Johnson' }
    },
    {
      id: '3',
      type: 'project',
      title: 'Project Completed',
      description: 'Mobile App Backend API',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      user: { name: 'StartupXYZ' },
      metadata: { status: 'completed' }
    },
    {
      id: '4',
      type: 'review',
      title: 'New Review',
      description: 'Received 5-star rating for React Dashboard',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      user: { name: 'Michael Chen' },
      metadata: { rating: 5 }
    },
    {
      id: '5',
      type: 'badge',
      title: 'Badge Earned',
      description: 'Achieved "Top Rated" status',
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      metadata: { status: 'earned' }
    },
    {
      id: '6',
      type: 'proposal',
      title: 'New Proposal',
      description: 'Submitted proposal for AI Chatbot Development',
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      user: { name: 'InnovateAI' },
      metadata: { amount: 3500 }
    },
  ];

  return (
    <Card className="enterprise-card">
      <CardHeader>
        <CardTitle className="text-conectify-secondary flex items-center justify-between">
          Recent Activity
          <Badge variant="outline" className="text-conectify-primary border-conectify-primary">
            {mockActivities.length} new
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {mockActivities.map((activity) => (
              <div
                key={activity.id}
                className={`p-3 rounded-lg border-l-4 ${getActivityColor(activity.type)} transition-all hover:shadow-sm`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-conectify-secondary truncate">
                        {activity.title}
                      </h4>
                      <div className="flex items-center text-xs text-conectify-neutral">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                      </div>
                    </div>
                    <p className="text-sm text-conectify-neutral mt-1 line-clamp-2">
                      {activity.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      {activity.user && (
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-5 w-5">
                            <AvatarImage src={activity.user.avatar} />
                            <AvatarFallback className="text-xs">
                              {activity.user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-conectify-neutral">{activity.user.name}</span>
                        </div>
                      )}
                      {activity.metadata && (
                        <div className="flex items-center space-x-2">
                          {activity.metadata.amount && (
                            <Badge variant="secondary" className="text-xs bg-conectify-accent text-conectify-secondary">
                              ${activity.metadata.amount.toLocaleString()}
                            </Badge>
                          )}
                          {activity.metadata.rating && (
                            <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                              {activity.metadata.rating}★
                            </Badge>
                          )}
                          {activity.metadata.status && (
                            <Badge variant="outline" className="text-xs">
                              {activity.metadata.status}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}