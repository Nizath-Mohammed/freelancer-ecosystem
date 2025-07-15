import { useState } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import LevelProgress from "@/components/LevelProgress";
import ProjectCard from "@/components/ProjectCard";
import { 
  Edit, 
  MapPin, 
  Calendar, 
  Globe, 
  Star, 
  Award, 
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Briefcase,
  MessageSquare,
  Plus,
  X
} from "lucide-react";

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const isOwnProfile = !id || id === user?.id;

  const { data: profile, isLoading } = useQuery({
    queryKey: [`/api/users/${id || user?.id}`],
    enabled: !!(id || user?.id),
  });

  const { data: projects = [] } = useQuery({
    queryKey: [`/api/users/${id || user?.id}/projects`],
    enabled: !!(id || user?.id),
  });

  const { data: badges = [] } = useQuery({
    queryKey: [`/api/users/${id || user?.id}/badges`],
    enabled: !!(id || user?.id),
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest(`/api/users/${user?.id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({ description: "Profile updated successfully!" });
      queryClient.invalidateQueries({ queryKey: [`/api/users/${user?.id}`] });
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast({
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    },
  });

  // Mock data for demonstration
  const mockProfile = {
    id: id || user?.id,
    firstName: user?.firstName || "John",
    lastName: user?.lastName || "Doe",
    email: user?.email || "john.doe@example.com",
    bio: "Full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies.",
    location: "San Francisco, CA",
    joinedAt: "2023-01-15",
    profileImageUrl: null,
    hourlyRate: 75,
    completedProjects: 24,
    totalEarnings: 45000,
    averageRating: 4.8,
    level: 3,
    experience: 2450,
    nextLevelRequirement: 3000,
    skills: ["React", "Node.js", "TypeScript", "Python", "AWS", "PostgreSQL"],
    languages: ["English (Native)", "Spanish (Conversational)"],
    certifications: ["AWS Certified Developer", "Google Cloud Professional"],
    availability: "Available",
    timezone: "PST",
  };

  const mockProjects = [
    {
      id: "1",
      title: "E-commerce Platform Development",
      description: "Built a full-stack e-commerce platform with React and Node.js",
      budget: 5000,
      status: "completed",
      completedAt: "2024-01-15",
      client: { name: "TechCorp Inc." },
      rating: 5,
      feedback: "Excellent work! Delivered on time and exceeded expectations.",
    },
    {
      id: "2",
      title: "Mobile App Backend API",
      description: "Developed REST API for mobile application with authentication",
      budget: 3000,
      status: "completed",
      completedAt: "2023-12-10",
      client: { name: "StartupXYZ" },
      rating: 4.5,
      feedback: "Great communication and technical skills.",
    },
  ];

  const mockBadges = [
    { id: "1", name: "Top Rated", description: "Maintained 4.8+ rating", category: "achievement", earnedAt: "2024-01-01" },
    { id: "2", name: "React Expert", description: "Completed 10+ React projects", category: "skill", earnedAt: "2023-11-15" },
    { id: "3", name: "Quick Delivery", description: "Delivered 5 projects ahead of schedule", category: "performance", earnedAt: "2023-10-20" },
  ];

  const handleSkillAdd = () => {
    if (!newSkill.trim()) return;
    const updatedSkills = [...(mockProfile.skills || []), newSkill.trim()];
    // updateProfileMutation.mutate({ skills: updatedSkills });
    setNewSkill("");
  };

  const handleSkillRemove = (skillToRemove: string) => {
    const updatedSkills = (mockProfile.skills || []).filter(skill => skill !== skillToRemove);
    // updateProfileMutation.mutate({ skills: updatedSkills });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-32 bg-slate-200 rounded-lg mb-4"></div>
          <div className="h-8 bg-slate-200 rounded mb-4"></div>
          <div className="h-48 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="enterprise-card">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={mockProfile.profileImageUrl} />
                <AvatarFallback className="text-xl">
                  {mockProfile.firstName[0]}{mockProfile.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-bold text-conectify-secondary">
                    {mockProfile.firstName} {mockProfile.lastName}
                  </h1>
                  <Badge variant="outline" className={
                    mockProfile.availability === "Available" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }>
                    {mockProfile.availability}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-conectify-neutral">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {mockProfile.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Joined {new Date(mockProfile.joinedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    {mockProfile.averageRating} ({mockProfile.completedProjects} reviews)
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary" className="bg-conectify-accent text-conectify-secondary">
                    ${mockProfile.hourlyRate}/hr
                  </Badge>
                  <Badge variant="secondary" className="bg-conectify-accent text-conectify-secondary">
                    {mockProfile.completedProjects} projects completed
                  </Badge>
                </div>
              </div>
            </div>
            {isOwnProfile && (
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="border-conectify-primary text-conectify-primary"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>

          {/* Level Progress */}
          <div className="mt-6">
            <LevelProgress
              currentLevel={mockProfile.level}
              experience={mockProfile.experience}
              nextLevelRequirement={mockProfile.nextLevelRequirement}
            />
          </div>

          {/* Bio */}
          <div className="mt-6">
            <p className="text-conectify-neutral">{mockProfile.bio}</p>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Stats */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="text-conectify-secondary">Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-conectify-neutral" />
                    <span className="text-sm text-conectify-neutral">Total Earnings</span>
                  </div>
                  <span className="font-semibold text-conectify-secondary">
                    ${mockProfile.totalEarnings.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="h-4 w-4 text-conectify-neutral" />
                    <span className="text-sm text-conectify-neutral">Projects</span>
                  </div>
                  <span className="font-semibold text-conectify-secondary">
                    {mockProfile.completedProjects}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-conectify-neutral" />
                    <span className="text-sm text-conectify-neutral">Response Time</span>
                  </div>
                  <span className="font-semibold text-conectify-secondary">
                    &lt; 2 hours
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="text-conectify-secondary flex items-center justify-between">
                  Skills
                  {isOwnProfile && isEditing && (
                    <Button size="sm" variant="outline" onClick={() => setNewSkill("")}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isOwnProfile && isEditing && (
                  <div className="flex space-x-2 mb-4">
                    <Input
                      placeholder="Add new skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSkillAdd()}
                    />
                    <Button onClick={handleSkillAdd} size="sm">
                      Add
                    </Button>
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {mockProfile.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-conectify-accent text-conectify-secondary">
                      {skill}
                      {isOwnProfile && isEditing && (
                        <button
                          onClick={() => handleSkillRemove(skill)}
                          className="ml-1 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Languages & Certifications */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="text-conectify-secondary">Languages & Certifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-conectify-secondary mb-2">Languages</h4>
                  <div className="space-y-1">
                    {mockProfile.languages.map((lang) => (
                      <p key={lang} className="text-sm text-conectify-neutral">{lang}</p>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-conectify-secondary mb-2">Certifications</h4>
                  <div className="space-y-1">
                    {mockProfile.certifications.map((cert) => (
                      <p key={cert} className="text-sm text-conectify-neutral">{cert}</p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {mockProjects.map((project) => (
              <Card key={project.id} className="enterprise-card">
                <CardHeader>
                  <CardTitle className="text-conectify-secondary">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-conectify-neutral">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-conectify-neutral" />
                      <span className="font-semibold text-conectify-secondary">
                        ${project.budget.toLocaleString()}
                      </span>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      {project.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-conectify-neutral">
                      {project.rating}/5 - {project.client.name}
                    </span>
                  </div>
                  <p className="text-sm text-conectify-neutral italic">
                    "{project.feedback}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <div className="space-y-4">
            {mockProjects.map((project) => (
              <Card key={project.id} className="enterprise-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-conectify-secondary">{project.title}</h4>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < project.rating ? "text-yellow-400 fill-current" : "text-slate-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-conectify-neutral mb-2">"{project.feedback}"</p>
                      <div className="flex items-center text-sm text-conectify-neutral">
                        <span>{project.client.name}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(project.completedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="badges" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockBadges.map((badge) => (
              <Card key={badge.id} className="enterprise-card">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-conectify-secondary mb-2">{badge.name}</h3>
                  <p className="text-sm text-conectify-neutral mb-4">{badge.description}</p>
                  <Badge variant="outline" className="bg-conectify-accent text-conectify-secondary">
                    {badge.category}
                  </Badge>
                  <p className="text-xs text-conectify-neutral mt-2">
                    Earned {new Date(badge.earnedAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}