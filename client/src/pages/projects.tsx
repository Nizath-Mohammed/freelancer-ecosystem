import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProjectCard from "@/components/ProjectCard";
import { Search, Filter, Briefcase, TrendingUp, Plus } from "lucide-react";
import { useLocation } from "wouter";

export default function Projects() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [experienceLevel, setExperienceLevel] = useState("all");
  const [budgetRange, setBudgetRange] = useState("");

  const { data: projects, isLoading } = useQuery({
    queryKey: ["/api/projects", { category, experienceLevel, searchTerm }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (category && category !== "all") params.append('category', category);
      if (experienceLevel && experienceLevel !== "all") params.append('experienceLevel', experienceLevel);
      if (searchTerm) params.append('search', searchTerm);
      
      const response = await fetch(`/api/projects?${params}`);
      if (!response.ok) throw new Error('Failed to fetch projects');
      return response.json();
    },
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Browse Projects</h1>
          <p className="text-slate-600 mt-1">
            Discover opportunities matched to your skills with our AI-powered recommendation engine.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-conectify-success border-conectify-success">
            {projects?.length || 0} Projects Available
          </Badge>
          <Button className="bg-conectify-primary hover:bg-conectify-primary/90" onClick={() => setLocation("/projects/create")}>
            <Plus className="h-4 w-4 mr-2" />
            Post Project
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="web-development">Web Development</SelectItem>
                <SelectItem value="mobile-development">Mobile Development</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="writing">Writing</SelectItem>
                <SelectItem value="data-science">Data Science</SelectItem>
              </SelectContent>
            </Select>
            <Select value={experienceLevel} onValueChange={setExperienceLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Project Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Projects</p>
                <p className="text-2xl font-bold text-slate-900">{projects?.length || 0}</p>
              </div>
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">New This Week</p>
                <p className="text-2xl font-bold text-slate-900">
                  {projects?.filter((p: any) => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(p.createdAt) > weekAgo;
                  }).length || 0}
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
                <p className="text-sm text-slate-600">Average Budget</p>
                <p className="text-2xl font-bold text-slate-900">
                  ${projects?.reduce((acc: number, p: any) => acc + parseFloat(p.budget || 0), 0) / (projects?.length || 1) || 0}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-slate-200 rounded mb-4"></div>
                  <div className="h-20 bg-slate-200 rounded mb-4"></div>
                  <div className="flex space-x-2 mb-4">
                    <div className="h-6 w-16 bg-slate-200 rounded"></div>
                    <div className="h-6 w-16 bg-slate-200 rounded"></div>
                  </div>
                  <div className="h-8 bg-slate-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {projects.map((project: any) => (
              <ProjectCard key={project.id} project={project} showActions />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Briefcase className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No projects found</h3>
              <p className="text-slate-600 mb-6">
                {searchTerm || category || experienceLevel
                  ? "Try adjusting your filters to see more results."
                  : "New projects are posted regularly. Check back soon!"}
              </p>
              {(searchTerm || category || experienceLevel) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setCategory("");
                    setExperienceLevel("");
                    setBudgetRange("");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Load More */}
      {projects && projects.length > 0 && (
        <div className="text-center">
          <Button variant="outline" size="lg">
            Load More Projects
          </Button>
        </div>
      )}
    </div>
  );
}
