import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  Star, 
  Briefcase,
  MessageSquare,
  Award,
  ArrowRight
} from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user } = useAuth();

  const { data: dashboardStats } = useQuery({
    queryKey: [`/api/users/${user?.id}/dashboard`],
    enabled: !!user?.id,
  });

  const { data: notifications } = useQuery({
    queryKey: ["/api/notifications"],
    enabled: !!user?.id,
  });

  const { data: userBadges } = useQuery({
    queryKey: [`/api/users/${user?.id}/badges`],
    enabled: !!user?.id,
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const levelProgress = user?.experience ? (user.experience % 1000) / 10 : 0;
  const currentLevel = user?.level || 1;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {getGreeting()}, {user?.firstName || 'there'}! 👋
          </h1>
          <p className="text-slate-600 mt-1">
            Here's what's happening with your freelancing journey today.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-amber-600 border-amber-600">
            Level {currentLevel}
          </Badge>
          <Link href="/dashboard">
            <Button>
              View Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Level Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-900">Level Progress</h3>
              <p className="text-sm text-slate-600">
                {user?.experience || 0} / {(currentLevel * 1000)} XP
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-amber-600">Level {currentLevel}</p>
              <p className="text-sm text-slate-600">{Math.round(levelProgress)}% to next level</p>
            </div>
          </div>
          <Progress value={levelProgress} className="h-3" />
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Projects</p>
                <p className="text-2xl font-bold text-slate-900">
                  {dashboardStats?.totalProjects || 0}
                </p>
              </div>
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Earnings</p>
                <p className="text-2xl font-bold text-slate-900">
                  ${dashboardStats?.totalEarnings?.toLocaleString() || '0'}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Average Rating</p>
                <p className="text-2xl font-bold text-slate-900">
                  {dashboardStats?.averageRating?.toFixed(1) || '0.0'}
                </p>
              </div>
              <Star className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Active Projects</p>
                <p className="text-2xl font-bold text-slate-900">
                  {dashboardStats?.activeProjects || 0}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Badges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5" />
              Recent Badges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userBadges?.slice(0, 3).map((userBadge: any, index: number) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <Award className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">New Badge Earned!</p>
                  <p className="text-xs text-slate-600">Achievement unlocked</p>
                </div>
              </div>
            )) || (
              <p className="text-sm text-slate-600">No badges earned yet. Complete projects to earn your first badge!</p>
            )}
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="w-full">
                View All Badges
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notifications?.slice(0, 4).map((notification: any) => (
              <div key={notification.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">{notification.title}</p>
                  <p className="text-xs text-slate-600">{notification.content}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )) || (
              <p className="text-sm text-slate-600">No recent activity. Start exploring projects!</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/projects">
              <Button className="w-full justify-start" variant="ghost">
                <Briefcase className="mr-2 h-4 w-4" />
                Browse Projects
              </Button>
            </Link>
            <Link href="/qa">
              <Button className="w-full justify-start" variant="ghost">
                <MessageSquare className="mr-2 h-4 w-4" />
                Q&A Community
              </Button>
            </Link>
            <Link href="/profile">
              <Button className="w-full justify-start" variant="ghost">
                <Users className="mr-2 h-4 w-4" />
                Update Profile
              </Button>
            </Link>
            {user?.userType === 'agency' && (
              <Link href="/agency">
                <Button className="w-full justify-start" variant="ghost">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Agency Dashboard
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
