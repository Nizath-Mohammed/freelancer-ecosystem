export const USER_ROLES = {
  FREELANCER: 'freelancer',
  CLIENT: 'client',
  AGENCY: 'agency',
  ENTERPRISE: 'enterprise',
} as const;

export const PROJECT_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const PROPOSAL_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
} as const;

export const BUDGET_TYPES = {
  FIXED: 'fixed',
  HOURLY: 'hourly',
} as const;

export const EXPERIENCE_LEVELS = {
  ENTRY: 'entry',
  INTERMEDIATE: 'intermediate',
  EXPERT: 'expert',
} as const;

export const QUESTION_STATUS = {
  OPEN: 'open',
  ANSWERED: 'answered',
  CLOSED: 'closed',
} as const;

export const MESSAGE_TYPES = {
  TEXT: 'text',
  FILE: 'file',
  SYSTEM: 'system',
} as const;

export const BADGE_CATEGORIES = {
  PROJECT: 'project',
  SKILL: 'skill',
  REVIEW: 'review',
  QA: 'qa',
  SPECIAL: 'special',
} as const;

export const AVAILABILITY_STATUS = {
  AVAILABLE: 'available',
  BUSY: 'busy',
  UNAVAILABLE: 'unavailable',
} as const;

export const SKILLS = [
  'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
  'PHP', 'Laravel', 'Django', 'Ruby on Rails', 'Java', 'Spring Boot', 'C#',
  '.NET', 'Go', 'Rust', 'Swift', 'Kotlin', 'Flutter', 'React Native',
  'HTML/CSS', 'Sass', 'Tailwind CSS', 'Bootstrap', 'UI/UX Design', 'Figma',
  'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'After Effects',
  'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Google Cloud', 'Azure',
  'Docker', 'Kubernetes', 'DevOps', 'CI/CD', 'Git', 'GraphQL', 'REST APIs',
  'Machine Learning', 'AI', 'Data Science', 'Blockchain', 'Web3', 'SEO',
  'Digital Marketing', 'Content Writing', 'Copywriting', 'Social Media',
  'Video Editing', 'Animation', '3D Modeling', 'Game Development', 'Mobile Development'
];

export const PROJECT_CATEGORIES = [
  'Web Development',
  'Mobile Development',
  'UI/UX Design',
  'Graphic Design',
  'Data Science',
  'Machine Learning',
  'DevOps',
  'Digital Marketing',
  'Content Writing',
  'Video Editing',
  'Animation',
  'Game Development',
  'Blockchain',
  'Cybersecurity',
  'Database Administration',
  'Quality Assurance',
  'Project Management',
  'Business Analysis',
  'Consulting',
  'Other'
];

export const LEVEL_THRESHOLDS = [
  0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500,
  5500, 6600, 7800, 9100, 10500, 12000, 13600, 15300, 17100, 19000,
  21000, 23100, 25300, 27600, 30000, 32500, 35100, 37800, 40600, 43500,
  46500, 49600, 52800, 56100, 59500, 63000, 66600, 70300, 74100, 78000,
  82000, 86100, 90300, 94600, 99000, 103500, 108100, 112800, 117600, 122500
];

export const XP_REWARDS = {
  PROJECT_COMPLETION: 100,
  FIVE_STAR_REVIEW: 50,
  CERTIFICATION: 200,
  QA_UPVOTE: 10,
  ACCEPTED_ANSWER: 25,
  FIRST_PROJECT: 50,
  PROFILE_COMPLETION: 25,
};

export const WEBSOCKET_EVENTS = {
  NEW_MESSAGE: 'new_message',
  PROJECT_UPDATE: 'project_update',
  PROPOSAL_UPDATE: 'proposal_update',
  BADGE_EARNED: 'badge_earned',
  LEVEL_UP: 'level_up',
  QA_ACTIVITY: 'qa_activity',
} as const;
