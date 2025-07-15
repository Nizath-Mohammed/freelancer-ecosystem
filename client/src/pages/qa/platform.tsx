import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuestionItem } from "@/components/qa/question-item";
import { UserAvatar } from "@/components/ui/user-avatar";
import { Link } from "wouter";
import { 
  Search, 
  Plus, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  HelpCircle,
  Star,
  Trophy,
  Brain,
  Target
} from "lucide-react";
import { SKILLS } from "@/lib/constants";
import type { Question, User } from "@/lib/types";

export default function QAPlatform() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const { data: questions = [], isLoading } = useQuery({
    queryKey: ["/api/qa/questions", { tags: selectedTag, search: searchQuery }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedTag) params.append("tags", selectedTag);
      const url = `/api/qa/questions${params.toString() ? `?${params.toString()}` : ""}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch questions");
      return response.json();
    }
  });

  const filteredQuestions = questions.filter((question: Question) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        question.title.toLowerCase().includes(query) ||
        question.content.toLowerCase().includes(query) ||
        question.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    return true;
  });

  const sortedQuestions = [...filteredQuestions].sort((a: Question, b: Question) => {
    switch (sortBy) {
      case "votes":
        return (b.votes || 0) - (a.votes || 0);
      case "answers":
        return (b.answerCount || 0) - (a.answerCount || 0);
      case "newest":
      default:
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    }
  });

  const popularTags = [
    "React", "JavaScript", "Node.js", "Python", "CSS", "TypeScript", 
    "MongoDB", "API", "Database", "Authentication", "Deployment", "Testing"
  ];

  const topContributors = [
    {
      id: "1",
      name: "Michael Torres",
      reputation: 15240,
      badges: 95,
      avatar: "MT"
    },
    {
      id: "2", 
      name: "Lisa Zhang",
      reputation: 12890,
      badges: 78,
      avatar: "LZ"
    },
    {
      id: "3",
      name: "David Kumar", 
      reputation: 9650,
      badges: 62,
      avatar: "DK"
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Knowledge Community</h1>
            <p className="text-slate-600">Learn from experts, share knowledge, and build your reputation</p>
          </div>
          <Button asChild>
            <Link href="/qa/ask" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Ask Question</span>
            </Link>
          </Button>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <Input
                        placeholder="Search questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="votes">Most Voted</SelectItem>
                      <SelectItem value="answers">Most Answered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedTag === "" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTag("")}
                    >
                      All Topics
                    </Button>
                    {popularTags.slice(0, 8).map(tag => (
                      <Button
                        key={tag}
                        variant={selectedTag === tag ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                  <div className="text-sm text-slate-600">
                    {sortedQuestions.length} questions
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Questions List */}
            {sortedQuestions.length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <HelpCircle className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">No questions found</h3>
                  <p className="text-slate-600 mb-4">
                    Be the first to ask a question in this topic!
                  </p>
                  <Button asChild>
                    <Link href="/qa/ask">Ask Question</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {sortedQuestions.map((question: Question & { author?: User }) => (
                  <QuestionItem
                    key={question.id}
                    question={question}
                    showVoting={true}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Widget */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Community Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <HelpCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm text-slate-600">Questions</span>
                    </div>
                    <span className="font-semibold text-slate-900">2,847</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-slate-600">Answered</span>
                    </div>
                    <span className="font-semibold text-slate-900">2,156</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-amber-500" />
                      <span className="text-sm text-slate-600">This Week</span>
                    </div>
                    <span className="font-semibold text-slate-900">127</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Top Contributors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topContributors.map((contributor, index) => (
                    <div key={contributor.id} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-slate-500 w-4">#{index + 1}</span>
                        <UserAvatar 
                          user={{ firstName: contributor.avatar.split('')[0], lastName: contributor.avatar.split('')[1] }} 
                          size="sm" 
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">{contributor.name}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-primary font-medium">
                            {contributor.reputation.toLocaleString()} rep
                          </span>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                            <span className="text-xs text-slate-600">{contributor.badges}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map(tag => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-white transition-colors"
                      onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <Trophy className="h-4 w-4 text-amber-600" />
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
                      <Brain className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Curious</p>
                      <p className="text-xs text-slate-600">Asked good question</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How to Ask */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Target className="h-4 w-4 mr-2" />
                  How to Ask
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-slate-600">
                  <p>• Search to see if your question exists</p>
                  <p>• Write a clear, specific title</p>
                  <p>• Include relevant code examples</p>
                  <p>• Add appropriate tags</p>
                  <p>• Be respectful and constructive</p>
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link href="/qa/help">
                    Learn More
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
