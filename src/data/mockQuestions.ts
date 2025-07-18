export const mockQuestions = [
  {
    id: "1",
    title: "How to handle difficult clients as a freelancer?",
    content: "I've been freelancing for 6 months and recently had a client who keeps changing requirements without adjusting the budget. How do you handle situations like this professionally?",
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face",
      role: "freelancer" as const
    },
    createdAt: "2024-01-15T10:30:00Z",
    tags: ["client-management", "freelancing", "communication"],
    votes: 24,
    answerCount: 7,
    views: 156,
    isResolved: true
  },
  {
    id: "2",
    title: "Best practices for remote team collaboration?",
    content: "Our startup is fully remote with team members across different time zones. What tools and practices work best for maintaining good communication and productivity?",
    author: {
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      role: "client" as const
    },
    createdAt: "2024-01-14T14:20:00Z",
    tags: ["remote-work", "collaboration", "productivity"],
    votes: 18,
    answerCount: 12,
    views: 203,
    isResolved: false
  },
  {
    id: "3",
    title: "Setting fair rates for web development projects?",
    content: "I'm new to freelance web development and struggling to price my services. What factors should I consider when setting my rates? Any recommendations for hourly vs project-based pricing?",
    author: {
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      role: "freelancer" as const
    },
    createdAt: "2024-01-13T09:15:00Z",
    tags: ["pricing", "web-development", "freelancing", "rates"],
    votes: 31,
    answerCount: 15,
    views: 287,
    isResolved: false
  },
  {
    id: "4",
    title: "How to find reliable freelancers for long-term projects?",
    content: "We need to hire freelancers for a 6-month project. What's the best way to evaluate candidates and ensure they're committed to long-term collaboration?",
    author: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      role: "client" as const
    },
    createdAt: "2024-01-12T16:45:00Z",
    tags: ["hiring", "long-term", "project-management"],
    votes: 22,
    answerCount: 9,
    views: 178,
    isResolved: true
  },
  {
    id: "5",
    title: "Transitioning from full-time to freelance - tips needed!",
    content: "I'm planning to leave my full-time job to become a freelancer. What should I prepare beforehand? How much savings should I have? Any advice on building a client base?",
    author: {
      name: "Jessica Park",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      role: "freelancer" as const
    },
    createdAt: "2024-01-11T11:30:00Z",
    tags: ["career-transition", "freelancing", "financial-planning"],
    votes: 45,
    answerCount: 23,
    views: 421,
    isResolved: false
  }
];