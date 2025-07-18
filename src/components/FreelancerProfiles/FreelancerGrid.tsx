import { FreelancerCard } from './FreelancerCard';
import { mockFreelancers } from '@/data/mockFreelancers';

interface FreelancerGridProps {
  variant?: 'default' | 'preview';
  limit?: number;
}

export const FreelancerGrid = ({ variant = 'default', limit }: FreelancerGridProps) => {
  const displayedFreelancers = limit ? mockFreelancers.slice(0, limit) : mockFreelancers;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedFreelancers.map((freelancer) => (
        <FreelancerCard 
          key={freelancer.id} 
          freelancer={freelancer} 
          variant={variant}
        />
      ))}
    </div>
  );
};