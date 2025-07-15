import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  CheckCircle2, 
  X, 
  MessageSquare, 
  Star,
  DollarSign,
  Clock,
  Calendar,
  Award,
  Briefcase,
  FileText,
  User
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

interface ProposalDetailProps {
  proposal: any;
  isOpen: boolean;
  onClose: () => void;
  onAccept?: (proposalId: string) => void;
  onReject?: (proposalId: string) => void;
  showActions?: boolean;
}

export default function ProposalDetail({
  proposal,
  isOpen,
  onClose,
  onAccept,
  onReject,
  showActions = true
}: ProposalDetailProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const acceptProposalMutation = useMutation({
    mutationFn: async (proposalId: string) => {
      return apiRequest(`/api/proposals/${proposalId}/accept`, {
        method: 'POST',
      });
    },
    onSuccess: () => {
      toast({ description: "Proposal accepted successfully!" });
      onAccept?.(proposal.id);
      onClose();
    },
  });

  const rejectProposalMutation = useMutation({
    mutationFn: async ({ proposalId, reason }: { proposalId: string; reason: string }) => {
      return apiRequest(`/api/proposals/${proposalId}/reject`, {
        method: 'POST',
        body: JSON.stringify({ reason }),
      });
    },
    onSuccess: () => {
      toast({ description: "Proposal rejected with feedback sent to freelancer" });
      onReject?.(proposal.id);
      setShowRejectDialog(false);
      onClose();
    },
  });

  const handleAccept = () => {
    acceptProposalMutation.mutate(proposal.id);
  };

  const handleReject = () => {
    if (!rejectReason.trim()) {
      toast({ 
        description: "Please provide a reason for rejection",
        variant: "destructive"
      });
      return;
    }
    rejectProposalMutation.mutate({ 
      proposalId: proposal.id, 
      reason: rejectReason.trim() 
    });
  };

  if (!proposal) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Proposal Details</span>
              <Badge 
                variant={proposal.status === 'pending' ? 'secondary' : 
                        proposal.status === 'accepted' ? 'default' : 'destructive'}
                className={
                  proposal.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  proposal.status === 'accepted' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }
              >
                {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Freelancer Info */}
            <Card className="enterprise-card">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={proposal.freelancer?.profileImageUrl} />
                    <AvatarFallback className="text-lg">
                      {proposal.freelancer?.firstName?.[0]}{proposal.freelancer?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-conectify-secondary">
                      {proposal.freelancer?.firstName} {proposal.freelancer?.lastName}
                    </h3>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{proposal.freelancer?.rating || 0}</span>
                        <span className="text-conectify-neutral text-sm">
                          ({proposal.freelancer?.reviewCount || 0} reviews)
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Briefcase className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-conectify-neutral">
                          {proposal.freelancer?.completedProjects || 0} projects completed
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                {proposal.freelancer?.skills && (
                  <div className="mt-4">
                    <h4 className="font-medium text-conectify-secondary mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {proposal.freelancer.skills.map((skill: string, index: number) => (
                        <Badge key={index} variant="outline" className="bg-slate-50">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Proposal Details */}
            <Card className="enterprise-card">
              <CardHeader>
                <CardTitle>Proposal Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Budget & Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <DollarSign className="h-8 w-8 text-conectify-success mx-auto mb-2" />
                    <div className="text-2xl font-bold text-conectify-secondary">
                      ${proposal.proposedBudget?.toLocaleString()}
                    </div>
                    <div className="text-sm text-conectify-neutral">Proposed Budget</div>
                  </div>
                  
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <Clock className="h-8 w-8 text-conectify-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-conectify-secondary">
                      {proposal.timeframe}
                    </div>
                    <div className="text-sm text-conectify-neutral">Delivery Time</div>
                  </div>
                  
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-conectify-secondary">
                      {formatDistanceToNow(new Date(proposal.createdAt), { addSuffix: true })}
                    </div>
                    <div className="text-sm text-conectify-neutral">Submitted</div>
                  </div>
                </div>

                {/* Cover Letter */}
                <div>
                  <h4 className="font-medium text-conectify-secondary mb-3">Cover Letter</h4>
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <p className="text-conectify-neutral whitespace-pre-wrap leading-relaxed">
                      {proposal.coverLetter}
                    </p>
                  </div>
                </div>

                {/* Milestones */}
                {proposal.milestones && proposal.milestones.length > 0 && (
                  <div>
                    <h4 className="font-medium text-conectify-secondary mb-3">Project Milestones</h4>
                    <div className="space-y-3">
                      {proposal.milestones.map((milestone: any, index: number) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-conectify-secondary">
                              {milestone.title}
                            </h5>
                            <div className="text-right">
                              <div className="font-semibold text-conectify-success">
                                ${milestone.budget?.toLocaleString()}
                              </div>
                              <div className="text-sm text-conectify-neutral">
                                {milestone.timeline}
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-conectify-neutral">
                            {milestone.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Attachments */}
                {proposal.attachments && proposal.attachments.length > 0 && (
                  <div>
                    <h4 className="font-medium text-conectify-secondary mb-3">Attachments</h4>
                    <div className="space-y-2">
                      {proposal.attachments.map((attachment: any, index: number) => (
                        <div key={index} className="flex items-center space-x-2 p-2 border rounded">
                          <FileText className="h-4 w-4 text-slate-400" />
                          <span className="text-sm">{attachment.name}</span>
                          <Button variant="ghost" size="sm" className="ml-auto">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            {showActions && proposal.status === 'pending' && (
              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowRejectDialog(true)}
                  disabled={rejectProposalMutation.isPending}
                >
                  <X className="h-4 w-4 mr-2" />
                  Decline
                </Button>
                <Button
                  onClick={handleAccept}
                  disabled={acceptProposalMutation.isPending}
                  className="bg-conectify-primary hover:bg-conectify-primary/90"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Accept Proposal
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Decline Proposal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-conectify-neutral">
              Please provide feedback to help the freelancer improve their future proposals.
            </p>
            <Textarea
              placeholder="Let them know why this proposal wasn't the right fit..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowRejectDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleReject}
                disabled={rejectProposalMutation.isPending || !rejectReason.trim()}
                variant="destructive"
              >
                Decline with Feedback
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}