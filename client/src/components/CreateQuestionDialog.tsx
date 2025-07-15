import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, X, HelpCircle } from "lucide-react";

const questionSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  content: z.string().min(30, "Content must be at least 30 characters"),
});

type QuestionForm = z.infer<typeof questionSchema>;

interface CreateQuestionDialogProps {
  trigger?: React.ReactNode;
}

export default function CreateQuestionDialog({ trigger }: CreateQuestionDialogProps) {
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<QuestionForm>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const createQuestionMutation = useMutation({
    mutationFn: async (data: QuestionForm & { tags: string[] }) => {
      return apiRequest("/api/questions", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({ description: "Question posted successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/questions"] });
      setOpen(false);
      form.reset();
      setTags([]);
    },
    onError: (error: any) => {
      toast({ 
        description: error.message || "Failed to post question",
        variant: "destructive"
      });
    },
  });

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 5) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const onSubmit = (data: QuestionForm) => {
    createQuestionMutation.mutate({ ...data, tags });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-conectify-primary hover:bg-conectify-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Ask Question
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <HelpCircle className="h-5 w-5 text-conectify-primary" />
            <span>Ask a Question</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="title">Question Title</Label>
            <Input
              id="title"
              placeholder="What's your programming question? Be specific."
              {...form.register("title")}
              className="mt-1"
            />
            {form.formState.errors.title && (
              <p className="text-sm text-red-600 mt-1">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="content">Question Details</Label>
            <Textarea
              id="content"
              placeholder="Provide more details about your question. Include any code, error messages, or specific context that would help others understand your problem."
              rows={6}
              {...form.register("content")}
              className="mt-1"
            />
            {form.formState.errors.content && (
              <p className="text-sm text-red-600 mt-1">
                {form.formState.errors.content.message}
              </p>
            )}
          </div>

          <div>
            <Label>Tags (up to 5)</Label>
            <div className="flex flex-wrap gap-2 mt-2 mb-3">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag (e.g., javascript, react, node.js)"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={tags.length >= 5}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={addTag}
                disabled={!newTag.trim() || tags.length >= 5}
                variant="outline"
              >
                Add
              </Button>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Add up to 5 tags to describe what your question is about
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={createQuestionMutation.isPending}
              className="bg-conectify-primary hover:bg-conectify-primary/90"
            >
              {createQuestionMutation.isPending ? "Posting..." : "Post Question"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}