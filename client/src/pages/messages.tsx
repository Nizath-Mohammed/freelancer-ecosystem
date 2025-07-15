import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EnhancedMessaging from "@/components/EnhancedMessaging";
import { MessageSquare, Users, Clock, TrendingUp } from "lucide-react";

export default function Messages() {
  const { user } = useAuth();

  const { data: conversations } = useQuery({
    queryKey: ["/api/conversations"],
    enabled: !!user,
  });

  const { data: analytics } = useQuery({
    queryKey: ["/api/analytics/messaging"],
    enabled: !!user,
  });

  const messageStats = [
    {
      title: "Total Conversations",
      value: conversations?.length || 0,
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Unread Messages", 
      value: conversations?.reduce((total: number, conv: any) => total + conv.unreadCount, 0) || 0,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      title: "Response Rate",
      value: "< 2 hours",
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Active Clients",
      value: conversations?.filter((conv: any) => conv.unreadCount > 0).length || 0,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-conectify-secondary">Professional Messages</h1>
          <p className="text-conectify-neutral mt-1">
            Communicate with clients, collaborators, and team members in real-time.
          </p>
        </div>
        <Badge variant="outline" className="text-conectify-success border-conectify-success">
          All messages secured with end-to-end encryption
        </Badge>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {messageStats.map((stat, index) => (
          <Card key={index} className="enterprise-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-conectify-neutral mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-conectify-secondary">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Messaging Component */}
      <EnhancedMessaging />
    </div>
  );
}