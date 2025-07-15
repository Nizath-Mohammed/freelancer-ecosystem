import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "@/components/ui/user-avatar";
import { VoteButtons } from "./vote-buttons";
import { Link } from "wouter";
import { CheckCircle, Clock, MessageSquare, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Question, User } from "@/lib/types";

interface QuestionItemProps {
  question: Question & { 
    author?: User;
  };
  compact?: boolean;
  showVoting?: boolean;
  className?: string;
}

export function QuestionItem({ 
  question, 
  compact = false, 
  showVoting = true,
  className 
}: QuestionItemProps) {
  const getStatusColor = (status: string, hasAcceptedAnswer: boolean) => {
    if (hasAcceptedAnswer) {
      return "bg-green-100 text-green-800 border-green-200";
    }
    switch (status) {
      case 'open':
        return "bg-blue-100 text-blue-800 border-blue-200";
      case 'answered':
        return "bg-amber-100 text-amber-800 border-amber-200";
      case 'closed':
        return "bg-slate-100 text-slate-800 border-slate-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const getStatusIcon = (status: string, hasAcceptedAnswer: boolean) => {
    if (hasAcceptedAnswer) {
      return CheckCircle;
    }
    switch (status) {
      case 'open':
        return Clock;
      case 'answered':
        return MessageSquare;
      default:
        return Clock;
    }
  };

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

  const hasAcceptedAnswer = !!question.acceptedAnswerId;
  const StatusIcon = getStatusIcon(question.status || 'open', hasAcceptedAnswer);

  if (compact) {
    return (
      <div className={cn("border-b border-slate-200 py-4", className)}>
        <div className="flex space-x-3">
          {showVoting && (
            <VoteButtons
              itemId={question.id}
              itemType="question"
              initialVotes={question.votes || 0}
              className="flex-shrink-0"
            />
          )}
          
          <div className="flex-1 min-w-0">
            <Link href={`/qa/questions/${question.id}`}>
              <h3 className="font-medium text-slate-900 hover:text-primary transition-colors line-clamp-2">
                {question.title}
              </h3>
            </Link>
            
            <div className="flex items-center space-x-4 mt-2 text-sm text-slate-600">
              <div className="flex items-center space-x-1">
                <StatusIcon className="h-4 w-4" />
                <span>{question.answerCount || 0} answers</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{question.views || 0} views</span>
              </div>
              <span>asked {formatTimeAgo(question.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className={cn("hover:shadow-sm transition-shadow", className)}>
      <CardContent className="p-6">
        <div className="flex space-x-4">
          {showVoting && (
            <VoteButtons
              itemId={question.id}
              itemType="question"
              initialVotes={question.votes || 0}
              className="flex-shrink-0"
            />
          )}

          <div className="flex-1 min-w-0">
            <Link href={`/qa/questions/${question.id}`}>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 hover:text-primary transition-colors">
                {question.title}
              </h3>
            </Link>
            
            <p className="text-slate-600 mb-4 line-clamp-3">
              {question.content}
            </p>

            {question.tags && question.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-slate-600">
                <Badge 
                  variant="outline"
                  className={cn("text-xs", getStatusColor(question.status || 'open', hasAcceptedAnswer))}
                >
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {hasAcceptedAnswer ? 'Solved' : (question.status || 'open')}
                </Badge>
                <span>{question.answerCount || 0} answers</span>
                <span>{question.views || 0} views</span>
                <span>asked {formatTimeAgo(question.createdAt)}</span>
              </div>

              {question.author && (
                <div className="flex items-center space-x-2">
                  <UserAvatar user={question.author} size="sm" />
                  <div className="text-sm">
                    <span className="font-medium text-slate-900">
                      {question.author.firstName} {question.author.lastName}
                    </span>
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
