import { useState } from 'react';
import { Header } from '@/components/Layout/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Plus,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  MessageSquare,
  FileText,
  Filter,
  Search
} from 'lucide-react';

type ProjectStatus = 'active' | 'completed' | 'pending' | 'cancelled';

interface Project {
  id: string;
  title: string;
  client: {
    name: string;
    avatar: string;
  };
  description: string;
  budget: number;
  deadline: string;
  status: ProjectStatus;
  progress: number;
  tags: string[];
  lastActivity: string;
}

const mockUser = {
  name: "Alex Chen",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  role: "freelancer" as const,
  notifications: 3
};

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Website Development',
    client: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b76c?w=40&h=40&fit=crop&crop=face'
    },
    description: 'Build a modern e-commerce platform with React and Node.js',
    budget: 5000,
    deadline: '2024-02-15',
    status: 'active',
    progress: 75,
    tags: ['React', 'Node.js', 'E-commerce'],
    lastActivity: '2 hours ago'
  },
  {
    id: '2',
    title: 'Mobile App UI/UX Design',
    client: {
      name: 'Tech Startup Inc',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    description: 'Design user interface for a productivity mobile application',
    budget: 3500,
    deadline: '2024-01-30',
    status: 'completed',
    progress: 100,
    tags: ['UI/UX', 'Mobile', 'Figma'],
    lastActivity: '1 week ago'
  },
  {
    id: '3',
    title: 'API Integration & Backend',
    client: {
      name: 'Digital Agency',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    description: 'Integrate third-party APIs and optimize backend performance',
    budget: 2800,
    deadline: '2024-02-28',
    status: 'pending',
    progress: 0,
    tags: ['API', 'Backend', 'Python'],
    lastActivity: '3 days ago'
  },
  {
    id: '4',
    title: 'Website Redesign',
    client: {
      name: 'Local Business',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    },
    description: 'Complete redesign of company website with modern UI',
    budget: 4200,
    deadline: '2024-03-15',
    status: 'active',
    progress: 35,
    tags: ['Design', 'Frontend', 'WordPress'],
    lastActivity: '1 day ago'
  }
];

const getStatusColor = (status: ProjectStatus) => {
  switch (status) {
    case 'active': return 'bg-blue-500';
    case 'completed': return 'bg-green-500';
    case 'pending': return 'bg-yellow-500';
    case 'cancelled': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

const getStatusIcon = (status: ProjectStatus) => {
  switch (status) {
    case 'active': return <Clock className="w-4 h-4" />;
    case 'completed': return <CheckCircle className="w-4 h-4" />;
    case 'pending': return <AlertCircle className="w-4 h-4" />;
    case 'cancelled': return <AlertCircle className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
  }
};

export const Projects = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || project.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: mockProjects.length,
    active: mockProjects.filter(p => p.status === 'active').length,
    completed: mockProjects.filter(p => p.status === 'completed').length,
    pending: mockProjects.filter(p => p.status === 'pending').length
  };

  return (
    <div className="min-h-screen bg-background">
      <Header variant="app" user={mockUser} />
      
      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">My Projects</h1>
              <p className="text-muted-foreground">
                Manage and track your freelance projects
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.total}</div>
                  <div className="text-sm text-muted-foreground">Total Projects</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.active}</div>
                  <div className="text-sm text-muted-foreground">Active</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.completed}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.pending}</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 max-w-2xl">
              <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
              <TabsTrigger value="active">Active ({stats.active})</TabsTrigger>
              <TabsTrigger value="completed">Completed ({stats.completed})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {filteredProjects.length === 0 ? (
                <Card className="p-12 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? 'Try adjusting your search terms' : 'Get started by creating your first project'}
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Project
                  </Button>
                </Card>
              ) : (
                filteredProjects.map((project) => (
                  <Card key={project.id} className="p-6 hover:shadow-medium transition-shadow cursor-pointer">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      {/* Project Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
                            <Badge 
                              variant="secondary" 
                              className={`${getStatusColor(project.status)} text-white`}
                            >
                              <span className="flex items-center gap-1">
                                {getStatusIcon(project.status)}
                                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                              </span>
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-3">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, index) => (
                            <Badge key={index} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {project.status === 'active' && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-muted-foreground">Progress</span>
                              <span className="text-sm font-medium">{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                          </div>
                        )}
                      </div>

                      {/* Project Meta */}
                      <div className="lg:w-64 space-y-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={project.client.avatar} alt={project.client.name} />
                            <AvatarFallback>{project.client.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{project.client.name}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">${project.budget.toLocaleString()}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Due {project.deadline}</span>
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          Last activity: {project.lastActivity}
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Chat
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <FileText className="w-4 h-4 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};