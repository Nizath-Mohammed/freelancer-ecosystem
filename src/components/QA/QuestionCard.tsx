import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, MessageSquare, Eye, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Question {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: 'freelancer' | 'client';
  };
  createdAt: string;
  tags: string[];
  votes: number;
  answerCount: number;
  views: number;
  isResolved: boolean;
}

interface QuestionCardProps {
  question: Question;
}

export const QuestionCard = ({ question }: QuestionCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {question.isResolved && (
                <Check className="h-4 w-4 text-green-500" />
              )}
              <h3 className="font-semibold text-lg hover:text-primary cursor-pointer">
                {question.title}
              </h3>
            </div>
            
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
              {question.content}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {question.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 min-w-[60px]">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ArrowUp className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{question.votes}</span>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <ArrowDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={question.author.avatar} alt={question.author.name} />
              <AvatarFallback>{question.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <span className="font-medium">{question.author.name}</span>
              <span className="text-muted-foreground ml-2">
                {formatDistanceToNow(new Date(question.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{question.answerCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{question.views}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};