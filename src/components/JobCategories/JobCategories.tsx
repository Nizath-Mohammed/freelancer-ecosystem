
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface JobCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  'All',
  'AI & Machine Learning',
  'Software Development',
  'Web Development',
  'Mobile Development',
  'Data Science',
  'UI/UX Design',
  'Graphic Design',
  'Digital Marketing',
  'Content Writing',
  'SEO',
  'Video Editing',
  'Photography',
  'Virtual Assistant',
  'Translation',
  'Accounting',
  'Legal',
  'Consulting'
];

export const JobCategories = ({ selectedCategory, onCategoryChange }: JobCategoriesProps) => {
  return (
    <div className="w-full bg-background border-b border-border py-3">
      <ScrollArea className="w-full">
        <div className="flex items-center gap-2 px-4">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'secondary'}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className={`
                whitespace-nowrap shrink-0 transition-all
                ${selectedCategory === category 
                  ? 'bg-primary/10 text-primary border-primary hover:bg-primary/20' 
                  : 'bg-secondary hover:bg-secondary/80'
                }
              `}
            >
              {category}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
