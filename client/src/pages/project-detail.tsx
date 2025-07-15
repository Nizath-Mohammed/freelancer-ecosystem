import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import ProposalCard from "@/components/ProposalCard";
import MilestoneTracker from "@/components/project-management/milestone-tracker";
import { 
  Clock, 
  Signal, 
  Star, 
  DollarSign,
  Users,
  Calendar,
  MapPin,
  Briefcase,
  MessageSquare,
  Send,
  ArrowLeft
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const proposalSchema = z.object({
  coverLetter: z.string().min(100, "Cover letter must be at least 100 characters"),
  bidAmount: z.string().min(1, "Bid amount is required"),
  deliveryTime: z.string().min(1, "Delivery time is required"),
});

type ProposalForm = z.infer<typeof proposalSchema>;

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showProposalForm, setShowProposalForm] = useState(false);

  const { data: project, isLoading } = useQuery({
    queryKey: [`/api/projects/${id}`],
    enabled: !!id,
  });

  const { data: proposals } = useQuery({
    queryKey: [`/api/projects/${id}/proposals`],
    enabled: !!id && (user?.id === project?.clientId),
  });

  const form = useForm<ProposalForm>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      coverLetter: "",
      bidAmount: "",
      deliveryTime: "",
    },
  });

  const proposalMutation = useMutation({
    mutationFn: async (data: ProposalForm) => {
      return await apiRequest("/api/proposals", {
        method: "POST",
        body: JSON.stringify({
          projectId: id,
          coverLetter: data.coverLetter,
          bidAmount: parseFloat(data.bidAmount),
          deliveryTime: parseInt(data.deliveryTime),
        }),
      });
    },
    onSuccess: () => {
      toast({
        title: "Proposal submitted successfully!",
        description: "The client will review your proposal and get back to you.",
      });
      setShowProposalForm(false);
      form.reset();
      queryClient.invalidateQueries({ queryKey: [`/api/projects/${id}/proposals`] });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error submitting proposal",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmitProposal = (data: ProposalForm) => {
    proposalMutation.mutate(data);
  };

  const handleAcceptProposal = (proposalId: string) => {
    // Update proposal status to accepted
    const acceptMutation = useMutation({
      mutationFn: async () => {
        return await apiRequest(`/api/proposals/${proposalId}`, {
          method: "PATCH",
          body: JSON.stringify({ status: "accepted" }),
        });
      },
      onSuccess: () => {
        toast({ description: "Proposal accepted successfully!" });
        queryClient.invalidateQueries({ queryKey: [`/api/projects/${id}/proposals`] });
      },
    });
    acceptMutation.mutate();
  };

  const handleRejectProposal = (proposalId: string) => {
    // Update proposal status to rejected
    const rejectMutation = useMutation({
      mutationFn: async () => {
        return await apiRequest(`/api/proposals/${proposalId}`, {
          method: "PATCH",
          body: JSON.stringify({ status: "rejected" }),
        });
      },
      onSuccess: () => {
        toast({ description: "Proposal rejected." });
        queryClient.invalidateQueries({ queryKey: [`/api/projects/${id}/proposals`] });
      },
    });
    rejectMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded mb-4"></div>
          <div className="h-48 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Project not found</h3>
          <p className="text-slate-600 mb-6">This project may have been removed or doesn't exist.</p>
          <Link href="/projects">
            <Button>Browse Other Projects</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const isClientView = user?.id === project.clientId;
  const canSubmitProposal = user?.userType === 'freelancer' && !isClientView && project.status === 'open';

  return (
    <div className="space-y-8">
      {/* Back Navigation */}
      <div className="flex items-center space-x-4">
        <Link href="/projects">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
        <Badge variant={project.status === 'open' ? 'default' : 'secondary'}>
          {project.status === 'open' ? 'Open for Proposals' : 
           project.status === 'in_progress' ? 'In Progress' : 
           project.status === 'completed' ? 'Completed' : 
           'Closed'}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Project Header */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-600 text-lg leading-relaxed">
                {project.description}
              </p>

              {/* Skills Required */}
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Skills Required</h4>
                <div className="flex flex-wrap gap-2">
                  {project.skills?.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Project Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600">Budget</p>
                      <p className="font-semibold text-slate-900">
                        {project.budgetType === 'hourly' ? `$${project.budget}/hr` : `$${project.budget}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600">Duration</p>
                      <p className="font-semibold text-slate-900">{project.duration || "Not specified"}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Signal className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600">Experience Level</p>
                      <p className="font-semibold text-slate-900 capitalize">{project.experienceLevel}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-600">Proposals</p>
                      <p className="font-semibold text-slate-900">{project.proposalCount}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posted Date */}
              <div className="flex items-center space-x-3 pt-4 border-t border-slate-200">
                <Calendar className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-600">Posted on</p>
                  <p className="font-semibold text-slate-900">
                    {new Date(project.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Proposals (Client View) */}
          {isClientView && proposals && (
            <Card>
              <CardHeader>
                <CardTitle>Proposals ({proposals.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {proposals.length > 0 ? (
                  proposals.map((proposal: any) => (
                    <ProposalCard
                      key={proposal.id}
                      proposal={proposal}
                      showActions={true}
                      onAccept={(proposalId) => handleAcceptProposal(proposalId)}
                      onReject={(proposalId) => handleRejectProposal(proposalId)}
                    />
                  ))
                ) : (
                  <p className="text-center text-slate-600 py-8">No proposals yet</p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Project Milestones (for in-progress projects) */}
          {project.status === 'in_progress' && (
            <MilestoneTracker projectId={id!} />
          )}

          {/* Proposal Form */}
          {canSubmitProposal && (
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Submit a Proposal
                  {!showProposalForm && (
                    <Button 
                      onClick={() => setShowProposalForm(true)}
                      className="bg-conectify-primary hover:bg-conectify-primary/90"
                    >
                      Write Proposal
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              {showProposalForm && (
                <CardContent>
                  <form onSubmit={form.handleSubmit(onSubmitProposal)} className="space-y-6">
                    <div>
                      <Label htmlFor="coverLetter">Cover Letter</Label>
                      <Textarea
                        id="coverLetter"
                        placeholder="Describe your approach to this project and why you're the best fit..."
                        rows={6}
                        {...form.register("coverLetter")}
                      />
                      {form.formState.errors.coverLetter && (
                        <p className="text-sm text-red-600 mt-1">
                          {form.formState.errors.coverLetter.message}
                        </p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bidAmount">Your Bid Amount ($)</Label>
                        <Input
                          id="bidAmount"
                          type="number"
                          placeholder="0.00"
                          {...form.register("bidAmount")}
                        />
                        {form.formState.errors.bidAmount && (
                          <p className="text-sm text-red-600 mt-1">
                            {form.formState.errors.bidAmount.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="deliveryTime">Delivery Time (days)</Label>
                        <Input
                          id="deliveryTime"
                          type="number"
                          placeholder="7"
                          {...form.register("deliveryTime")}
                        />
                        {form.formState.errors.deliveryTime && (
                          <p className="text-sm text-red-600 mt-1">
                            {form.formState.errors.deliveryTime.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button 
                        type="submit" 
                        disabled={proposalMutation.isPending}
                        className="bg-conectify-primary hover:bg-conectify-primary/90"
                      >
                        {proposalMutation.isPending ? "Submitting..." : "Submit Proposal"}
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setShowProposalForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              )}
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
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12">
                  <AvatarFallback>CL</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-slate-900">Client Company</p>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-amber-400 mr-1" />
                    <span className="text-sm text-slate-600">4.8 (12 reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">Member since</span>
                  <span className="font-medium">2023</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Total jobs posted</span>
                  <span className="font-medium">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Hire rate</span>
                  <span className="font-medium">87%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Similar Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Similar Projects</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-3">
                  <h4 className="font-medium text-slate-900 mb-1">Similar Project {i}</h4>
                  <p className="text-sm text-slate-600 mb-2">Brief description...</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-600">Fixed Price</span>
                    <span className="font-medium">$2,500</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
