import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardWidget from "@/components/DashboardWidget";
import AIRecommendations from "@/components/AIRecommendations";
import AdvancedAnalytics from "@/components/AdvancedAnalytics";
import LevelProgress from "@/components/LevelProgress";
import BadgeComponent from "@/components/Badge";
import ProjectCard from "@/components/ProjectCard";
import StatsWidget from "@/components/dashboard/stats-widget";
import ActivityWidget from "@/components/dashboard/activity-widget";
import ProjectWidget from "@/components/dashboard/project-widget";
import RecommendationsWidget from "@/components/dashboard/recommendations-widget";
import { 
  TrendingUp, 
  Users, 
  Star, 
  Briefcase,
  Award,
  Target,
  Clock,
  DollarSign,
  MessageSquare,
  Eye,
  Calendar
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: dashboardStats } = useQuery({
    queryKey: [`/api/users/${user?.id}/dashboard`],
    enabled: !!user?.id,
  });

  const { data: userProjects } = useQuery({
    queryKey: [`/api/users/${user?.id}/projects`],
    enabled: !!user?.id,
  });

  const { data: userBadges } = useQuery({
    queryKey: [`/api/users/${user?.id}/badges`],
    enabled: !!user?.id,
  });

  const { data: notifications } = useQuery({
    queryKey: ["/api/notifications"],
    enabled: !!user?.id,
  });

  const levelProgress = user?.experience ? (user.experience % 1000) / 10 : 0;
  const currentLevel = user?.level || 1;
  const activeProjects = userProjects?.filter(p => p.status === 'in_progress') || [];
  const completedProjects = userProjects?.filter(p => p.status === 'completed') || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-conectify-secondary">Professional Dashboard</h1>
          <p className="text-conectify-neutral mt-1">
            Track your progress, manage projects, and grow your professional network.
          </p>
        </div>
        <Badge variant="outline" className="text-conectify-primary border-conectify-primary text-lg px-4 py-2 bg-conectify-primary/5">
          Level {currentLevel} Professional
        </Badge>
      </div>

      {/* Level Progress Card */}
      <LevelProgress 
        currentLevel={currentLevel}
        experience={user?.experience || 0}
        nextLevelRequirement={currentLevel * 1000}
      />

      {/* Stats Widget */}
      <StatsWidget
        stats={{
          totalProjects: completedProjects.length,
          totalEarnings: user?.totalEarnings || 0,
          averageRating: user?.averageRating || 0,
          completionRate: 96,
          activeProjects: activeProjects.length,
          newClients: 5,
          responseTime: "< 2 hours",
          successRate: 98
        }}
      />

      {/* Main Dashboard Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <ProjectWidget projects={[]} />
          <ActivityWidget activities={[]} />
        </div>
        <div className="space-y-6">
          <RecommendationsWidget />
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-conectify-secondary">Recent Projects</h3>
              {userProjects?.slice(0, 3).map((project: any) => (
                <ProjectCard key={project.id} project={project} />
              ))}
              {(!userProjects || userProjects.length === 0) && (
                <p className="text-sm text-conectify-neutral">No projects yet. Create your first project!</p>
              )}
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-conectify-secondary">Achievement Badges</h3>
              <div className="grid grid-cols-3 gap-3">
                {userBadges?.slice(0, 6).map((badge: any) => (
                  <BadgeComponent key={badge.id} type="achievement" name={badge.name} />
                ))}
                {(!userBadges || userBadges.length === 0) && (
                  <p className="text-sm text-conectify-neutral col-span-3">No badges earned yet. Complete projects to earn badges!</p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid gap-6">
            {userProjects?.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {(!userProjects || userProjects.length === 0) && (
              <Card className="enterprise-card">
                <CardContent className="p-8 text-center">
                  <Briefcase className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-conectify-secondary mb-2">No Projects Yet</h3>
                  <p className="text-conectify-neutral">Start by creating your first project or browsing available opportunities.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="badges" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userBadges?.map((badge: any) => (
              <BadgeComponent key={badge.id} type="achievement" name={badge.name} variant="earned" />
            ))}
            {(!userBadges || userBadges.length === 0) && (
              <Card className="enterprise-card md:col-span-2 lg:col-span-3">
                <CardContent className="p-8 text-center">
                  <Award className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-conectify-secondary mb-2">No Badges Yet</h3>
                  <p className="text-conectify-neutral">Complete projects and contribute to the community to earn badges.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-6">
          <AIRecommendations />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <AdvancedAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
}