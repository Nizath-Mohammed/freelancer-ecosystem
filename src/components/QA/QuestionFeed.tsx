import { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { QuestionForm } from './QuestionForm';
import { mockQuestions } from '@/data/mockQuestions';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const QuestionFeed = () => {
  const [questions, setQuestions] = useState(mockQuestions);
  const [showForm, setShowForm] = useState(false);

  const handleAskQuestion = (questionData: { title: string; content: string; tags: string[] }) => {
    const newQuestion = {
      id: Date.now().toString(),
      title: questionData.title,
      content: questionData.content,
      author: {
        name: "Alex Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        role: "freelancer" as const
      },
      createdAt: new Date().toISOString(),
      tags: questionData.tags,
      votes: 0,
      answerCount: 0,
      views: 0,
      isResolved: false
    };

    setQuestions([newQuestion, ...questions]);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Recent</Button>
          <Button variant="outline" size="sm">Most Voted</Button>
          <Button variant="outline" size="sm">Unanswered</Button>
        </div>
        
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Ask Question
        </Button>
      </div>

      {showForm && (
        <QuestionForm 
          onSubmit={handleAskQuestion}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="space-y-4">
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>
    </div>
  );
};