import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ChevronUp, 
  ChevronDown, 
  MessageSquare, 
  Eye, 
  CheckCircle,
  Clock,
  Bookmark,
  Share2
} from "lucide-react";
import { Link } from "wouter";
import { Question } from "@shared/schema";

interface QuestionCardProps {
  question: Question;
  showVoting?: boolean;
  variant?: "default" | "compact";
}

export default function QuestionCard({ question, showVoting = true, variant = "default" }: QuestionCardProps) {
  const isCompact = variant === "compact";
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'answered': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className={cn("p-6", isCompact && "p-4")}>
        <div className="flex space-x-4">
          {/* Vote Section */}
          {showVoting && (
            <div className="flex flex-col items-center space-y-1 min-w-[50px]">
              <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                <ChevronUp className="h-5 w-5 text-slate-400 hover:text-primary" />
              </Button>
              <span className={cn(
                "font-semibold text-slate-900",
                isCompact ? "text-sm" : "text-base"
              )}>
                {question.votes}
              </span>
              <Button variant="ghost" size="sm" className="p-1 h-8 w-8">
                <ChevronDown className="h-5 w-5 text-slate-400 hover:text-red-500" />
              </Button>
              <div className="text-center mt-2">
                <Badge 
                  variant="secondary" 
                  className={cn("text-xs mb-1", getStatusColor(question.status))}
                >
                  {question.status === 'answered' && question.acceptedAnswerId && (
                    <CheckCircle className="mr-1 h-3 w-3" />
                  )}
                  {question.status === 'answered' ? 'Solved' : 
                   question.status === 'closed' ? 'Closed' : 'Open'}
                </Badge>
                <div className="text-xs text-slate-600">
                  {question.answerCount} answer{question.answerCount !== 1 ? 's' : ''}
                </div>
              </div>
            </div>
          )}

          {/* Question Content */}
          <div className="flex-1">
            <Link href={`/qa/${question.id}`}>
              <h3 className={cn(
                "font-semibold text-slate-900 mb-2 hover:text-primary cursor-pointer transition-colors",
                isCompact ? "text-base" : "text-lg"
              )}>
                {question.title}
              </h3>
            </Link>
            
            <p className={cn(
              "text-slate-600 mb-3",
              isCompact ? "text-sm" : "text-base"
            )}>
              {isCompact ? truncateContent(question.content, 150) : truncateContent(question.content)}
            </p>

            {/* Code snippet preview if content contains code */}
            {question.content.includes('```') && (
              <div className="bg-slate-900 rounded-lg p-3 mb-4 text-sm">
                <code className="text-slate-300">
                  {/* Extract and display first code block */}
                  {question.content.match(/```[\s\S]*?```/)?.[0]?.replace(/```/g, '') || 'Code snippet...'}
                </code>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {question.tags?.slice(0, 4).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs hover:bg-slate-100 cursor-pointer">
                  {tag}
                </Badge>
              ))}
              {question.tags && question.tags.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{question.tags.length - 4} more
                </Badge>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex justify-between items-center text-sm text-slate-600">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>asked {new Date(question.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="mr-1 h-3 w-3" />
                  <span>{question.views} views</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs">
                      {question.authorId.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-slate-900">Author</span>
                  <span className="text-primary font-medium">2,340 rep</span>
                </div>
              </div>
              
              {!isCompact && (
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Bookmark className="mr-1 h-3 w-3" />
                    Save
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Share2 className="mr-1 h-3 w-3" />
                    Share
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
