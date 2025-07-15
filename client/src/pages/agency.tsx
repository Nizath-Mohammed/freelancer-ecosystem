import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import DashboardWidget from "@/components/DashboardWidget";
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Briefcase,
  Star,
  Calendar,
  Plus,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Clock,
  Target,
  BarChart3,
  UserPlus,
  Building,
  FileText,
  Settings
} from "lucide-react";
import { Link } from "wouter";

export default function Agency() {
  const { user } = useAuth();
  const [selectedTeamMember, setSelectedTeamMember] = useState<string | null>(null);

  // Mock data - in real app this would come from API
  const agencyStats = {
    totalRevenue: 125000,
    activeProjects: 8,
    teamMembers: 12,
    clientSatisfaction: 4.8,
    monthlyGrowth: 12.5,
  };

  const teamMembers = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Senior Developer",
      skills: ["React", "Node.js", "Python"],
      rating: 4.9,
      projects: 5,
      earnings: 15000,
      availability: "Available",
    },
    {
      id: "2", 
      name: "Mike Chen",
      role: "UI/UX Designer",
      skills: ["Figma", "Sketch", "Prototyping"],
      rating: 4.7,
      projects: 3,
      earnings: 12000,
      availability: "Busy",
    },
    {
      id: "3",
      name: "Emily Davis",
      role: "Project Manager",
      skills: ["Agile", "Scrum", "Leadership"],
      rating: 4.8,
      projects: 7,
      earnings: 18000,
      availability: "Available",
    },
  ];

  const clients = [
    {
      id: "1",
      name: "TechFlow Inc.",
      projects: 3,
      totalPaid: 45000,
      lastProject: "2024-01-15",
      status: "Active",
    },
    {
      id: "2",
      name: "StartupXYZ",
      projects: 2,
      totalPaid: 28000,
      lastProject: "2024-01-10",
      status: "Active",
    },
    {
      id: "3",
      name: "Enterprise Corp",
      projects: 5,
      totalPaid: 85000,
      lastProject: "2024-01-20",
      status: "Completed",
    },
  ];

  const activeProjects = [
    {
      id: "1",
      name: "E-commerce Platform",
      client: "TechFlow Inc.",
      team: ["Sarah Johnson", "Mike Chen"],
      progress: 75,
      deadline: "2024-02-15",
      budget: 25000,
    },
    {
      id: "2",
      name: "Mobile App Design",
      client: "StartupXYZ", 
      team: ["Mike Chen", "Emily Davis"],
      progress: 40,
      deadline: "2024-02-28",
      budget: 15000,
    },
  ];

  if (user?.userType !== 'agency') {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Building className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Agency Access Required</h3>
          <p className="text-slate-600 mb-6">This page is only available for agency accounts.</p>
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Agency Dashboard</h1>
          <p className="text-slate-600 mt-1">
            Manage your team, clients, and projects all in one place.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Team Member
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-5 gap-6">
        <DashboardWidget
          title="Total Revenue"
          value={`$${agencyStats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="text-green-600"
          trend={{ value: agencyStats.monthlyGrowth, isPositive: true }}
        />
        <DashboardWidget
          title="Active Projects"
          value={agencyStats.activeProjects}
          icon={Briefcase}
          color="text-primary"
        />
        <DashboardWidget
          title="Team Members"
          value={agencyStats.teamMembers}
          icon={Users}
          color="text-purple-600"
        />
        <DashboardWidget
          title="Client Satisfaction"
          value={`${agencyStats.clientSatisfaction}/5`}
          icon={Star}
          color="text-amber-500"
        />
        <DashboardWidget
          title="Growth Rate"
          value={`${agencyStats.monthlyGrowth}%`}
          icon={TrendingUp}
          color="text-blue-600"
        />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Active Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Active Projects</span>
                  <Badge variant="outline">{activeProjects.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeProjects.map((project) => (
                  <div key={project.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-slate-900">{project.name}</h4>
                        <p className="text-sm text-slate-600">{project.client}</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        ${project.budget.toLocaleString()}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="flex justify-between items-center mt-3 text-sm">
                      <div className="flex items-center text-slate-600">
                        <Calendar className="mr-1 h-4 w-4" />
                        Due: {new Date(project.deadline).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-slate-600">
                        <Users className="mr-1 h-4 w-4" />
                        {project.team.length} members
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Team Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Team Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {teamMembers.slice(0, 3).map((member) => (
                  <div key={member.id} className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{member.name}</p>
                      <p className="text-sm text-slate-600">{member.role}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-amber-400 mr-1" />
                        <span className="text-sm font-medium">{member.rating}</span>
                      </div>
                      <p className="text-sm text-slate-600">{member.projects} projects</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-900">Team Management</h2>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Member
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback>
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-slate-900">{member.name}</h3>
                      <p className="text-sm text-slate-600">{member.role}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Rating</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-amber-400 mr-1" />
                        <span className="font-medium">{member.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Projects</span>
                      <span className="font-medium">{member.projects}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Earnings</span>
                      <span className="font-medium">${member.earnings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-600">Status</span>
                      <Badge 
                        variant={member.availability === 'Available' ? 'default' : 'secondary'}
                        className={member.availability === 'Available' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {member.availability}
                      </Badge>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-slate-600 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {member.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="mr-1 h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageSquare className="mr-1 h-4 w-4" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-900">Project Management</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {activeProjects.map((project) => (
                  <div key={project.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
                        <p className="text-slate-600">{project.client}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-slate-900">
                          ${project.budget.toLocaleString()}
                        </p>
                        <p className="text-sm text-slate-600">Budget</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Progress</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={project.progress} className="flex-1 h-2" />
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Deadline</p>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4 text-slate-400" />
                          <span className="text-sm">{new Date(project.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Team</p>
                        <div className="flex items-center">
                          <Users className="mr-1 h-4 w-4 text-slate-400" />
                          <span className="text-sm">{project.team.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="mr-1 h-4 w-4" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="mr-1 h-4 w-4" />
                        Team Chat
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="mr-1 h-4 w-4" />
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-900">Client Management</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {clients.map((client) => (
              <Card key={client.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{client.name}</h3>
                      <Badge 
                        variant={client.status === 'Active' ? 'default' : 'secondary'}
                        className={client.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {client.status}
                      </Badge>
                    </div>
                    <Avatar>
                      <AvatarFallback>
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Projects</span>
                      <span className="font-medium">{client.projects}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Paid</span>
                      <span className="font-medium">${client.totalPaid.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Last Project</span>
                      <span className="font-medium">{new Date(client.lastProject).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="mr-1 h-4 w-4" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageSquare className="mr-1 h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardWidget
              title="Monthly Revenue"
              value="$45,000"
              icon={DollarSign}
              color="text-green-600"
              trend={{ value: 8.2, isPositive: true }}
            />
            <DashboardWidget
              title="Project Success Rate"
              value="94%"
              icon={Target}
              color="text-blue-600"
            />
            <DashboardWidget
              title="Average Project Value"
              value="$15,625"
              icon={BarChart3}
              color="text-purple-600"
            />
            <DashboardWidget
              title="Client Retention"
              value="87%"
              icon={Users}
              color="text-amber-600"
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Revenue charts and analytics will be displayed here</p>
                <p className="text-sm text-slate-500">Integrate with Chart.js for detailed visualizations</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
