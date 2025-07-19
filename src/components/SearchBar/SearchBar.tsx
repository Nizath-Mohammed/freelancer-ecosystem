
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  placeholder = "Search jobs, skills, companies..." 
}: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <div className={`
        relative flex items-center transition-all duration-200
        ${isFocused ? 'ring-2 ring-primary/20' : ''}
      `}>
        <Search className="absolute left-3 w-4 h-4 text-muted-foreground z-10" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-10 pr-10 h-12 text-base border-2 border-border focus:border-primary/30 rounded-full"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-2 w-6 h-6 p-0 hover:bg-muted rounded-full"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
