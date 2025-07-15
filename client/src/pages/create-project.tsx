import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, Plus, X, DollarSign, Clock, Users, FileText } from "lucide-react";

const createProjectSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  category: z.string().min(1, "Category is required"),
  experienceLevel: z.string().min(1, "Experience level is required"),
  budget: z.coerce.number().min(1, "Budget must be greater than 0"),
  budgetType: z.enum(["fixed", "hourly"]),
  timeline: z.string().min(1, "Timeline is required"),
  requirements: z.string().optional(),
});

type CreateProjectForm = z.infer<typeof createProjectSchema>;

export default function CreateProject() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const form = useForm<CreateProjectForm>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      experienceLevel: "",
      budget: 0,
      budgetType: "fixed",
      timeline: "",
      requirements: "",
    },
  });

  const createProjectMutation = useMutation({
    mutationFn: async (data: CreateProjectForm & { skills: string[] }) => {
      return apiRequest("/api/projects", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({ description: "Project created successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setLocation("/projects");
    },
    onError: (error: any) => {
      toast({ 
        description: error.message || "Failed to create project",
        variant: "destructive"
      });
    },
  });

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const onSubmit = (data: CreateProjectForm) => {
    createProjectMutation.mutate({ ...data, skills });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={() => setLocation("/projects")}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
        
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-conectify-primary rounded-lg flex items-center justify-center">
            <Plus className="text-white h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-conectify-secondary">Post a New Project</h1>
            <p className="text-conectify-neutral">Find the perfect freelancer for your project</p>
          </div>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Project Details */}
        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-conectify-primary" />
              <span>Project Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                {...form.register("title")}
                placeholder="e.g., Build a Modern E-commerce Website"
                className="mt-2"
              />
              {form.formState.errors.title && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Project Description</Label>
              <Textarea
                id="description"
                {...form.register("description")}
                placeholder="Describe your project in detail. Include objectives, key features, and any specific requirements..."
                className="mt-2 min-h-[120px]"
              />
              {form.formState.errors.description && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={form.watch("category")} onValueChange={(value) => form.setValue("category", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="mobile-development">Mobile Development</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="data-science">Data Science</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="writing">Writing</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.category && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.category.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <Select value={form.watch("experienceLevel")} onValueChange={(value) => form.setValue("experienceLevel", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.experienceLevel && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.experienceLevel.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="requirements">Additional Requirements</Label>
              <Textarea
                id="requirements"
                {...form.register("requirements")}
                placeholder="Any specific requirements, certifications, or portfolio examples needed..."
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Budget and Timeline */}
        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-conectify-primary" />
              <span>Budget & Timeline</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budgetType">Budget Type</Label>
                <Select value={form.watch("budgetType")} onValueChange={(value) => form.setValue("budgetType", value as "fixed" | "hourly")}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select budget type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Price</SelectItem>
                    <SelectItem value="hourly">Hourly Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="budget">
                  {form.watch("budgetType") === "hourly" ? "Max Hourly Rate ($)" : "Total Budget ($)"}
                </Label>
                <Input
                  id="budget"
                  type="number"
                  {...form.register("budget")}
                  placeholder={form.watch("budgetType") === "hourly" ? "e.g., 75" : "e.g., 5000"}
                  className="mt-2"
                />
                {form.formState.errors.budget && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.budget.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="timeline">Expected Timeline</Label>
              <Input
                id="timeline"
                {...form.register("timeline")}
                placeholder="e.g., 4 weeks, 2 months"
                className="mt-2"
              />
              {form.formState.errors.timeline && (
                <p className="text-red-500 text-sm mt-1">{form.formState.errors.timeline.message}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Skills Required */}
        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-conectify-primary" />
              <span>Skills Required</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a required skill"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center space-x-1">
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 hover:bg-red-100 rounded-full p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setLocation("/projects")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={createProjectMutation.isPending}
            className="bg-conectify-primary hover:bg-conectify-primary/90"
          >
            {createProjectMutation.isPending ? "Creating..." : "Post Project"}
          </Button>
        </div>
      </form>
    </div>
  );
}