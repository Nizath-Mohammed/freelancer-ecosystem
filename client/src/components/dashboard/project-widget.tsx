import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Clock, 
  DollarSign, 
  ArrowRight, 
  AlertCircle,
  CheckCircle2,
  Play,
  Pause
} from "lucide-react";
import { Link } from "wouter";

interface ProjectWidgetProps {
  projects: Array<{
    id: string;
    title: string;
    client: {
      name: string;
      avatar?: string;
    };
    status: string;
    progress: number;
    budget: number;
    deadline: string;
    priority: 'high' | 'medium' | 'low';
    lastActivity: string;
  }>;
}

export default function ProjectWidget({ projects }: ProjectWidgetProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'on-hold':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Play className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Pause className="h-4 w-4 text-yellow-500" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-blue-500" />;
      case 'on-hold':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const mockProjects = [
    {
      id: '1',
      title: 'E-commerce Platform Development',
      client: { name: 'TechCorp Inc.' },
      status: 'Active',
      progress: 75,
      budget: 5000,
      deadline: '2024-02-15',
      priority: 'high' as const,
      lastActivity: '2 hours ago'
    },
    {
      id: '2',
      title: 'Mobile App Backend API',
      client: { name: 'StartupXYZ' },
      status: 'Pending',
      progress: 30,
      budget: 3000,
      deadline: '2024-02-28',
      priority: 'medium' as const,
      lastActivity: '1 day ago'
    },
    {
      id: '3',
      title: 'React Dashboard UI',
      client: { name: 'InnovateAI' },
      status: 'Active',
      progress: 90,
      budget: 2500,
      deadline: '2024-02-10',
      priority: 'high' as const,
      lastActivity: '30 minutes ago'
    },
    {
      id: '4',
      title: 'WordPress Plugin Development',
      client: { name: 'WebSolutions' },
      status: 'Completed',
      progress: 100,
      budget: 1500,
      deadline: '2024-01-30',
      priority: 'low' as const,
      lastActivity: '3 days ago'
    },
  ];

  return (
    <Card className="enterprise-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-conectify-secondary">Active Projects</CardTitle>
          <Link href="/projects">
            <Button variant="outline" size="sm" className="border-conectify-primary text-conectify-primary hover:bg-conectify-primary hover:text-white">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockProjects.slice(0, 3).map((project) => (
            <div key={project.id} className="p-4 border border-conectify-neutral/20 rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {getStatusIcon(project.status)}
                    <h4 className="font-semibold text-conectify-secondary truncate">
                      {project.title}
                    </h4>
                    <AlertCircle className={`h-4 w-4 ${getPriorityColor(project.priority)}`} />
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-conectify-neutral">
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={project.client.avatar} />
                      <AvatarFallback className="text-xs">
                        {project.client.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span>{project.client.name}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge variant="outline" className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <div className="flex items-center text-sm text-conectify-neutral">
                    <DollarSign className="h-4 w-4 mr-1" />
                    ${project.budget.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-conectify-neutral">Progress</span>
                  <span className="text-sm font-semibold text-conectify-secondary">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-sm text-conectify-neutral">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{new Date(project.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{project.lastActivity}</span>
                  </div>
                </div>
                <Link href={`/projects/${project.id}`}>
                  <Button variant="ghost" size="sm" className="text-conectify-primary hover:bg-conectify-primary hover:text-white">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}