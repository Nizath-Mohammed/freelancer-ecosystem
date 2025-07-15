import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { setupSimpleAuth, simpleAuth } from "./simpleAuth";
import { insertProjectSchema, insertProposalSchema, insertQuestionSchema, insertAnswerSchema, insertMessageSchema } from "@shared/schema";
import { z } from "zod";
import { seedDatabase } from "./seedData";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple auth setup for development
  setupSimpleAuth(app);

  // Seed database with sample data (development only)
  app.post('/api/seed', async (req, res) => {
    try {
      await seedDatabase();
      res.json({ message: "Database seeded successfully" });
    } catch (error) {
      console.error("Error seeding database:", error);
      res.status(500).json({ message: "Failed to seed database" });
    }
  });

  // User routes
  app.patch('/api/users/profile', simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const updatedUser = await storage.updateUserProfile(userId, req.body);
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  app.get('/api/users/:id/badges', async (req, res) => {
    try {
      const badges = await storage.getUserBadges(req.params.id);
      res.json(badges);
    } catch (error) {
      console.error("Error fetching user badges:", error);
      res.status(500).json({ message: "Failed to fetch badges" });
    }
  });

  app.get('/api/users/:id/dashboard', simpleAuth, async (req: any, res) => {
    try {
      const userId = req.params.id;
      if (userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      const stats = await storage.getDashboardStats(userId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Project routes
  app.post('/api/projects', simpleAuth, async (req: any, res) => {
    try {
      const validation = insertProjectSchema.safeParse({
        ...req.body,
        clientId: req.user.id,
      });
      
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid project data", errors: validation.error.errors });
      }

      const project = await storage.createProject(validation.data);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  app.get('/api/projects', async (req, res) => {
    try {
      const { category, experienceLevel, budgetMin, budgetMax, skills, limit = '20', offset = '0' } = req.query;
      
      const filters = {
        category: category as string,
        experienceLevel: experienceLevel as string,
        budgetMin: budgetMin ? parseFloat(budgetMin as string) : undefined,
        budgetMax: budgetMax ? parseFloat(budgetMax as string) : undefined,
        skills: skills ? (skills as string).split(',') : undefined,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      };

      const projects = await storage.getProjects(filters);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get('/api/projects/:id', async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.get('/api/users/:id/projects', simpleAuth, async (req: any, res) => {
    try {
      const userId = req.params.id;
      if (userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      const projects = await storage.getUserProjects(userId);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching user projects:", error);
      res.status(500).json({ message: "Failed to fetch user projects" });
    }
  });

  // Proposal routes
  app.post('/api/proposals', simpleAuth, async (req: any, res) => {
    try {
      const validation = insertProposalSchema.safeParse({
        ...req.body,
        freelancerId: req.user.id,
      });
      
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid proposal data", errors: validation.error.errors });
      }

      const proposal = await storage.createProposal(validation.data);
      res.status(201).json(proposal);
    } catch (error) {
      console.error("Error creating proposal:", error);
      res.status(500).json({ message: "Failed to create proposal" });
    }
  });

  app.get('/api/projects/:id/proposals', simpleAuth, async (req, res) => {
    try {
      const proposals = await storage.getProposalsForProject(req.params.id);
      res.json(proposals);
    } catch (error) {
      console.error("Error fetching proposals:", error);
      res.status(500).json({ message: "Failed to fetch proposals" });
    }
  });

  app.get('/api/users/:id/proposals', simpleAuth, async (req: any, res) => {
    try {
      const userId = req.params.id;
      if (userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
      }
      
      const proposals = await storage.getProposalsForUser(userId);
      res.json(proposals);
    } catch (error) {
      console.error("Error fetching user proposals:", error);
      res.status(500).json({ message: "Failed to fetch user proposals" });
    }
  });

  // Q&A routes
  app.post('/api/questions', simpleAuth, async (req: any, res) => {
    try {
      const validation = insertQuestionSchema.safeParse({
        ...req.body,
        authorId: req.user.id,
      });
      
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid question data", errors: validation.error.errors });
      }

      const question = await storage.createQuestion(validation.data);
      res.status(201).json(question);
    } catch (error) {
      console.error("Error creating question:", error);
      res.status(500).json({ message: "Failed to create question" });
    }
  });

  app.get('/api/questions', async (req, res) => {
    try {
      const { tags, search, limit = '20', offset = '0' } = req.query;
      
      const filters = {
        tags: tags ? (tags as string).split(',') : undefined,
        search: search as string,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      };

      const questions = await storage.getQuestions(filters);
      res.json(questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).json({ message: "Failed to fetch questions" });
    }
  });

  app.get('/api/questions/:id', async (req, res) => {
    try {
      const question = await storage.getQuestion(req.params.id);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      res.json(question);
    } catch (error) {
      console.error("Error fetching question:", error);
      res.status(500).json({ message: "Failed to fetch question" });
    }
  });

  app.get('/api/questions/:id/answers', async (req, res) => {
    try {
      const answers = await storage.getAnswersForQuestion(req.params.id);
      res.json(answers);
    } catch (error) {
      console.error("Error fetching answers:", error);
      res.status(500).json({ message: "Failed to fetch answers" });
    }
  });

  app.post('/api/answers', simpleAuth, async (req: any, res) => {
    try {
      const validation = insertAnswerSchema.safeParse({
        ...req.body,
        authorId: req.user.id,
      });
      
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid answer data", errors: validation.error.errors });
      }

      const answer = await storage.createAnswer(validation.data);
      res.status(201).json(answer);
    } catch (error) {
      console.error("Error creating answer:", error);
      res.status(500).json({ message: "Failed to create answer" });
    }
  });

  // Message routes
  app.post('/api/messages', simpleAuth, async (req: any, res) => {
    try {
      const validation = insertMessageSchema.safeParse({
        ...req.body,
        senderId: req.user.id,
      });
      
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid message data", errors: validation.error.errors });
      }

      const message = await storage.createMessage(validation.data);
      res.status(201).json(message);
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(500).json({ message: "Failed to create message" });
    }
  });

  app.get('/api/messages/:userId', simpleAuth, async (req: any, res) => {
    try {
      const currentUserId = req.user.id;
      const otherUserId = req.params.userId;
      
      const messages = await storage.getMessages(currentUserId, otherUserId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.get('/api/notifications', simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const notifications = await storage.getUserNotifications(userId);
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.post('/api/notifications/:id/read', simpleAuth, async (req: any, res) => {
    try {
      const notificationId = req.params.id;
      await storage.markNotificationAsRead(notificationId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });

  app.post('/api/notifications/mark-all-read', simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const notifications = await storage.getUserNotifications(userId);
      
      // Mark all unread notifications as read
      for (const notification of notifications) {
        if (!notification.isRead) {
          await storage.markNotificationAsRead(notification.id);
        }
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      res.status(500).json({ message: "Failed to mark all notifications as read" });
    }
  });

  app.delete('/api/notifications/:id', simpleAuth, async (req: any, res) => {
    try {
      const notificationId = req.params.id;
      // For now we'll just mark as read since we don't have a delete method
      await storage.markNotificationAsRead(notificationId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting notification:", error);
      res.status(500).json({ message: "Failed to delete notification" });
    }
  });

  // Badge routes
  app.get('/api/badges', async (req, res) => {
    try {
      const badges = await storage.getBadges();
      res.json(badges);
    } catch (error) {
      console.error("Error fetching badges:", error);
      res.status(500).json({ message: "Failed to fetch badges" });
    }
  });

  // Answer voting routes
  app.post('/api/answers/:id/vote', simpleAuth, async (req: any, res) => {
    try {
      const { type } = req.body;
      const answerId = req.params.id;
      
      if (!['up', 'down'].includes(type)) {
        return res.status(400).json({ message: "Invalid vote type" });
      }
      
      // For now, just update the vote count - in a real app you'd track individual votes
      const answer = await storage.updateAnswer(answerId, {
        votes: type === 'up' ? 1 : -1 // This is simplified - you'd want proper vote tracking
      });
      
      res.json(answer);
    } catch (error) {
      console.error("Error voting on answer:", error);
      res.status(500).json({ message: "Failed to vote" });
    }
  });

  app.post('/api/answers/:id/accept', simpleAuth, async (req: any, res) => {
    try {
      const answerId = req.params.id;
      
      const answer = await storage.updateAnswer(answerId, {
        isAccepted: true
      });
      
      res.json(answer);
    } catch (error) {
      console.error("Error accepting answer:", error);
      res.status(500).json({ message: "Failed to accept answer" });
    }
  });

  // Proposal update routes
  app.patch('/api/proposals/:id', simpleAuth, async (req: any, res) => {
    try {
      const proposalId = req.params.id;
      const updates = req.body;
      
      const proposal = await storage.updateProposal(proposalId, updates);
      res.json(proposal);
    } catch (error) {
      console.error("Error updating proposal:", error);
      res.status(500).json({ message: "Failed to update proposal" });
    }
  });

  // AI-powered recommendation routes
  app.get('/api/ai/recommendations', simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      
      // Mock AI recommendations - in production, this would use machine learning
      const recommendations = {
        projects: [
          {
            id: "rec-proj-1",
            title: "React Native E-commerce App",
            matchScore: 94,
            budget: 12000,
            skills: ["React Native", "TypeScript", "Firebase"],
            client: "TechStartup Inc.",
            reason: "Perfect match for your React Native expertise and e-commerce experience"
          },
          {
            id: "rec-proj-2", 
            title: "Node.js API Development",
            matchScore: 89,
            budget: 8500,
            skills: ["Node.js", "PostgreSQL", "REST API"],
            client: "DataCorp Solutions",
            reason: "Matches your backend development skills and API experience"
          }
        ],
        skills: [
          { name: "GraphQL", demand: 85, marketRate: "$95/hr", trend: "rising" },
          { name: "Next.js", demand: 78, marketRate: "$88/hr", trend: "stable" },
          { name: "Docker", demand: 92, marketRate: "$102/hr", trend: "rising" }
        ],
        market: {
          averageRate: "$87/hr",
          demandTrend: "high",
          competitionLevel: "moderate",
          topSkillsInDemand: ["React", "Node.js", "Python", "AWS", "TypeScript"]
        }
      };
      
      res.json(recommendations);
    } catch (error) {
      console.error("Error fetching AI recommendations:", error);
      res.status(500).json({ message: "Failed to fetch recommendations" });
    }
  });

  app.get('/api/ai/skill-assessment', simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      
      // Mock skill assessment data
      const assessment = {
        overallScore: 87,
        skillBreakdown: [
          { skill: "React", level: 92, verified: true, lastUpdated: "2025-01-10" },
          { skill: "Node.js", level: 88, verified: true, lastUpdated: "2025-01-08" },
          { skill: "TypeScript", level: 85, verified: false, lastUpdated: "2024-12-15" },
          { skill: "PostgreSQL", level: 79, verified: true, lastUpdated: "2024-12-20" },
          { skill: "AWS", level: 73, verified: false, lastUpdated: "2024-11-30" }
        ],
        recommendations: [
          "Consider taking an AWS certification to boost your DevOps skills",
          "Your TypeScript skills are strong - verification would increase client confidence",
          "GraphQL expertise would complement your React/Node.js stack perfectly"
        ],
        nextMilestone: {
          skill: "AWS",
          currentLevel: 73,
          targetLevel: 85,
          estimatedTime: "2-3 weeks",
          suggestedActions: ["Complete AWS Solutions Architect course", "Build serverless project"]
        }
      };
      
      res.json(assessment);
    } catch (error) {
      console.error("Error fetching skill assessment:", error);
      res.status(500).json({ message: "Failed to fetch skill assessment" });
    }
  });

  app.get('/api/analytics/dashboard', simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      
      // Enhanced analytics dashboard
      const analytics = {
        performance: {
          responseTime: "2.3 hours",
          completionRate: 98,
          clientSatisfaction: 4.9,
          repeatClientRate: 73
        },
        earnings: {
          thisMonth: 15750,
          lastMonth: 12300,
          growth: 28,
          projection: 18500,
          topPayingClient: "TechCorp Inc.",
          averageHourlyRate: 95
        },
        activity: {
          projectsCompleted: 27,
          activeProjects: 3,
          proposalsSubmitted: 45,
          proposalWinRate: 67,
          totalHoursWorked: 890
        },
        market: {
          rankingInCategory: 15,
          totalFreelancers: 2847,
          skillDemandTrend: "rising",
          competitiveAdvantage: ["Fast delivery", "High quality", "Communication"]
        }
      };
      
      res.json(analytics);
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  app.get('/api/conversations', simpleAuth, async (req: any, res) => {
    try {
      const userId = req.user.id;
      const messages = await storage.getUnreadMessages(userId);
      
      // Group messages by conversation partner
      const conversationMap = new Map();
      
      for (const message of messages) {
        const partnerId = message.senderId === userId ? message.receiverId : message.senderId;
        if (!conversationMap.has(partnerId)) {
          conversationMap.set(partnerId, {
            userId: partnerId,
            user: {
              firstName: partnerId.includes('client') ? 'Demo Client' : 'Demo User',
              lastName: partnerId.substring(partnerId.lastIndexOf('-') + 1),
              profileImageUrl: null,
            },
            lastMessage: {
              content: message.content,
              createdAt: message.createdAt,
            },
            unreadCount: 1,
          });
        } else {
          const conversation = conversationMap.get(partnerId);
          conversation.unreadCount++;
          if (new Date(message.createdAt) > new Date(conversation.lastMessage.createdAt)) {
            conversation.lastMessage = {
              content: message.content,
              createdAt: message.createdAt,
            };
          }
        }
      }
      
      const conversations = Array.from(conversationMap.values());
      res.json(conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ message: "Failed to fetch conversations" });
    }
  });

  // Enhanced messaging routes
  app.get('/api/messages/:userId', simpleAuth, async (req: any, res) => {
    try {
      const currentUserId = req.user.id;
      const targetUserId = req.params.userId;
      
      const messages = await storage.getMessages(currentUserId, targetUserId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.post('/api/messages', simpleAuth, async (req: any, res) => {
    try {
      const senderId = req.user.id;
      const { content, receiverId } = req.body;
      
      const message = await storage.createMessage({
        senderId,
        receiverId,
        content,
        type: 'text'
      });
      
      res.json(message);
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  // Q&A voting and answer routes
  app.post('/api/questions/:id/vote', simpleAuth, async (req: any, res) => {
    try {
      const questionId = req.params.id;
      const { type } = req.body;
      const userId = req.user.id;
      
      // Mock voting logic - in production, this would update the database
      const question = await storage.getQuestion(questionId);
      if (!question) {
        return res.status(404).json({ message: "Question not found" });
      }
      
      // Update vote counts (simplified mock implementation)
      if (type === 'up') {
        await storage.updateQuestion(questionId, { 
          upvotes: (question.upvotes || 0) + 1 
        });
      } else {
        await storage.updateQuestion(questionId, { 
          downvotes: (question.downvotes || 0) + 1 
        });
      }
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error voting on question:", error);
      res.status(500).json({ message: "Failed to vote on question" });
    }
  });

  app.get('/api/questions/:id/answers', simpleAuth, async (req: any, res) => {
    try {
      const questionId = req.params.id;
      const answers = await storage.getAnswersForQuestion(questionId);
      res.json(answers);
    } catch (error) {
      console.error("Error fetching answers:", error);
      res.status(500).json({ message: "Failed to fetch answers" });
    }
  });

  app.post('/api/answers', simpleAuth, async (req: any, res) => {
    try {
      const authorId = req.user.id;
      const { content, questionId } = req.body;
      
      const answer = await storage.createAnswer({
        questionId,
        authorId,
        content
      });
      
      res.json(answer);
    } catch (error) {
      console.error("Error creating answer:", error);
      res.status(500).json({ message: "Failed to create answer" });
    }
  });

  app.post('/api/answers/:id/vote', simpleAuth, async (req: any, res) => {
    try {
      const answerId = req.params.id;
      const { type } = req.body;
      const userId = req.user.id;
      
      // Mock voting logic - in production, this would update the database
      const answer = await storage.getAnswersForQuestion("")[0]; // Simplified for demo
      
      res.json({ success: true });
    } catch (error) {
      console.error("Error voting on answer:", error);
      res.status(500).json({ message: "Failed to vote on answer" });
    }
  });

  const httpServer = createServer(app);

  // WebSocket setup
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  const clients = new Map<string, WebSocket>();

  wss.on('connection', (ws: WebSocket, req) => {
    const url = new URL(req.url!, `http://${req.headers.host}`);
    const userId = url.searchParams.get('userId');
    
    if (userId) {
      clients.set(userId, ws);
      console.log(`WebSocket client connected: ${userId}`);
    }

    ws.on('close', () => {
      if (userId) {
        clients.delete(userId);
        console.log(`WebSocket client disconnected: ${userId}`);
      }
    });

    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString());
        // Handle real-time message broadcasting
        if (message.type === 'message' && message.receiverId) {
          const receiverWs = clients.get(message.receiverId);
          if (receiverWs && receiverWs.readyState === WebSocket.OPEN) {
            receiverWs.send(JSON.stringify({
              type: 'new_message',
              data: message
            }));
          }
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });
  });

  return httpServer;
}
