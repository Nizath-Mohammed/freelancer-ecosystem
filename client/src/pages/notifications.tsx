import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Bell,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Briefcase,
  DollarSign,
  Award,
  User,
  Settings,
  Trash2,
  Mail
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  type: 'message' | 'project' | 'payment' | 'badge' | 'proposal' | 'review' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  metadata?: any;
  user?: {
    firstName: string;
    lastName: string;
    profileImageUrl?: string;
  };
}

export default function Notifications() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['/api/notifications'],
    enabled: !!user,
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      return apiRequest(`/api/notifications/${notificationId}/read`, {
        method: 'POST',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notifications'] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('/api/notifications/mark-all-read', {
        method: 'POST',
      });
    },
    onSuccess: () => {
      toast({ description: 'All notifications marked as read' });
      queryClient.invalidateQueries({ queryKey: ['/api/notifications'] });
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: async (notificationId: string) => {
      return apiRequest(`/api/notifications/${notificationId}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/notifications'] });
    },
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'project':
        return <Briefcase className="h-5 w-5 text-green-500" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-emerald-500" />;
      case 'badge':
        return <Award className="h-5 w-5 text-yellow-500" />;
      case 'proposal':
        return <User className="h-5 w-5 text-purple-500" />;
      case 'review':
        return <CheckCircle className="h-5 w-5 text-orange-500" />;
      case 'system':
        return <Settings className="h-5 w-5 text-gray-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'message':
        return 'border-l-blue-500';
      case 'project':
        return 'border-l-green-500';
      case 'payment':
        return 'border-l-emerald-500';
      case 'badge':
        return 'border-l-yellow-500';
      case 'proposal':
        return 'border-l-purple-500';
      case 'review':
        return 'border-l-orange-500';
      case 'system':
        return 'border-l-gray-500';
      default:
        return 'border-l-gray-500';
    }
  };

  // Mock notifications for demonstration
  const mockNotifications: Notification[] = [
    {
      id: '1',
      type: 'payment',
      title: 'Payment Received',
      message: 'You received $2,500 for E-commerce Platform Development',
      isRead: false,
      createdAt: new Date().toISOString(),
      user: { firstName: 'TechCorp', lastName: 'Inc.' },
      metadata: { amount: 2500, projectId: '123' }
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      message: 'Sarah Johnson sent you a message about the project requirements',
      isRead: false,
      createdAt: new Date(Date.now() - 1800000).toISOString(),
      user: { firstName: 'Sarah', lastName: 'Johnson' }
    },
    {
      id: '3',
      type: 'proposal',
      title: 'Proposal Accepted',
      message: 'Your proposal for Mobile App Backend API has been accepted',
      isRead: true,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      user: { firstName: 'StartupXYZ', lastName: '' },
      metadata: { projectId: '456', budget: 3000 }
    },
    {
      id: '4',
      type: 'review',
      title: 'New Review',
      message: 'Michael Chen left a 5-star review for your React Dashboard project',
      isRead: true,
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      user: { firstName: 'Michael', lastName: 'Chen' },
      metadata: { rating: 5, projectId: '789' }
    },
    {
      id: '5',
      type: 'badge',
      title: 'Badge Earned',
      message: 'Congratulations! You earned the "Top Rated" badge for maintaining excellent ratings',
      isRead: false,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      metadata: { badgeId: 'top-rated' }
    },
    {
      id: '6',
      type: 'project',
      title: 'Project Milestone',
      message: 'Milestone 2 of WordPress Plugin Development has been completed',
      isRead: true,
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      user: { firstName: 'WebSolutions', lastName: '' },
      metadata: { projectId: '101', milestone: 2 }
    },
    {
      id: '7',
      type: 'system',
      title: 'Profile Update',
      message: 'Your profile has been updated with new skills and certifications',
      isRead: true,
      createdAt: new Date(Date.now() - 259200000).toISOString()
    }
  ];

  const filteredNotifications = mockNotifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.isRead;
      case 'read':
        return notification.isRead;
      default:
        return true;
    }
  });

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  const handleMarkAsRead = (notificationId: string) => {
    markAsReadMutation.mutate(notificationId);
  };

  const handleMarkAllAsRead = () => {
    markAllAsReadMutation.mutate();
  };

  const handleDeleteNotification = (notificationId: string) => {
    deleteNotificationMutation.mutate(notificationId);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-conectify-secondary">Notifications</h1>
          <p className="text-conectify-neutral">
            Stay updated with your latest activities and messages
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="text-conectify-primary border-conectify-primary">
            {unreadCount} unread
          </Badge>
          <Button
            variant="outline"
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
          >
            <Mail className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <Tabs value={filter} onValueChange={(value) => setFilter(value as any)}>
        <TabsList>
          <TabsTrigger value="all">All ({mockNotifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="read">Read ({mockNotifications.length - unreadCount})</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card className="enterprise-card">
              <CardContent className="p-8 text-center">
                <Bell className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-conectify-secondary mb-2">
                  No notifications found
                </h3>
                <p className="text-conectify-neutral">
                  {filter === 'unread' 
                    ? "You're all caught up! No unread notifications." 
                    : "No notifications to display."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`enterprise-card border-l-4 ${getNotificationColor(notification.type)} ${
                    !notification.isRead ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-conectify-secondary">
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                New
                              </Badge>
                            )}
                          </div>
                          <span className="text-sm text-conectify-neutral">
                            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-sm text-conectify-neutral mb-3">
                          {notification.message}
                        </p>
                        
                        {/* User Info */}
                        {notification.user && (
                          <div className="flex items-center space-x-2 mb-3">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={notification.user.profileImageUrl} />
                              <AvatarFallback className="text-xs">
                                {notification.user.firstName[0]}{notification.user.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-conectify-neutral">
                              {notification.user.firstName} {notification.user.lastName}
                            </span>
                          </div>
                        )}

                        {/* Metadata */}
                        {notification.metadata && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {notification.metadata.amount && (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">
                                ${notification.metadata.amount.toLocaleString()}
                              </Badge>
                            )}
                            {notification.metadata.rating && (
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                {notification.metadata.rating}★
                              </Badge>
                            )}
                            {notification.metadata.milestone && (
                              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                                Milestone {notification.metadata.milestone}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          {!notification.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Mark as Read
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteNotification(notification.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}