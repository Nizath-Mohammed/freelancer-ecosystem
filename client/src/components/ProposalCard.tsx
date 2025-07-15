import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Clock, 
  DollarSign, 
  Star, 
  Eye, 
  MessageSquare, 
  Calendar,
  CheckCircle,
  XCircle,
  User
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import type { Proposal } from "@shared/schema";

interface ProposalCardProps {
  proposal: Proposal & {
    freelancer: {
      firstName: string;
      lastName: string;
      profileImageUrl?: string;
      rating: number;
      completedProjects: number;
      skills: string[];
    };
  };
  onAccept?: (proposalId: string) => void;
  onReject?: (proposalId: string) => void;
  showActions?: boolean;
  variant?: "default" | "compact";
}

export default function ProposalCard({ 
  proposal, 
  onAccept, 
  onReject, 
  showActions = false,
  variant = "default" 
}: ProposalCardProps) {
  const [showFullLetter, setShowFullLetter] = useState(false);
  
  const freelancer = proposal.freelancer;
  const statusColor = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800"
  };

  const getDeliveryText = (days: number) => {
    if (days === 1) return "1 day";
    if (days < 7) return `${days} days`;
    if (days < 30) return `${Math.floor(days / 7)} weeks`;
    return `${Math.floor(days / 30)} months`;
  };

  if (variant === "compact") {
    return (
      <Card className="enterprise-card hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={freelancer.profileImageUrl} />
                <AvatarFallback>
                  {freelancer.firstName[0]}{freelancer.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-conectify-secondary">
                  {freelancer.firstName} {freelancer.lastName}
                </div>
                <div className="flex items-center space-x-2 text-sm text-conectify-neutral">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    {freelancer.rating} ({freelancer.completedProjects} projects)
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-conectify-primary text-lg">
                ${proposal.bidAmount}
              </div>
              <div className="text-sm text-conectify-neutral">
                {getDeliveryText(proposal.deliveryTime)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="enterprise-card hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={freelancer.profileImageUrl} />
              <AvatarFallback>
                {freelancer.firstName[0]}{freelancer.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-conectify-secondary text-lg">
                {freelancer.firstName} {freelancer.lastName}
              </div>
              <div className="flex items-center space-x-4 text-sm text-conectify-neutral">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  {freelancer.rating} ({freelancer.completedProjects} projects)
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDistanceToNow(new Date(proposal.createdAt), { addSuffix: true })}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Badge className={statusColor[proposal.status as keyof typeof statusColor]}>
              {proposal.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Bid Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-conectify-primary" />
            <div>
              <div className="font-semibold text-conectify-secondary">Bid Amount</div>
              <div className="text-2xl font-bold text-conectify-primary">${proposal.bidAmount}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-conectify-primary" />
            <div>
              <div className="font-semibold text-conectify-secondary">Delivery Time</div>
              <div className="text-lg font-semibold text-conectify-neutral">
                {getDeliveryText(proposal.deliveryTime)}
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="font-semibold text-conectify-secondary mb-2">Skills</div>
          <div className="flex flex-wrap gap-2">
            {freelancer.skills.slice(0, 6).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {freelancer.skills.length > 6 && (
              <Badge variant="outline" className="text-xs">
                +{freelancer.skills.length - 6} more
              </Badge>
            )}
          </div>
        </div>

        {/* Cover Letter */}
        <div>
          <div className="font-semibold text-conectify-secondary mb-2">Cover Letter</div>
          <div className="text-conectify-neutral">
            {proposal.coverLetter.length > 200 ? (
              <>
                {showFullLetter ? proposal.coverLetter : `${proposal.coverLetter.substring(0, 200)}...`}
                <Button 
                  variant="link" 
                  size="sm" 
                  className="p-0 ml-2 text-conectify-primary"
                  onClick={() => setShowFullLetter(!showFullLetter)}
                >
                  {showFullLetter ? 'Show less' : 'Read more'}
                </Button>
              </>
            ) : (
              proposal.coverLetter
            )}
          </div>
        </div>

        {/* Actions */}
        {showActions && proposal.status === 'pending' && (
          <div className="flex space-x-3 pt-4 border-t">
            <Button
              onClick={() => onAccept?.(proposal.id)}
              className="flex-1 bg-conectify-success hover:bg-conectify-success/90"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Accept Proposal
            </Button>
            <Button
              onClick={() => onReject?.(proposal.id)}
              variant="outline"
              className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Decline
            </Button>
          </div>
        )}

        {/* Contact Options */}
        <div className="flex space-x-2 pt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Freelancer Profile</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={freelancer.profileImageUrl} />
                    <AvatarFallback>
                      {freelancer.firstName[0]}{freelancer.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-lg">
                      {freelancer.firstName} {freelancer.lastName}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{freelancer.rating} ({freelancer.completedProjects} projects)</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="font-semibold mb-2">Skills</div>
                  <div className="flex flex-wrap gap-2">
                    {freelancer.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}