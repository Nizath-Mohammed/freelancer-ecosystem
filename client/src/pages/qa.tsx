import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import QuestionCard from "@/components/QuestionCard";
import CreateQuestionDialog from "@/components/CreateQuestionDialog";
import EnhancedSearch from "@/components/qa/enhanced-search";
import { 
  Search, 
  Plus, 
  TrendingUp, 
  Star, 
  Award,
  MessageSquare,
  Users,
  Clock
} from "lucide-react";

export default function QA() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { data: questions, isLoading } = useQuery({
    queryKey: ["/api/questions", { search: searchTerm, tags: selectedTags }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedTags.length) params.append('tags', selectedTags.join(','));
      
      const response = await fetch(`/api/questions?${params}`);
      if (!response.ok) throw new Error('Failed to fetch questions');
      return response.json();
    },
  });

  const { data: badges } = useQuery({
    queryKey: ["/api/badges"],
  });

  const popularTags = [
    'react', 'node.js', 'javascript', 'python', 'aws', 'design', 'mongodb', 'typescript'
  ];

  const topContributors = [
    { name: "Michael Torres", reputation: 15240, badges: 95 },
    { name: "Lisa Zhang", reputation: 12890, badges: 78 },
    { name: "David Kumar", reputation: 9650, badges: 62 },
  ];

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Knowledge Community</h1>
          <p className="text-slate-600 mt-1">
            Learn from experts, share knowledge, and build your reputation in our Q&A platform.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-green-600 border-green-600">
            {questions?.length || 0} Active Questions
          </Badge>
          <CreateQuestionDialog />
        </div>
      </div>

      {/* Enhanced Search */}
      <EnhancedSearch 
        onSearch={(filters) => {
          setSearchTerm(filters.search || "");
          setSelectedTags(filters.tags || []);
        }}
        popularTags={popularTags}
      />

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Questions Feed */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="recent">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              <TabsTrigger value="my-questions">My Questions</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-6 mt-6">
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="h-4 bg-slate-200 rounded mb-4"></div>
                        <div className="h-20 bg-slate-200 rounded mb-4"></div>
                        <div className="flex space-x-2">
                          <div className="h-6 w-16 bg-slate-200 rounded"></div>
                          <div className="h-6 w-16 bg-slate-200 rounded"></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : questions && questions.length > 0 ? (
                <div className="space-y-6">
                  {questions.map((question: any) => (
                    <QuestionCard key={question.id} question={question} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No questions found</h3>
                    <p className="text-slate-600 mb-6">
                      {searchTerm || selectedTags.length > 0
                        ? "Try adjusting your search or filters."
                        : "Be the first to ask a question!"}
                    </p>
                    <Button>Ask the First Question</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="popular" className="space-y-6 mt-6">
              {/* Similar structure for popular questions */}
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Popular questions will appear here</p>
              </div>
            </TabsContent>

            <TabsContent value="unanswered" className="space-y-6 mt-6">
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600">Unanswered questions will appear here</p>
              </div>
            </TabsContent>

            <TabsContent value="my-questions" className="space-y-6 mt-6">
              {user ? (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600">Your questions will appear here</p>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <p className="text-slate-600 mb-4">Sign in to see your questions</p>
                    <Button onClick={() => window.location.href = "/api/login"}>
                      Sign In
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Contributors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Top Contributors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topContributors.map((contributor, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>
                      {contributor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{contributor.name}</p>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-primary font-medium">{contributor.reputation.toLocaleString()} rep</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                        <span className="text-slate-600">{contributor.badges}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <Award className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Knowledge Leader</p>
                  <p className="text-xs text-slate-600">10+ accepted answers</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Star className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">First Answer</p>
                  <p className="text-xs text-slate-600">Posted first answer</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Curious</p>
                  <p className="text-xs text-slate-600">Asked good question</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Q&A Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Community Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Total Questions</span>
                <span className="font-semibold text-slate-900">{questions?.length || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Answered Today</span>
                <span className="font-semibold text-slate-900">42</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Active Users</span>
                <span className="font-semibold text-slate-900">1,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Average Response</span>
                <span className="font-semibold text-slate-900">2.5 hours</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
