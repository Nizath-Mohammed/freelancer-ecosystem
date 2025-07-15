import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import VoteButtons from "@/components/qa/vote-buttons";
import AnswerItem from "@/components/qa/answer-item";
import { 
  ChevronUp, 
  ChevronDown, 
  MessageSquare, 
  Share2, 
  Bookmark,
  Flag,
  Award,
  Clock,
  User,
  CheckCircle
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface QuestionDetailProps {
  questionId: string;
}

export default function QuestionDetail({ questionId }: QuestionDetailProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newAnswer, setNewAnswer] = useState("");
  const [showAnswerForm, setShowAnswerForm] = useState(false);

  const { data: question, isLoading } = useQuery({
    queryKey: [`/api/questions/${questionId}`],
  });

  const { data: answers } = useQuery({
    queryKey: [`/api/questions/${questionId}/answers`],
  });

  const submitAnswerMutation = useMutation({
    mutationFn: async (answerData: { content: string; questionId: string }) => {
      return apiRequest('/api/answers', {
        method: 'POST',
        body: JSON.stringify(answerData),
      });
    },
    onSuccess: () => {
      setNewAnswer("");
      setShowAnswerForm(false);
      queryClient.invalidateQueries({ queryKey: [`/api/questions/${questionId}/answers`] });
      toast({ description: "Answer submitted successfully!" });
    },
  });

  const voteQuestionMutation = useMutation({
    mutationFn: async ({ type }: { type: 'up' | 'down' }) => {
      return apiRequest(`/api/questions/${questionId}/vote`, {
        method: 'POST',
        body: JSON.stringify({ type }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/questions/${questionId}`] });
    },
  });

  const handleSubmitAnswer = () => {
    if (!newAnswer.trim()) return;
    
    submitAnswerMutation.mutate({
      content: newAnswer.trim(),
      questionId: questionId
    });
  };

  const handleVote = (type: 'up' | 'down') => {
    voteQuestionMutation.mutate({ type });
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-200 rounded w-3/4"></div>
        <div className="h-32 bg-slate-200 rounded"></div>
        <div className="h-24 bg-slate-200 rounded"></div>
      </div>
    );
  }

  if (!question) {
    return (
      <Card className="enterprise-card">
        <CardContent className="p-8 text-center">
          <h3 className="text-lg font-semibold text-conectify-secondary mb-2">Question Not Found</h3>
          <p className="text-conectify-neutral">The question you're looking for doesn't exist or has been removed.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Question Card */}
      <Card className="enterprise-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl text-conectify-secondary mb-3">
                {question.title}
              </CardTitle>
              <div className="flex items-center space-x-4 text-sm text-conectify-neutral">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>Asked by {question.author?.firstName} {question.author?.lastName}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDistanceToNow(new Date(question.createdAt), { addSuffix: true })}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{answers?.length || 0} answers</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Flag className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            {/* Vote buttons */}
            <div className="flex flex-col items-center space-y-2">
              <VoteButtons
                upvotes={question.upvotes || 0}
                downvotes={question.downvotes || 0}
                userVote={question.userVote}
                onVote={handleVote}
              />
            </div>

            {/* Question content */}
            <div className="flex-1">
              <div className="prose max-w-none mb-4">
                <p className="text-conectify-secondary whitespace-pre-wrap">
                  {question.content}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags?.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="bg-slate-100">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Author info */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={question.author?.profileImageUrl} />
                    <AvatarFallback>
                      {question.author?.firstName?.[0]}{question.author?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-conectify-secondary">
                      {question.author?.firstName} {question.author?.lastName}
                    </div>
                    <div className="text-sm text-conectify-neutral">
                      Level {question.author?.level || 1} • {question.author?.rating || 0} rating
                    </div>
                  </div>
                </div>
                
                {question.status === 'answered' && (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Answered
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Answers */}
      <Card className="enterprise-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{answers?.length || 0} Answers</span>
            <Button 
              onClick={() => setShowAnswerForm(!showAnswerForm)}
              className="bg-conectify-primary hover:bg-conectify-primary/90"
            >
              Add Answer
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Answer form */}
          {showAnswerForm && (
            <div className="border rounded-lg p-4 bg-slate-50">
              <div className="space-y-4">
                <Textarea
                  placeholder="Share your knowledge and help the community..."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  className="min-h-[120px]"
                />
                <div className="flex items-center justify-between">
                  <div className="text-sm text-conectify-neutral">
                    Your answer will be visible to the entire community
                  </div>
                  <div className="space-x-2">
                    <Button 
                      variant="ghost" 
                      onClick={() => setShowAnswerForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSubmitAnswer}
                      disabled={!newAnswer.trim() || submitAnswerMutation.isPending}
                      className="bg-conectify-primary hover:bg-conectify-primary/90"
                    >
                      Submit Answer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Answers list */}
          {answers?.length > 0 ? (
            answers.map((answer: any) => (
              <AnswerItem
                key={answer.id}
                answer={answer}
                questionId={questionId}
                isQuestionAuthor={question.authorId === user?.id}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-conectify-secondary mb-2">
                No answers yet
              </h3>
              <p className="text-conectify-neutral mb-4">
                Be the first to help solve this question!
              </p>
              <Button 
                onClick={() => setShowAnswerForm(true)}
                className="bg-conectify-primary hover:bg-conectify-primary/90"
              >
                Write the first answer
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}