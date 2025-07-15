import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertProjectSchema } from "@shared/schema";
import { PROJECT_CATEGORIES, SKILLS, EXPERIENCE_LEVELS, BUDGET_TYPES } from "@/lib/constants";
import { Briefcase, DollarSign, Clock, Users, Plus, X } from "lucide-react";
import { z } from "zod";

const projectFormSchema = insertProjectSchema.extend({
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
});

type ProjectFormData = z.infer<typeof projectFormSchema>;

export default function PostProject() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      skills: [],
      budget: "",
      budgetType: "fixed",
      duration: "",
      experienceLevel: "intermediate",
      clientId: user?.id || "",
    },
  });

  const postProjectMutation = useMutation({
    mutationFn: async (data: ProjectFormData) => {
      return apiRequest("POST", "/api/projects", data);
    },
    onSuccess: async (response) => {
      const project = await response.json();
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Project Posted Successfully!",
        description: "Your project is now live and visible to freelancers.",
      });
      setLocation(`/projects/${project.id}`);
    },
    onError: (error) => {
      toast({
        title: "Error Posting Project",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSkillToggle = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    
    setSelectedSkills(newSkills);
    form.setValue("skills", newSkills);
  };

  const removeSkill = (skill: string) => {
    const newSkills = selectedSkills.filter(s => s !== skill);
    setSelectedSkills(newSkills);
    form.setValue("skills", newSkills);
  };

  const onSubmit = (data: ProjectFormData) => {
    postProjectMutation.mutate({
      ...data,
      skills: selectedSkills,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Post a New Project</h1>
          <p className="text-slate-600">Find the perfect freelancer for your project</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5" />
                      <span>Project Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Title *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Build a modern e-commerce website"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Description *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your project in detail. Include requirements, goals, and any specific preferences..."
                              rows={6}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {PROJECT_CATEGORIES.map(category => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Skills Required */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skills Required</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedSkills.length > 0 && (
                        <div>
                          <Label>Selected Skills</Label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedSkills.map(skill => (
                              <Badge key={skill} variant="default" className="flex items-center space-x-1">
                                <span>{skill}</span>
                                <X 
                                  className="h-3 w-3 cursor-pointer" 
                                  onClick={() => removeSkill(skill)}
                                />
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <Label>Available Skills</Label>
                        <div className="flex flex-wrap gap-2 mt-2 max-h-48 overflow-y-auto">
                          {SKILLS.filter(skill => !selectedSkills.includes(skill)).map(skill => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="cursor-pointer hover:bg-primary hover:text-white"
                              onClick={() => handleSkillToggle(skill)}
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Budget and Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5" />
                      <span>Budget & Timeline</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="budgetType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Budget Type *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="fixed">Fixed Price</SelectItem>
                                <SelectItem value="hourly">Hourly Rate</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Budget * {form.watch("budgetType") === "hourly" ? "(per hour)" : "(total)"}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder={form.watch("budgetType") === "hourly" ? "50" : "5000"}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Duration</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., 2-3 weeks, 1 month, 3 months"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experienceLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Experience Level Required</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="entry">Entry Level</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="expert">Expert</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-slate-900">
                          {form.watch("title") || "Project Title"}
                        </h4>
                        <p className="text-sm text-slate-600 mt-1 line-clamp-3">
                          {form.watch("description") || "Project description will appear here..."}
                        </p>
                      </div>
                      
                      {selectedSkills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {selectedSkills.slice(0, 3).map(skill => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {selectedSkills.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{selectedSkills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">
                          {form.watch("budgetType") === "hourly" ? "Hourly" : "Fixed"} Price
                        </span>
                        <span className="font-semibold text-slate-900">
                          {form.watch("budget") 
                            ? `$${parseFloat(form.watch("budget")).toLocaleString()}${form.watch("budgetType") === "hourly" ? "/hr" : ""}`
                            : "Budget TBD"
                          }
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tips for Success</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-slate-600">
                          Clear project descriptions get 3x more proposals
                        </p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-slate-600">
                          Include specific skills and requirements
                        </p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-slate-600">
                          Set realistic budgets and timelines
                        </p>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-slate-600">
                          Add examples or references if possible
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={postProjectMutation.isPending}
                  >
                    {postProjectMutation.isPending ? "Posting..." : "Post Project"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setLocation("/dashboard/client")}
                  >
                    Save as Draft
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
