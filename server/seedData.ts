import { storage } from "./storage";

// Sample project data for development
const sampleProjects = [
  {
    title: "E-commerce Platform Development",
    description: "Build a modern e-commerce platform with React, Node.js, and PostgreSQL. Features include product management, shopping cart, payment integration, and order tracking.",
    category: "web-development",
    experienceLevel: "intermediate",
    budget: 8500,
    budgetType: "fixed",
    skills: ["React", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    timeline: "6 weeks",
    clientId: "demo-client-1",
    status: "open",
    requirements: "Must have experience with payment processing and responsive design",
    attachments: []
  },
  {
    title: "Mobile App UI/UX Design",
    description: "Design a complete mobile app interface for a fitness tracking application. Need modern, clean design with excellent user experience.",
    category: "design",
    experienceLevel: "expert",
    budget: 4500,
    budgetType: "fixed",
    skills: ["Figma", "Mobile Design", "UI/UX", "Prototyping"],
    timeline: "3 weeks",
    clientId: "demo-client-2", 
    status: "open",
    requirements: "Portfolio with mobile app designs required",
    attachments: []
  },
  {
    title: "DevOps Pipeline Setup",
    description: "Set up complete CI/CD pipeline for microservices architecture using AWS, Docker, and Kubernetes. Include monitoring and automated testing.",
    category: "devops",
    experienceLevel: "expert",
    budget: 12000,
    budgetType: "fixed",
    skills: ["AWS", "Docker", "Kubernetes", "Jenkins", "Terraform"],
    timeline: "4 weeks",
    clientId: "demo-client-3",
    status: "open",
    requirements: "AWS certification preferred",
    attachments: []
  },
  {
    title: "React Native Development",
    description: "Develop cross-platform mobile app using React Native. App should work on both iOS and Android with native performance.",
    category: "mobile-development",
    experienceLevel: "intermediate",
    budget: 75,
    budgetType: "hourly",
    skills: ["React Native", "JavaScript", "iOS", "Android"],
    timeline: "8 weeks",
    clientId: "demo-client-4",
    status: "open",
    requirements: "Previous React Native apps in portfolio",
    attachments: []
  },
  {
    title: "Data Science & Analytics",
    description: "Build predictive analytics dashboard using Python and machine learning. Analyze customer behavior and provide business insights.",
    category: "data-science",
    experienceLevel: "expert",
    budget: 15000,
    budgetType: "fixed",
    skills: ["Python", "Machine Learning", "TensorFlow", "Pandas", "SQL"],
    timeline: "10 weeks",
    clientId: "demo-client-5",
    status: "open",
    requirements: "PhD in Data Science or equivalent experience",
    attachments: []
  }
];

const sampleQuestions = [
  {
    title: "How to optimize React app performance?",
    content: "I'm working on a large React application and noticing performance issues. What are the best practices for optimizing React app performance?",
    tags: ["react", "performance", "optimization"],
    authorId: "demo-user-123",
    votes: 15,
    status: "open"
  },
  {
    title: "Best practices for Node.js microservices?",
    content: "I'm architecting a microservices system using Node.js. What are the key patterns and best practices I should follow?",
    tags: ["nodejs", "microservices", "architecture"],
    authorId: "demo-user-456",
    votes: 23,
    status: "open"
  },
  {
    title: "PostgreSQL vs MongoDB for modern apps?",
    content: "I'm choosing between PostgreSQL and MongoDB for a new project. What factors should I consider when making this decision?",
    tags: ["postgresql", "mongodb", "database"],
    authorId: "demo-user-789",
    votes: 8,
    status: "open"
  }
];

const sampleBadges = [
  {
    name: "First Project",
    description: "Complete your first project successfully",
    category: "achievement",
    criteria: "Complete 1 project",
    points: 100,
    icon: "trophy"
  },
  {
    name: "Top Rated",
    description: "Maintain a 4.8+ rating across 10+ projects",
    category: "achievement", 
    criteria: "4.8+ rating, 10+ projects",
    points: 500,
    icon: "star"
  },
  {
    name: "React Expert",
    description: "Demonstrate expertise in React development",
    category: "skill",
    criteria: "Complete 5+ React projects",
    points: 250,
    icon: "code"
  },
  {
    name: "Community Helper",
    description: "Provide helpful answers in Q&A section",
    category: "community",
    criteria: "20+ helpful answers",
    points: 200,
    icon: "help-circle"
  }
];

export async function seedDatabase() {
  try {
    console.log("Seeding database with sample data...");
    
    // Create demo users first
    const demoUsers = [
      {
        id: "demo-user-123",
        email: "demo@conectify.com",
        firstName: "Demo",
        lastName: "User",
        role: "freelancer" as const,
        profileImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "demo-client-1",
        email: "client1@example.com",
        firstName: "John",
        lastName: "Smith",
        role: "client" as const,
        profileImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "demo-client-2",
        email: "client2@example.com",
        firstName: "Sarah",
        lastName: "Johnson",
        role: "client" as const,
        profileImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "demo-client-3",
        email: "client3@example.com",
        firstName: "Mike",
        lastName: "Brown",
        role: "client" as const,
        profileImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "demo-client-4",
        email: "client4@example.com",
        firstName: "Emily",
        lastName: "Davis",
        role: "client" as const,
        profileImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "demo-client-5",
        email: "client5@example.com",
        firstName: "David",
        lastName: "Wilson",
        role: "client" as const,
        profileImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "demo-user-456",
        email: "user456@example.com",
        firstName: "Alex",
        lastName: "Rodriguez",
        role: "freelancer" as const,
        profileImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "demo-user-789",
        email: "user789@example.com",
        firstName: "Lisa",
        lastName: "Chen",
        role: "freelancer" as const,
        profileImageUrl: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    
    // Create users
    for (const user of demoUsers) {
      await storage.upsertUser(user);
    }
    
    // Create badges
    for (const badge of sampleBadges) {
      await storage.createBadge(badge);
    }
    
    // Create sample projects
    for (const project of sampleProjects) {
      await storage.createProject(project);
    }
    
    // Create sample questions
    for (const question of sampleQuestions) {
      await storage.createQuestion(question);
    }

    // Create sample notifications
    const sampleNotifications = [
      {
        userId: "demo-user-123",
        type: "project" as const,
        title: "New Project Match",
        message: "We found a new React project that matches your skills perfectly!",
        isRead: false,
        metadata: { projectId: "proj-1", matchScore: 94 }
      },
      {
        userId: "demo-user-123", 
        type: "proposal" as const,
        title: "Proposal Update",
        message: "Your proposal for E-commerce Platform Development has been reviewed.",
        isRead: false,
        metadata: { proposalId: "prop-1", status: "under_review" }
      },
      {
        userId: "demo-user-123",
        type: "message" as const,
        title: "New Message",
        message: "John Smith sent you a message about the mobile app project.",
        isRead: true,
        metadata: { senderId: "demo-client-1", conversationId: "conv-1" }
      },
      {
        userId: "demo-user-123",
        type: "badge" as const,
        title: "Badge Earned!",
        message: "Congratulations! You've earned the 'First Project' badge.",
        isRead: false,
        metadata: { badgeId: "badge-1", xpEarned: 100 }
      },
      {
        userId: "demo-user-123",
        type: "payment" as const,
        title: "Payment Received",
        message: "Payment of $2,500 has been received for project milestone completion.",
        isRead: true,
        metadata: { amount: 2500, projectId: "proj-2", milestoneId: "ms-1" }
      }
    ];

    for (const notification of sampleNotifications) {
      await storage.createNotification(notification);
    }

    // Create sample messages
    const sampleMessages = [
      {
        senderId: "demo-client-1",
        receiverId: "demo-user-123",
        content: "Hi! I'm interested in discussing the React development project with you. Could we schedule a call?",
        type: "text" as const
      },
      {
        senderId: "demo-user-123",
        receiverId: "demo-client-1", 
        content: "Absolutely! I'd be happy to discuss the project details. I'm available tomorrow after 2 PM EST.",
        type: "text" as const
      },
      {
        senderId: "demo-client-1",
        receiverId: "demo-user-123",
        content: "Perfect! Let's schedule for 3 PM EST tomorrow. I'll send you a calendar invite.",
        type: "text" as const
      }
    ];

    for (const message of sampleMessages) {
      await storage.createMessage(message);
    }

    // Create sample proposals
    const sampleProposals = [
      {
        projectId: "proj-1", // Will be replaced with actual project ID
        freelancerId: "demo-user-123",
        coverLetter: "I'm excited to work on your e-commerce platform. With 5+ years of React experience and expertise in Node.js and PostgreSQL, I can deliver a high-quality solution. My approach focuses on clean code, responsive design, and optimal performance.",
        proposedBudget: 8000,
        timeframe: "5 weeks",
        milestones: [
          { title: "UI/UX Design & Setup", description: "Complete design system and project setup", timeline: "Week 1", budget: 1600 },
          { title: "Frontend Development", description: "Build responsive React components", timeline: "Week 2-3", budget: 3200 },
          { title: "Backend & Database", description: "API development and database setup", timeline: "Week 4", budget: 2400 },
          { title: "Testing & Deployment", description: "Testing, optimization and deployment", timeline: "Week 5", budget: 800 }
        ],
        attachments: [],
        status: "pending"
      }
    ];

    // Get the first project to associate proposals
    const projectsResult = await storage.getProjects({ limit: 1 });
    if (projectsResult.length > 0) {
      const firstProject = projectsResult[0];
      sampleProposals[0].projectId = firstProject.id;
      
      for (const proposal of sampleProposals) {
        await storage.createProposal(proposal);
      }
    }
    
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}