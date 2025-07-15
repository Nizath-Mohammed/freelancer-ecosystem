import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  ThumbsUp, 
  ThumbsDown, 
  CheckCircle, 
  MessageSquare, 
  Calendar,
  Award
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Answer } from "@shared/schema";

interface AnswerCardProps {
  answer: Answer & {
    author: {
      firstName: string;
      lastName: string;
      profileImageUrl?: string;
      rating: number;
      level: number;
    };
  };
  questionId: string;
  isQuestionAuthor?: boolean;
  onAccept?: (answerId: string) => void;
}

export default function AnswerCard({ 
  answer, 
  questionId, 
  isQuestionAuthor = false, 
  onAccept 
}: AnswerCardProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const voteMutation = useMutation({
    mutationFn: async ({ type }: { type: 'up' | 'down' }) => {
      return apiRequest(`/api/answers/${answer.id}/vote`, {
        method: "POST",
        body: JSON.stringify({ type }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/questions/${questionId}/answers`] });
    },
    onError: (error: any) => {
      toast({ 
        description: error.message || "Failed to vote",
        variant: "destructive"
      });
    },
  });

  const acceptMutation = useMutation({
    mutationFn: async () => {
      return apiRequest(`/api/answers/${answer.id}/accept`, {
        method: "POST",
      });
    },
    onSuccess: () => {
      toast({ description: "Answer accepted!" });
      queryClient.invalidateQueries({ queryKey: [`/api/questions/${questionId}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/questions/${questionId}/answers`] });
      onAccept?.(answer.id);
    },
    onError: (error: any) => {
      toast({ 
        description: error.message || "Failed to accept answer",
        variant: "destructive"
      });
    },
  });

  const handleVote = (type: 'up' | 'down') => {
    if (!user) {
      toast({ description: "Please log in to vote", variant: "destructive" });
      return;
    }
    voteMutation.mutate({ type });
  };

  const handleAccept = () => {
    acceptMutation.mutate();
  };

  return (
    <Card className={`enterprise-card ${answer.isAccepted ? 'border-green-500 bg-green-50' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={answer.author.profileImageUrl} />
              <AvatarFallback>
                {answer.author.firstName[0]}{answer.author.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-conectify-secondary flex items-center space-x-2">
                <span>{answer.author.firstName} {answer.author.lastName}</span>
                <Badge variant="outline" className="text-xs">
                  Level {answer.author.level}
                </Badge>
                {answer.isAccepted && (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Accepted
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-conectify-neutral">
                <Calendar className="h-4 w-4" />
                <span>{formatDistanceToNow(new Date(answer.createdAt), { addSuffix: true })}</span>
              </div>
            </div>
          </div>
          
          {/* Voting */}
          <div className="flex items-center space-x-2">
            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('up')}
                disabled={voteMutation.isPending}
                className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600"
              >
                <ThumbsUp className="h-4 w-4" />
              </Button>
              <span className="text-sm font-semibold text-conectify-neutral">
                {answer.votes}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('down')}
                disabled={voteMutation.isPending}
                className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
              >
                <ThumbsDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Answer Content */}
        <div className="prose max-w-none text-conectify-neutral">
          <div style={{ whiteSpace: 'pre-wrap' }}>
            {answer.content}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Reply
            </Button>
          </div>
          
          {isQuestionAuthor && !answer.isAccepted && (
            <Button
              onClick={handleAccept}
              disabled={acceptMutation.isPending}
              className="bg-conectify-success hover:bg-conectify-success/90"
              size="sm"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {acceptMutation.isPending ? "Accepting..." : "Accept Answer"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}