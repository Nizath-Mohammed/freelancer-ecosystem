import { useState } from 'react';
import { Header } from '@/components/Layout/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Star, 
  Trophy, 
  Briefcase,
  Edit,
  Camera,
  Plus,
  ExternalLink
} from 'lucide-react';

const mockUser = {
  name: "Alex Chen",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  role: "freelancer" as const,
  notifications: 3,
  email: "alex.chen@example.com",
  location: "San Francisco, CA",
  joinDate: "March 2024",
  rating: 4.9,
  completedProjects: 47,
  totalEarnings: 125000,
  skills: ["React", "TypeScript", "Node.js", "Python", "UI/UX Design"],
  bio: "Full-stack developer with 5+ years of experience building scalable web applications. Passionate about clean code and user experience.",
  portfolio: [
    {
      id: 1,
      title: "E-commerce Platform",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop",
      tech: ["React", "Node.js", "MongoDB"],
      url: "#"
    },
    {
      id: 2,
      title: "Task Management App", 
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop",
      tech: ["TypeScript", "Next.js", "PostgreSQL"],
      url: "#"
    },
    {
      id: 3,
      title: "AI Chat Interface",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop", 
      tech: ["React", "Python", "OpenAI"],
      url: "#"
    }
  ]
};

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header variant="app" user={mockUser} />
      
      <div className="pt-20 px-4 pb-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-24">
                {/* Profile Header */}
                <div className="text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                      <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <h1 className="text-xl font-bold text-foreground mb-1">{mockUser.name}</h1>
                  <Badge variant="secondary" className="mb-3">
                    {mockUser.role.charAt(0).toUpperCase() + mockUser.role.slice(1)}
                  </Badge>
                  
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{mockUser.rating}</span>
                    <span className="text-muted-foreground">({mockUser.completedProjects} reviews)</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{mockUser.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{mockUser.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Joined {mockUser.joinDate}</span>
                  </div>
                </div>

                {/* Achievement Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <Briefcase className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-lg font-bold text-foreground">{mockUser.completedProjects}</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                  <div className="text-center p-3 bg-primary/5 rounded-lg">
                    <Trophy className="w-5 h-5 text-primary mx-auto mb-1" />
                    <div className="text-lg font-bold text-foreground">${(mockUser.totalEarnings / 1000).toFixed(0)}k</div>
                    <div className="text-xs text-muted-foreground">Earned</div>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* About Section */}
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold">About</h2>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {mockUser.bio}
                    </p>
                  </Card>

                  {/* Skills Section */}
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold">Skills</h2>
                      <Button variant="ghost" size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {mockUser.skills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="portfolio" className="space-y-6">
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold">Portfolio</h2>
                      <Button variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {mockUser.portfolio.map((project) => (
                        <div key={project.id} className="group relative overflow-hidden rounded-lg border border-border">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium text-foreground">{project.title}</h3>
                              <Button variant="ghost" size="sm" className="p-1">
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {project.tech.map((tech, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-6">
                  <Card className="p-6">
                    <h2 className="text-lg font-semibold mb-6">Client Reviews</h2>
                    <div className="space-y-6">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border-b border-border pb-6 last:border-0">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={`https://images.unsplash.com/photo-150732653${review}?w=40&h=40&fit=crop&crop=face`} />
                              <AvatarFallback>C{review}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium">Client {review}</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                              </div>
                              <p className="text-muted-foreground">
                                "Excellent work quality and communication. Delivered on time and exceeded expectations."
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  <Card className="p-6">
                    <h2 className="text-lg font-semibold mb-6">Account Settings</h2>
                    <div className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        <User className="w-4 h-4 mr-3" />
                        Personal Information
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Mail className="w-4 h-4 mr-3" />
                        Email Preferences
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Security Settings
                      </Button>
                      <Button variant="destructive" className="w-full justify-start">
                        Delete Account
                      </Button>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};