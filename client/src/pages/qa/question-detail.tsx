import { useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import QuestionCard from "@/components/QuestionCard";
import AnswerCard from "@/components/AnswerCard";
import { 
  ArrowLeft, 
  Edit, 
  Flag, 
  Share2, 
  Star,
  Clock,
  Eye,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function QuestionDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [newAnswer, setNewAnswer] = useState("");
  const [editingAnswer, setEditingAnswer] = useState<string | null>(null);

  const { data: question, isLoading } = useQuery({
    queryKey: [`/api/questions/${id}`],
    enabled: !!id,
  });

  const { data: answers = [] } = useQuery({
    queryKey: [`/api/questions/${id}/answers`],
    enabled: !!id,
  });

  const submitAnswerMutation = useMutation({
    mutationFn: async (content: string) => {
      return apiRequest(`/api/questions/${id}/answers`, {
        method: "POST",
        body: JSON.stringify({ content }),
      });
    },
    onSuccess: () => {
      toast({ description: "Answer submitted successfully!" });
      setNewAnswer("");
      queryClient.invalidateQueries({ queryKey: [`/api/questions/${id}/answers`] });
    },
    onError: (error: any) => {
      toast({
        description: error.message || "Failed to submit answer",
        variant: "destructive",
      });
    },
  });

  const voteMutation = useMutation({
    mutationFn: async ({ type, targetId, targetType }: {
      type: 'up' | 'down';
      targetId: string;
      targetType: 'question' | 'answer';
    }) => {
      return apiRequest(`/api/votes`, {
        method: "POST",
        body: JSON.stringify({ type, targetId, targetType }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/questions/${id}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/questions/${id}/answers`] });
    },
  });

  const acceptAnswerMutation = useMutation({
    mutationFn: async (answerId: string) => {
      return apiRequest(`/api/answers/${answerId}/accept`, {
        method: "POST",
      });
    },
    onSuccess: () => {
      toast({ description: "Answer accepted!" });
      queryClient.invalidateQueries({ queryKey: [`/api/questions/${id}/answers`] });
    },
  });

  const handleSubmitAnswer = () => {
    if (!newAnswer.trim()) return;
    submitAnswerMutation.mutate(newAnswer);
  };

  const handleVote = (type: 'up' | 'down', targetId: string, targetType: 'question' | 'answer') => {
    voteMutation.mutate({ type, targetId, targetType });
  };

  const handleAcceptAnswer = (answerId: string) => {
    acceptAnswerMutation.mutate(answerId);
  };

  // Mock data for demonstration
  const mockQuestion = {
    id: id || "1",
    title: "How to implement real-time notifications in React?",
    content: "I'm building a web application with React and I need to implement real-time notifications. What's the best approach to handle this? I've heard about WebSockets, Server-Sent Events, and polling. Which one would you recommend for a production application?",
    tags: ["react", "websockets", "notifications", "real-time"],
    votes: 15,
    views: 342,
    answers: 3,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    author: {
      id: "author1",
      firstName: "John",
      lastName: "Developer",
      profileImageUrl: null,
      rating: 4.5,
      level: 2,
    },
    isAccepted: false,
  };

  const mockAnswers = [
    {
      id: "1",
      content: "For real-time notifications in React, I'd recommend using WebSockets with Socket.io. It provides excellent real-time capabilities and fallback options. Here's a basic implementation:\n\n```javascript\nimport io from 'socket.io-client';\n\nconst socket = io('http://localhost:3001');\n\nsocket.on('notification', (data) => {\n  // Handle notification\n  showNotification(data.message);\n});\n```\n\nMake sure to handle connection states and reconnection logic for production.",
      votes: 8,
      isAccepted: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      author: {
        id: "author2",
        firstName: "Sarah",
        lastName: "Johnson",
        profileImageUrl: null,
        rating: 4.8,
        level: 3,
      },
    },
    {
      id: "2",
      content: "Another approach is using Server-Sent Events (SSE) which is simpler for one-way communication from server to client. It's great for notifications and works well with React:\n\n```javascript\nconst eventSource = new EventSource('/api/notifications');\n\neventSource.onmessage = (event) => {\n  const notification = JSON.parse(event.data);\n  setNotifications(prev => [...prev, notification]);\n};\n```\n\nSSE is easier to implement than WebSockets if you only need server-to-client communication.",
      votes: 12,
      isAccepted: true,
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      author: {
        id: "author3",
        firstName: "Michael",
        lastName: "Chen",
        profileImageUrl: null,
        rating: 4.9,
        level: 4,
      },
    },
    {
      id: "3",
      content: "For simple use cases, you can also use polling with React Query or SWR. While not truly real-time, it's sufficient for many applications:\n\n```javascript\nconst { data: notifications } = useQuery(\n  'notifications',\n  fetchNotifications,\n  { refetchInterval: 30000 }\n);\n```\n\nThis approach is easier to implement and debug, especially for smaller applications.",
      votes: 3,
      isAccepted: false,
      createdAt: new Date(Date.now() - 14400000).toISOString(),
      author: {
        id: "author4",
        firstName: "Emma",
        lastName: "Wilson",
        profileImageUrl: null,
        rating: 4.3,
        level: 2,
      },
    },
  ];

  const isQuestionAuthor = user?.id === mockQuestion.author.id;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded mb-4"></div>
          <div className="h-32 bg-slate-200 rounded mb-4"></div>
          <div className="h-48 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center space-x-4">
        <Link href="/qa">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Q&A
          </Button>
        </Link>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            <Eye className="h-3 w-3 mr-1" />
            {mockQuestion.views} views
          </Badge>
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" />
            {formatDistanceToNow(new Date(mockQuestion.createdAt), { addSuffix: true })}
          </Badge>
        </div>
      </div>

      {/* Question */}
      <Card className="enterprise-card">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            {/* Voting */}
            <div className="flex flex-col items-center space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('up', mockQuestion.id, 'question')}
              >
                <ThumbsUp className="h-5 w-5" />
              </Button>
              <span className="text-lg font-semibold text-conectify-secondary">
                {mockQuestion.votes}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote('down', mockQuestion.id, 'question')}
              >
                <ThumbsDown className="h-5 w-5" />
              </Button>
            </div>

            {/* Question Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-conectify-secondary">
                  {mockQuestion.title}
                </h1>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Flag className="h-4 w-4" />
                  </Button>
                  {isQuestionAuthor && (
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="prose prose-sm max-w-none mb-6">
                <p className="text-conectify-neutral whitespace-pre-wrap">
                  {mockQuestion.content}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {mockQuestion.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-conectify-accent text-conectify-secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={mockQuestion.author.profileImageUrl} />
                    <AvatarFallback>
                      {mockQuestion.author.firstName[0]}{mockQuestion.author.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-conectify-secondary">
                      {mockQuestion.author.firstName} {mockQuestion.author.lastName}
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-conectify-neutral">
                      <Star className="h-3 w-3 text-yellow-400" />
                      <span>{mockQuestion.author.rating}</span>
                      <span>•</span>
                      <span>Level {mockQuestion.author.level}</span>
                    </div>
                  </div>
                </div>
                <span className="text-sm text-conectify-neutral">
                  asked {formatDistanceToNow(new Date(mockQuestion.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Answers */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-conectify-secondary">
            {mockAnswers.length} Answer{mockAnswers.length !== 1 ? 's' : ''}
          </h2>
          <Button variant="outline" size="sm">
            Sort by: Best
          </Button>
        </div>

        {mockAnswers.map((answer) => (
          <AnswerCard
            key={answer.id}
            answer={answer}
            questionId={mockQuestion.id}
            isQuestionAuthor={isQuestionAuthor}
            onAccept={handleAcceptAnswer}
          />
        ))}
      </div>

      {/* Answer Form */}
      {user && (
        <Card className="enterprise-card">
          <CardHeader>
            <CardTitle className="text-conectify-secondary">Your Answer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="Write your answer here..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                rows={6}
                className="min-h-[120px]"
              />
              <div className="flex items-center justify-between">
                <p className="text-sm text-conectify-neutral">
                  Be specific and provide examples when possible
                </p>
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={!newAnswer.trim() || submitAnswerMutation.isPending}
                  className="bg-conectify-primary hover:bg-conectify-primary/90"
                >
                  {submitAnswerMutation.isPending ? "Submitting..." : "Submit Answer"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}