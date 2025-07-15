export interface User {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  role: 'freelancer' | 'client' | 'agency' | 'enterprise';
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface UserProfile {
  id: number;
  userId: string;
  title: string | null;
  bio: string | null;
  skills: string[] | null;
  experience: string | null;
  hourlyRate: string | null;
  location: string | null;
  timezone: string | null;
  portfolio: any;
  certifications: any;
  languages: any;
  availability: 'available' | 'busy' | 'unavailable' | null;
  level: number | null;
  xp: number | null;
  totalEarnings: string | null;
  totalProjects: number | null;
  averageRating: string | null;
  successRate: string | null;
  responseTime: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface Project {
  id: string;
  clientId: string;
  title: string;
  description: string;
  category: string;
  skills: string[] | null;
  budget: string | null;
  budgetType: 'fixed' | 'hourly';
  duration: string | null;
  experienceLevel: 'entry' | 'intermediate' | 'expert' | null;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled' | null;
  assignedFreelancerId: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface Proposal {
  id: string;
  projectId: string;
  freelancerId: string;
  coverLetter: string;
  proposedBudget: string;
  proposedDuration: string | null;
  status: 'pending' | 'accepted' | 'rejected' | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface Badge {
  id: number;
  name: string;
  description: string | null;
  icon: string | null;
  category: 'project' | 'skill' | 'review' | 'qa' | 'special';
  requirements: any;
  xpReward: number | null;
  createdAt: Date | null;
}

export interface UserBadge {
  id: number;
  userId: string;
  badgeId: number;
  earnedAt: Date | null;
}

export interface Question {
  id: string;
  authorId: string;
  title: string;
  content: string;
  tags: string[] | null;
  votes: number | null;
  views: number | null;
  answerCount: number | null;
  acceptedAnswerId: string | null;
  status: 'open' | 'answered' | 'closed' | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface Answer {
  id: string;
  questionId: string;
  authorId: string;
  content: string;
  votes: number | null;
  isAccepted: boolean | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  projectId: string | null;
  content: string;
  type: 'text' | 'file' | 'system' | null;
  isRead: boolean | null;
  createdAt: Date | null;
}

export interface Review {
  id: string;
  projectId: string;
  reviewerId: string;
  revieweeId: string;
  rating: number;
  comment: string | null;
  skills: any;
  createdAt: Date | null;
}

export interface DashboardStats {
  activeProjects?: number;
  totalProjects?: number;
  totalEarnings?: string;
  averageRating?: string;
  level?: number;
  xp?: number;
  successRate?: string;
  completedProjects?: number;
  totalSpent?: number;
  openProjects?: number;
}

export interface ProjectWithRelations extends Project {
  client?: User;
  assignedFreelancer?: User;
  proposals?: Proposal[];
}

export interface QuestionWithRelations extends Question {
  author?: User;
  answers?: Answer[];
}

export interface MessageWithRelations extends Message {
  sender?: User;
  receiver?: User;
}

export interface UserWithProfile extends User {
  profile?: UserProfile;
  badges?: UserBadge[];
}

export interface WebSocketMessage {
  type: string;
  data: any;
  userId?: string;
}
