import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Clock, 
  Award,
  MessageSquare,
  ChevronDown,
  X
} from "lucide-react";

interface EnhancedSearchProps {
  onSearch: (filters: any) => void;
  popularTags: string[];
  className?: string;
}

export default function EnhancedSearch({ onSearch, popularTags, className }: EnhancedSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [status, setStatus] = useState("all");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = () => {
    onSearch({
      search: searchTerm,
      tags: selectedTags,
      sortBy,
      status: status === "all" ? undefined : status
    });
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
    setSortBy("newest");
    setStatus("all");
    onSearch({});
  };

  return (
    <Card className={`enterprise-card ${className}`}>
      <CardContent className="p-6">
        {/* Main search */}
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search questions, answers, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button 
            onClick={handleSearch}
            className="bg-conectify-primary hover:bg-conectify-primary/90"
          >
            Search
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Advanced
            <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        {/* Selected tags */}
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedTags.map(tag => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="bg-conectify-primary/10 text-conectify-primary cursor-pointer hover:bg-conectify-primary/20"
                onClick={() => handleTagRemove(tag)}
              >
                {tag}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            ))}
            <Button variant="ghost" size="sm" onClick={() => setSelectedTags([])}>
              Clear all
            </Button>
          </div>
        )}

        {/* Advanced filters */}
        {showAdvanced && (
          <div className="space-y-4 border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-conectify-secondary mb-2 block">
                  Sort by
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>Newest</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="popular">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4" />
                        <span>Most Popular</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="answers">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>Most Answers</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="bounty">
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4" />
                        <span>Highest Bounty</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-conectify-secondary mb-2 block">
                  Status
                </label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Questions</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="answered">Answered</SelectItem>
                    <SelectItem value="bounty">Has Bounty</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" onClick={clearFilters} className="w-full">
                  Clear Filters
                </Button>
              </div>
            </div>

            {/* Popular tags */}
            <div>
              <label className="text-sm font-medium text-conectify-secondary mb-2 block">
                Popular Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      selectedTags.includes(tag) 
                        ? 'bg-conectify-primary text-white' 
                        : 'hover:bg-conectify-primary/10'
                    }`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick filters */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
          <span className="text-sm font-medium text-conectify-secondary">Quick filters:</span>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setStatus("open");
              handleSearch();
            }}
          >
            Unanswered
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setSortBy("popular");
              handleSearch();
            }}
          >
            Trending
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setStatus("bounty");
              handleSearch();
            }}
          >
            Bounty Available
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}