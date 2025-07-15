import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useWebSocket } from "@/hooks/useWebSocket";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  X, 
  Check, 
  Star, 
  DollarSign, 
  MessageSquare, 
  Briefcase,
  Award,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface RealTimeNotificationsProps {
  className?: string;
}

export default function RealTimeNotifications({ className }: RealTimeNotificationsProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  const { data: fetchedNotifications } = useQuery({
    queryKey: ['/api/notifications'],
    enabled: !!user,
  });

  // WebSocket connection for real-time updates
  useEffect(() => {
    if (fetchedNotifications) {
      setNotifications(fetchedNotifications);
    }
  }, [fetchedNotifications]);

  // Simulate real-time notifications for demo
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(() => {
      // Simulate receiving a new notification every 30 seconds for demo
      const newNotification = {
        id: `notif-${Date.now()}`,
        type: ['project', 'proposal', 'message', 'badge'][Math.floor(Math.random() * 4)],
        title: getRandomNotificationTitle(),
        message: getRandomNotificationMessage(),
        isRead: false,
        createdAt: new Date().toISOString(),
        metadata: {}
      };

      setNotifications(prev => [newNotification, ...prev]);
      
      // Show toast for new notification
      toast({
        title: newNotification.title,
        description: newNotification.message,
      });
    }, 30000); // Every 30 seconds for demo

    return () => clearInterval(interval);
  }, [user]);

  function getRandomNotificationTitle() {
    const titles = [
      "New Project Match",
      "Proposal Update", 
      "Message Received",
      "Badge Earned",
      "Payment Processed",
      "Project Milestone"
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

  function getRandomNotificationMessage() {
    const messages = [
      "A new project matching your skills is available!",
      "Your proposal has been reviewed by the client.",
      "You have a new message from a potential client.", 
      "Congratulations! You've earned a new achievement.",
      "Payment has been processed for your completed work.",
      "A project milestone has been updated."
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'project': return <Briefcase className="h-4 w-4" />;
      case 'proposal': return <Star className="h-4 w-4" />;
      case 'message': return <MessageSquare className="h-4 w-4" />;
      case 'badge': return <Award className="h-4 w-4" />;
      case 'payment': return <DollarSign className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'project': return 'text-blue-600 bg-blue-100';
      case 'proposal': return 'text-purple-600 bg-purple-100';
      case 'message': return 'text-green-600 bg-green-100';
      case 'badge': return 'text-yellow-600 bg-yellow-100';
      case 'payment': return 'text-emerald-600 bg-emerald-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, isRead: true }
          : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const removeNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notif => notif.id !== notificationId)
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className={`relative ${className}`}>
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="sm"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notifications Dropdown */}
      {isOpen && (
        <Card className="absolute top-12 right-0 w-96 z-50 enterprise-card shadow-lg border">
          <CardContent className="p-0">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-conectify-primary" />
                <h3 className="font-semibold text-conectify-secondary">Notifications</h3>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="bg-conectify-primary/10 text-conectify-primary">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <ScrollArea className="h-96">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600">No notifications yet</p>
                  <p className="text-sm text-slate-400">We'll notify you when something happens</p>
                </div>
              ) : (
                <div className="divide-y">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer ${
                        !notification.isRead ? 'bg-blue-50/30' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`text-sm font-medium ${!notification.isRead ? 'text-conectify-secondary' : 'text-slate-600'}`}>
                              {notification.title}
                            </h4>
                            <div className="flex items-center space-x-2">
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-conectify-primary rounded-full"></div>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeNotification(notification.id);
                                }}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <p className="text-sm text-slate-600 mt-1">
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-slate-400">
                              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                            </span>
                            
                            {notification.metadata?.actionRequired && (
                              <Button size="sm" variant="outline" className="h-6 text-xs">
                                View
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-4 border-t text-center">
                <Button variant="ghost" size="sm" className="text-conectify-primary">
                  View all notifications
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}