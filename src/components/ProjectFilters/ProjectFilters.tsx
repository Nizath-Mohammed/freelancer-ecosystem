import { useState } from 'react';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface ProjectFiltersProps {
  skills: string[];
  selectedSkills: string[];
  onSkillChange: (skills: string[]) => void;
  budgetRange: [number, number];
  onBudgetChange: (range: [number, number]) => void;
  projectType: string;
  onProjectTypeChange: (type: string) => void;
  experienceLevel: string;
  onExperienceLevelChange: (level: string) => void;
  onClearAll: () => void;
}

export const ProjectFilters = ({
  skills,
  selectedSkills,
  onSkillChange,
  budgetRange,
  onBudgetChange,
  projectType,
  onProjectTypeChange,
  experienceLevel,
  onExperienceLevelChange,
  onClearAll
}: ProjectFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onSkillChange(selectedSkills.filter(s => s !== skill));
    } else {
      onSkillChange([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    onSkillChange(selectedSkills.filter(s => s !== skill));
  };

  const hasActiveFilters = selectedSkills.length > 0 || 
                          projectType !== 'all' || 
                          experienceLevel !== 'all' ||
                          (budgetRange[0] !== 0 || budgetRange[1] !== 10000);

  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Filter Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Filters</h3>
            {hasActiveFilters && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {selectedSkills.length + (projectType !== 'all' ? 1 : 0) + (experienceLevel !== 'all' ? 1 : 0)} active
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              {isExpanded ? 'Simple' : 'Advanced'}
            </Button>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={onClearAll}>
                <X className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {selectedSkills.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Selected Skills:</Label>
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map(skill => (
                <Badge key={skill} variant="secondary" className="pr-1">
                  {skill}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0.5 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeSkill(skill)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Basic Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Project Type</Label>
            <Select value={projectType} onValueChange={onProjectTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="fixed">Fixed Price</SelectItem>
                <SelectItem value="hourly">Hourly Rate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Experience Level</Label>
            <Select value={experienceLevel} onValueChange={onExperienceLevelChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="space-y-6 animate-fade-in">
            {/* Budget Range */}
            <div className="space-y-4">
              <Label>Budget Range: ${budgetRange[0]} - ${budgetRange[1] === 10000 ? '10,000+' : budgetRange[1]}</Label>
              <Slider
                value={budgetRange}
                onValueChange={(value) => onBudgetChange(value as [number, number])}
                max={10000}
                min={0}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>$0</span>
                <span>$10,000+</span>
              </div>
            </div>

            {/* Skills Filter */}
            <div className="space-y-4">
              <Label>Skills (Select up to 5)</Label>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {skills.map(skill => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={selectedSkills.includes(skill)}
                      onCheckedChange={() => handleSkillToggle(skill)}
                      disabled={!selectedSkills.includes(skill) && selectedSkills.length >= 5}
                    />
                    <Label
                      htmlFor={skill}
                      className={`text-sm cursor-pointer ${
                        !selectedSkills.includes(skill) && selectedSkills.length >= 5 
                          ? 'text-muted-foreground' 
                          : ''
                      }`}
                    >
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
              {selectedSkills.length >= 5 && (
                <p className="text-xs text-muted-foreground">
                  Maximum 5 skills selected. Remove some to add others.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};