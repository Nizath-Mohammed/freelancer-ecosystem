import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/user-avatar";
import { VoteButtons } from "./vote-buttons";
import { CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Answer, User } from "@/lib/types";

interface AnswerItemProps {
  answer: Answer & { 
    author?: User;
  };
  questionAuthorId?: string;
  canAcceptAnswer?: boolean;
  onAnswerAccepted?: () => void;
  className?: string;
}

export function AnswerItem({ 
  answer, 
  questionAuthorId,
  canAcceptAnswer = false,
  onAnswerAccepted,
  className 
}: AnswerItemProps) {
  const [isAccepted, setIsAccepted] = useState(answer.isAccepted || false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const formatTimeAgo = (dateString: Date | string | null) => {
    if (!dateString) return 'Unknown';
    
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return diffInMinutes <= 1 ? "just now" : `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  const handleAcceptAnswer = async () => {
    if (loading || isAccepted) return;

    setLoading(true);
    try {
      await apiRequest("POST", `/api/qa/answers/${answer.id}/accept`, {});
      
      setIsAccepted(true);
      onAnswerAccepted?.();
      
      toast({
        title: "Answer Accepted",
        description: "This answer has been marked as the accepted solution."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept answer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-200",
      isAccepted && "ring-2 ring-green-200 bg-green-50/50",
      className
    )}>
      <CardContent className="p-6">
        <div className="flex space-x-4">
          <VoteButtons
            itemId={answer.id}
            itemType="answer"
            initialVotes={answer.votes || 0}
            className="flex-shrink-0"
          />

          <div className="flex-1 min-w-0">
            {isAccepted && (
              <div className="flex items-center space-x-2 mb-3">
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Accepted Answer
                </Badge>
              </div>
            )}

            <div className="prose prose-sm max-w-none mb-4">
              <div className="text-slate-900 whitespace-pre-wrap">
                {answer.content}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {canAcceptAnswer && !isAccepted && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAcceptAnswer}
                    disabled={loading}
                    className="text-green-600 border-green-600 hover:bg-green-50"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Accept Answer
                  </Button>
                )}
                
                <span className="text-sm text-slate-500">
                  answered {formatTimeAgo(answer.createdAt)}
                </span>
              </div>

              {answer.author && (
                <div className="flex items-center space-x-2">
                  <UserAvatar user={answer.author} size="sm" />
                  <div className="text-sm">
                    <span className="font-medium text-slate-900">
                      {answer.author.firstName} {answer.author.lastName}
                    </span>
                    {answer.author.id === questionAuthorId && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        Author
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
