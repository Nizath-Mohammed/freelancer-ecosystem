import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Clock, 
  DollarSign, 
  MapPin, 
  Star, 
  Calendar,
  Users,
  Briefcase,
  Send,
  Heart,
  Share,
  Flag,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import { Link } from "wouter";
import type { Project, User, Proposal } from "@/lib/types";

export default function ProjectDetails() {
  const params = useParams();
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalData, setProposalData] = useState({
    coverLetter: "",
    proposedBudget: "",
    proposedDuration: "",
  });

  const projectId = params.id;

  const { data: projectData, isLoading } = useQuery({
    queryKey: ["/api/projects", projectId],
    enabled: !!projectId,
  });

  const submitProposalMutation = useMutation({
    mutationFn: async (data: typeof proposalData) => {
      return apiRequest("POST", "/api/proposals", {
        projectId,
        ...data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects", projectId] });
      setShowProposalForm(false);
      setProposalData({ coverLetter: "", proposedBudget: "", proposedDuration: "" });
      toast({
        title: "Proposal Submitted!",
        description: "Your proposal has been sent to the client.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error Submitting Proposal",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!projectData) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="py-16 text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Project Not Found</h2>
              <p className="text-slate-600 mb-4">The project you're looking for doesn't exist or has been removed.</p>
              <Button asChild>
                <Link href="/projects">Browse Projects</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const { project, proposals = [] } = projectData;
  const isOwnProject = user?.id === project.clientId;
  const hasProposed = proposals.some((p: Proposal) => p.freelancerId === user?.id);

  const formatBudget = (budget: string | null, budgetType: string) => {
    if (!budget) return 'Budget TBD';
    const amount = parseFloat(budget);
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
    
    return budgetType === 'hourly' ? `${formatted}/hr` : formatted;
  };

  const formatTimeAgo = (dateString: Date | string | null) => {
    if (!dateString) return 'Unknown';
    
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return diffInMinutes <= 1 ? "just now" : `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  const handleSubmitProposal = () => {
    if (!proposalData.coverLetter.trim() || !proposalData.proposedBudget) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    submitProposalMutation.mutate(proposalData);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Header */}
            <Card>
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">{project.title}</h1>
                    <div className="flex items-center space-x-4 text-sm text-slate-600 mb-4">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {project.status?.replace('_', ' ').toUpperCase() || 'OPEN'}
                      </Badge>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Posted {formatTimeAgo(project.createdAt)}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{proposals.length} proposals</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 capitalize">{project.budgetType} Price</p>
                      <p className="font-semibold text-slate-900">
                        {formatBudget(project.budget, project.budgetType)}
                      </p>
                    </div>
                  </div>
                  
                  {project.duration && (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <Clock className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Duration</p>
                        <p className="font-semibold text-slate-900">{project.duration}</p>
                      </div>
                    </div>
                  )}
                  
                  {project.experienceLevel && (
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Star className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Experience</p>
                        <p className="font-semibold text-slate-900 capitalize">{project.experienceLevel}</p>
                      </div>
                    </div>
                  )}
                </div>

                {project.skills && project.skills.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-slate-900 mb-3">Skills Required</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Project Description</h3>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {project.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Proposals Section */}
            {isOwnProject && proposals.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Proposals ({proposals.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {proposals.map((proposal: Proposal & { freelancer?: User }) => (
                      <div key={proposal.id} className="border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <UserAvatar user={proposal.freelancer} size="md" />
                            <div>
                              <h4 className="font-semibold text-slate-900">
                                {proposal.freelancer?.firstName} {proposal.freelancer?.lastName}
                              </h4>
                              <p className="text-sm text-slate-600">Full-Stack Developer</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex text-amber-400">
                                  <Star className="h-3 w-3 fill-current" />
                                  <Star className="h-3 w-3 fill-current" />
                                  <Star className="h-3 w-3 fill-current" />
                                  <Star className="h-3 w-3 fill-current" />
                                  <Star className="h-3 w-3 fill-current" />
                                </div>
                                <span className="text-xs text-slate-600">4.9 (23 reviews)</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-slate-900">
                              ${parseFloat(proposal.proposedBudget).toLocaleString()}
                            </p>
                            {proposal.proposedDuration && (
                              <p className="text-sm text-slate-600">{proposal.proposedDuration}</p>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-slate-700 mb-4">{proposal.coverLetter}</p>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-500">
                            Submitted {formatTimeAgo(proposal.createdAt)}
                          </span>
                          <div className="space-x-2">
                            <Button variant="outline" size="sm">
                              View Profile
                            </Button>
                            <Button size="sm">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Accept Proposal
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Info */}
            <Card>
              <CardHeader>
                <CardTitle>About the Client</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <UserAvatar user={{ firstName: "John", lastName: "Doe" }} size="lg" />
                  <div>
                    <h4 className="font-semibold text-slate-900">John Doe</h4>
                    <p className="text-sm text-slate-600">TechFlow Inc.</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex text-amber-400">
                        <Star className="h-3 w-3 fill-current" />
                        <Star className="h-3 w-3 fill-current" />
                        <Star className="h-3 w-3 fill-current" />
                        <Star className="h-3 w-3 fill-current" />
                        <Star className="h-3 w-3 fill-current" />
                      </div>
                      <span className="text-xs text-slate-600">4.8 (12 reviews)</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Projects Posted</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Spent</span>
                    <span className="font-medium">$24,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Hire Rate</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Location</span>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="font-medium">San Francisco, CA</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Proposal */}
            {!isOwnProject && user?.role === 'freelancer' && (
              <Card>
                <CardHeader>
                  <CardTitle>Submit a Proposal</CardTitle>
                </CardHeader>
                <CardContent>
                  {hasProposed ? (
                    <div className="text-center py-4">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                      <p className="font-medium text-slate-900 mb-1">Proposal Submitted</p>
                      <p className="text-sm text-slate-600">
                        You've already submitted a proposal for this project.
                      </p>
                    </div>
                  ) : showProposalForm ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="coverLetter">Cover Letter *</Label>
                        <Textarea
                          id="coverLetter"
                          placeholder="Explain why you're the right fit for this project..."
                          rows={4}
                          value={proposalData.coverLetter}
                          onChange={(e) => setProposalData(prev => ({ ...prev, coverLetter: e.target.value }))}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="budget">Your Budget *</Label>
                          <Input
                            id="budget"
                            type="number"
                            placeholder="5000"
                            value={proposalData.proposedBudget}
                            onChange={(e) => setProposalData(prev => ({ ...prev, proposedBudget: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="duration">Timeline</Label>
                          <Input
                            id="duration"
                            placeholder="2 weeks"
                            value={proposalData.proposedDuration}
                            onChange={(e) => setProposalData(prev => ({ ...prev, proposedDuration: e.target.value }))}
                          />
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          onClick={handleSubmitProposal} 
                          disabled={submitProposalMutation.isPending}
                          className="flex-1"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          {submitProposalMutation.isPending ? "Submitting..." : "Submit Proposal"}
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setShowProposalForm(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => setShowProposalForm(true)}
                      className="w-full"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Submit Proposal
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Project Category */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-slate-900 mb-1">Category</h4>
                    <Badge variant="secondary">{project.category}</Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-900 mb-1">Project ID</h4>
                    <p className="text-sm text-slate-600 font-mono">{project.id}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-900 mb-1">Created</h4>
                    <p className="text-sm text-slate-600">{formatTimeAgo(project.createdAt)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
