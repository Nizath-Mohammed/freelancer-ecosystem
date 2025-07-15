import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProjectCard } from "@/components/ui/project-card";
import { useLocation } from "wouter";
import { Search, Filter, SlidersHorizontal, MapPin, Clock, DollarSign } from "lucide-react";
import { PROJECT_CATEGORIES, SKILLS, EXPERIENCE_LEVELS } from "@/lib/constants";
import type { Project, User } from "@/lib/types";

export default function ProjectMarketplace() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [budgetRange, setBudgetRange] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (selectedCategory) params.append("category", selectedCategory);
    if (selectedSkills.length > 0) params.append("skills", selectedSkills.join(","));
    if (budgetRange) {
      const [min, max] = budgetRange.split("-");
      if (min) params.append("budgetMin", min);
      if (max) params.append("budgetMax", max);
    }
    if (experienceLevel) params.append("experienceLevel", experienceLevel);
    return params.toString();
  };

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["/api/projects", buildQueryParams()],
    queryFn: async () => {
      const queryString = buildQueryParams();
      const url = `/api/projects${queryString ? `?${queryString}` : ""}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json();
    }
  });

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleProjectView = (projectId: string) => {
    setLocation(`/projects/${projectId}`);
  };

  const handleSubmitProposal = (projectId: string) => {
    setLocation(`/projects/${projectId}?action=propose`);
  };

  const filteredProjects = projects.filter((project: Project) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.skills?.some(skill => skill.toLowerCase().includes(query))
      );
    }
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Project Marketplace</h1>
          <p className="text-slate-600">Discover amazing projects matched to your skills</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {PROJECT_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={budgetRange} onValueChange={setBudgetRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Budget Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any Budget</SelectItem>
                  <SelectItem value="0-1000">$0 - $1,000</SelectItem>
                  <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                  <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                  <SelectItem value="10000-">$10,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Advanced Filters</span>
                {(selectedSkills.length > 0 || experienceLevel) && (
                  <Badge variant="secondary">{selectedSkills.length + (experienceLevel ? 1 : 0)}</Badge>
                )}
              </Button>
              <div className="text-sm text-slate-600">
                {filteredProjects.length} projects found
              </div>
            </div>

            {showFilters && (
              <div className="mt-6 pt-6 border-t border-slate-200">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Skills</h4>
                    <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                      {SKILLS.slice(0, 20).map(skill => (
                        <Badge
                          key={skill}
                          variant={selectedSkills.includes(skill) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => handleSkillToggle(skill)}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-900 mb-3">Experience Level</h4>
                    <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Experience Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Experience Level</SelectItem>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No projects found</h3>
              <p className="text-slate-600 mb-4">
                Try adjusting your search criteria or browse all available projects.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                  setSelectedSkills([]);
                  setBudgetRange("");
                  setExperienceLevel("");
                }}
              >
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredProjects.map((project: Project & { client?: User; matchPercentage?: number }) => (
              <ProjectCard
                key={project.id}
                project={{
                  ...project,
                  matchPercentage: Math.floor(Math.random() * 20) + 80 // Mock AI matching score
                }}
                showMatchPercentage={true}
                onViewDetails={() => handleProjectView(project.id)}
                onSubmitProposal={() => handleSubmitProposal(project.id)}
              />
            ))}
          </div>
        )}

        {/* Load More */}
        {filteredProjects.length > 0 && filteredProjects.length % 10 === 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Projects
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
