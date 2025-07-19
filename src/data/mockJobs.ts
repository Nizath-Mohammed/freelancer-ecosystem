export const mockJobs = [
  {
    id: "1",
    title: "Senior React Developer for E-commerce Platform",
    description: "We're looking for an experienced React developer to help build and optimize our e-commerce platform. You'll work with modern technologies including React 18, TypeScript, and Next.js. The ideal candidate has experience with state management, API integration, and performance optimization. This is a great opportunity to work on a high-traffic application with millions of users.",
    budget: {
      min: 80,
      max: 120,
      type: "hourly" as const
    },
    skills: ["React", "TypeScript", "Next.js", "Redux", "GraphQL", "CSS"],
    client: {
      name: "TechCorp Solutions",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 4.9,
      location: "San Francisco, CA",
      verified: true
    },
    postedAt: "2024-01-15T10:30:00Z",
    proposals: 12,
    views: 156,
    saves: 23,
    isTrending: true,
    urgency: "high" as const
  },
  {
    id: "2",
    title: "UI/UX Designer for Mobile App Redesign",
    description: "Seeking a talented UI/UX designer to redesign our mobile application. The project involves creating user personas, wireframes, prototypes, and final designs. Experience with Figma and mobile design principles is essential. We need someone who can create intuitive and beautiful user experiences.",
    budget: {
      min: 5000,
      max: 8000,
      type: "fixed" as const
    },
    skills: ["UI/UX Design", "Figma", "Mobile Design", "Prototyping", "User Research"],
    client: {
      name: "StartupXYZ",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b6c5f14b?w=100&h=100&fit=crop&crop=face",
      rating: 4.7,
      location: "New York, NY",
      verified: true
    },
    postedAt: "2024-01-15T08:45:00Z",
    proposals: 8,
    views: 89,
    saves: 15,
    isTrending: true,
    isFeatured: true,
    urgency: "medium" as const
  },
  {
    id: "3",
    title: "Full-Stack Developer for SaaS Platform",
    description: "Looking for a full-stack developer to join our team in building a comprehensive SaaS platform. You'll work with React, Node.js, and PostgreSQL. The role involves both frontend and backend development, including API design, database optimization, and deployment strategies.",
    budget: {
      min: 70,
      max: 100,
      type: "hourly" as const
    },
    skills: ["React", "Node.js", "PostgreSQL", "AWS", "Docker", "REST APIs"],
    client: {
      name: "InnovateHub",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 4.8,
      location: "Austin, TX",
      verified: false
    },
    postedAt: "2024-01-14T16:20:00Z",
    proposals: 15,
    views: 234,
    saves: 31,
    urgency: "medium" as const
  },
  {
    id: "4",
    title: "Content Writer for Tech Blog",
    description: "We need a skilled content writer to create engaging articles for our technology blog. Topics include software development, AI, cybersecurity, and emerging tech trends. Must have experience writing technical content for developer audiences.",
    budget: {
      min: 50,
      max: 80,
      type: "hourly" as const
    },
    skills: ["Content Writing", "Technical Writing", "SEO", "Research", "Editing"],
    client: {
      name: "DevBlog Media",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 4.6,
      location: "Remote",
      verified: true
    },
    postedAt: "2024-01-14T12:15:00Z",
    proposals: 22,
    views: 178,
    saves: 28,
    isTrending: true,
    urgency: "low" as const
  },
  {
    id: "5",
    title: "Python Data Scientist for ML Project",
    description: "Seeking an experienced data scientist to work on a machine learning project involving customer behavior analysis. You'll work with large datasets, build predictive models, and create visualizations. Experience with Python, pandas, scikit-learn, and TensorFlow is required.",
    budget: {
      min: 12000,
      max: 18000,
      type: "fixed" as const
    },
    skills: ["Python", "Machine Learning", "TensorFlow", "pandas", "Data Analysis", "Statistics"],
    client: {
      name: "DataDriven Corp",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      rating: 4.9,
      location: "Seattle, WA",
      verified: true
    },
    postedAt: "2024-01-13T14:30:00Z",
    proposals: 9,
    views: 145,
    saves: 19,
    isFeatured: true,
    urgency: "high" as const
  },
  {
    id: "6",
    title: "WordPress Developer for E-learning Site",
    description: "Need a WordPress developer to build an e-learning platform with custom functionality. The site should support course creation, student enrollment, payment processing, and progress tracking. Experience with LearnDash or similar LMS plugins preferred.",
    budget: {
      min: 4000,
      max: 6000,
      type: "fixed" as const
    },
    skills: ["WordPress", "PHP", "LearnDash", "WooCommerce", "MySQL", "jQuery"],
    client: {
      name: "EduTech Solutions",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
      rating: 4.5,
      location: "Denver, CO",
      verified: true
    },
    postedAt: "2024-01-13T09:45:00Z",
    proposals: 18,
    views: 203,
    saves: 25,
    urgency: "medium" as const
  }
];