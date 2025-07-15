import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface VoteButtonsProps {
  itemId: string;
  itemType: 'question' | 'answer';
  initialVotes: number;
  userVote?: 'up' | 'down' | null;
  onVoteChange?: (newVotes: number) => void;
  className?: string;
}

export function VoteButtons({ 
  itemId, 
  itemType, 
  initialVotes, 
  userVote,
  onVoteChange,
  className 
}: VoteButtonsProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [currentVote, setCurrentVote] = useState<'up' | 'down' | null>(userVote || null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleVote = async (voteType: 'up' | 'down') => {
    if (loading) return;

    setLoading(true);
    try {
      // Determine the new vote state
      let newVote: 'up' | 'down' | null = voteType;
      let voteChange = 0;

      if (currentVote === voteType) {
        // Clicking the same vote removes it
        newVote = null;
        voteChange = voteType === 'up' ? -1 : 1;
      } else if (currentVote === null) {
        // No previous vote
        voteChange = voteType === 'up' ? 1 : -1;
      } else {
        // Switching from one vote to another
        voteChange = voteType === 'up' ? 2 : -2;
      }

      // Update local state optimistically
      const newVotes = votes + voteChange;
      setVotes(newVotes);
      setCurrentVote(newVote);

      // Call the API
      await apiRequest("POST", `/api/qa/${itemType}s/${itemId}/vote`, {
        voteType: newVote
      });

      onVoteChange?.(newVotes);
    } catch (error) {
      // Revert on error
      setVotes(votes);
      setCurrentVote(currentVote);
      
      toast({
        title: "Vote Failed",
        description: "There was an error recording your vote. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col items-center space-y-1", className)}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote('up')}
        disabled={loading}
        className={cn(
          "p-2 h-8 w-8 hover:bg-green-50 hover:text-green-600",
          currentVote === 'up' && "bg-green-50 text-green-600"
        )}
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
      
      <span className={cn(
        "font-semibold text-sm min-w-[2rem] text-center",
        votes > 0 ? "text-green-600" : votes < 0 ? "text-red-600" : "text-slate-600"
      )}>
        {votes}
      </span>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleVote('down')}
        disabled={loading}
        className={cn(
          "p-2 h-8 w-8 hover:bg-red-50 hover:text-red-600",
          currentVote === 'down' && "bg-red-50 text-red-600"
        )}
      >
        <ArrowDown className="h-5 w-5" />
      </Button>
    </div>
  );
}
