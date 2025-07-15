import {
  users,
  projects,
  proposals,
  badges,
  userBadges,
  questions,
  answers,
  messages,
  notifications,
  type User,
  type UpsertUser,
  type Project,
  type InsertProject,
  type Proposal,
  type InsertProposal,
  type Badge,
  type UserBadge,
  type Question,
  type InsertQuestion,
  type Answer,
  type InsertAnswer,
  type Message,
  type InsertMessage,
  type Notification,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, asc, sql, and, or, like, count } from "drizzle-orm";

export interface IStorage {
  // User operations (mandatory for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  updateUserProfile(id: string, data: Partial<User>): Promise<User>;
  
  // Project operations
  createProject(project: InsertProject): Promise<Project>;
  getProject(id: string): Promise<Project | undefined>;
  getProjects(filters?: {
    category?: string;
    experienceLevel?: string;
    budgetMin?: number;
    budgetMax?: number;
    skills?: string[];
    limit?: number;
    offset?: number;
  }): Promise<Project[]>;
  updateProject(id: string, data: Partial<Project>): Promise<Project>;
  getUserProjects(userId: string): Promise<Project[]>;
  
  // Proposal operations
  createProposal(proposal: InsertProposal): Promise<Proposal>;
  getProposalsForProject(projectId: string): Promise<Proposal[]>;
  getProposalsForUser(userId: string): Promise<Proposal[]>;
  updateProposal(id: string, data: Partial<Proposal>): Promise<Proposal>;
  
  // Badge operations
  createBadge(badge: Omit<Badge, 'id' | 'createdAt'>): Promise<Badge>;
  getBadges(): Promise<Badge[]>;
  getUserBadges(userId: string): Promise<UserBadge[]>;
  awardBadge(userId: string, badgeId: string): Promise<UserBadge>;
  
  // Q&A operations
  createQuestion(question: InsertQuestion): Promise<Question>;
  getQuestions(filters?: {
    tags?: string[];
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<Question[]>;
  getQuestion(id: string): Promise<Question | undefined>;
  updateQuestion(id: string, data: Partial<Question>): Promise<Question>;
  
  createAnswer(answer: InsertAnswer): Promise<Answer>;
  getAnswersForQuestion(questionId: string): Promise<Answer[]>;
  updateAnswer(id: string, data: Partial<Answer>): Promise<Answer>;
  
  // Message operations
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(userId1: string, userId2: string): Promise<Message[]>;
  getUnreadMessages(userId: string): Promise<Message[]>;
  markMessageAsRead(id: string): Promise<void>;
  
  // Notification operations
  createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification>;
  getUserNotifications(userId: string): Promise<Notification[]>;
  markNotificationAsRead(id: string): Promise<void>;
  
  // Dashboard operations
  getDashboardStats(userId: string): Promise<{
    totalProjects: number;
    totalEarnings: number;
    averageRating: number;
    completionRate: number;
    activeProjects: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async updateUserProfile(id: string, data: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Project operations
  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async getProjects(filters?: {
    category?: string;
    experienceLevel?: string;
    budgetMin?: number;
    budgetMax?: number;
    skills?: string[];
    limit?: number;
    offset?: number;
  }): Promise<Project[]> {
    let whereConditions = [eq(projects.status, 'open')];

    if (filters?.category) {
      whereConditions.push(eq(projects.category, filters.category));
    }
    if (filters?.experienceLevel) {
      whereConditions.push(eq(projects.experienceLevel, filters.experienceLevel));
    }
    
    let query = db.select().from(projects)
      .where(and(...whereConditions))
      .orderBy(desc(projects.createdAt));
    
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset) {
      query = query.offset(filters.offset);
    }

    return await query;
  }

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    const [project] = await db
      .update(projects)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(projects.id, id))
      .returning();
    return project;
  }

  async getUserProjects(userId: string): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(or(eq(projects.clientId, userId), eq(projects.freelancerId, userId)))
      .orderBy(desc(projects.createdAt));
  }

  // Proposal operations
  async createProposal(proposal: InsertProposal): Promise<Proposal> {
    const [newProposal] = await db.insert(proposals).values(proposal).returning();
    
    // Update proposal count for the project
    await db
      .update(projects)
      .set({ proposalCount: sql`${projects.proposalCount} + 1` })
      .where(eq(projects.id, proposal.projectId));
    
    return newProposal;
  }

  async getProposalsForProject(projectId: string): Promise<Proposal[]> {
    return await db
      .select()
      .from(proposals)
      .where(eq(proposals.projectId, projectId))
      .orderBy(desc(proposals.createdAt));
  }

  async getProposalsForUser(userId: string): Promise<Proposal[]> {
    return await db
      .select()
      .from(proposals)
      .where(eq(proposals.freelancerId, userId))
      .orderBy(desc(proposals.createdAt));
  }

  async updateProposal(id: string, data: Partial<Proposal>): Promise<Proposal> {
    const [proposal] = await db
      .update(proposals)
      .set(data)
      .where(eq(proposals.id, id))
      .returning();
    return proposal;
  }

  // Badge operations
  async createBadge(badge: Omit<Badge, 'id' | 'createdAt'>): Promise<Badge> {
    const [newBadge] = await db.insert(badges).values(badge).returning();
    return newBadge;
  }

  async getBadges(): Promise<Badge[]> {
    return await db.select().from(badges).orderBy(asc(badges.name));
  }

  async getUserBadges(userId: string): Promise<UserBadge[]> {
    return await db
      .select()
      .from(userBadges)
      .where(eq(userBadges.userId, userId))
      .orderBy(desc(userBadges.earnedAt));
  }

  async awardBadge(userId: string, badgeId: string): Promise<UserBadge> {
    const [userBadge] = await db
      .insert(userBadges)
      .values({ userId, badgeId })
      .returning();
    return userBadge;
  }

  // Q&A operations
  async createQuestion(question: InsertQuestion): Promise<Question> {
    const [newQuestion] = await db.insert(questions).values(question).returning();
    return newQuestion;
  }

  async getQuestions(filters?: {
    tags?: string[];
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<Question[]> {
    let query = db.select().from(questions);

    if (filters?.search) {
      query = query.where(
        or(
          like(questions.title, `%${filters.search}%`),
          like(questions.content, `%${filters.search}%`)
        )
      );
    }

    query = query.orderBy(desc(questions.createdAt));

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    if (filters?.offset) {
      query = query.offset(filters.offset);
    }

    return await query;
  }

  async getQuestion(id: string): Promise<Question | undefined> {
    const [question] = await db.select().from(questions).where(eq(questions.id, id));
    
    if (question) {
      // Increment view count
      await db
        .update(questions)
        .set({ views: sql`${questions.views} + 1` })
        .where(eq(questions.id, id));
    }
    
    return question;
  }

  async updateQuestion(id: string, data: Partial<Question>): Promise<Question> {
    const [question] = await db
      .update(questions)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(questions.id, id))
      .returning();
    return question;
  }

  async createAnswer(answer: InsertAnswer): Promise<Answer> {
    const [newAnswer] = await db.insert(answers).values(answer).returning();
    
    // Update answer count for the question
    await db
      .update(questions)
      .set({ answerCount: sql`${questions.answerCount} + 1` })
      .where(eq(questions.id, answer.questionId));
    
    return newAnswer;
  }

  async getAnswersForQuestion(questionId: string): Promise<Answer[]> {
    return await db
      .select()
      .from(answers)
      .where(eq(answers.questionId, questionId))
      .orderBy(desc(answers.votes), desc(answers.createdAt));
  }

  async updateAnswer(id: string, data: Partial<Answer>): Promise<Answer> {
    const [answer] = await db
      .update(answers)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(answers.id, id))
      .returning();
    return answer;
  }

  // Message operations
  async createMessage(message: InsertMessage): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  async getMessages(userId1: string, userId2: string): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(
        or(
          and(eq(messages.senderId, userId1), eq(messages.receiverId, userId2)),
          and(eq(messages.senderId, userId2), eq(messages.receiverId, userId1))
        )
      )
      .orderBy(asc(messages.createdAt));
  }

  async getUnreadMessages(userId: string): Promise<Message[]> {
    return await db
      .select()
      .from(messages)
      .where(and(eq(messages.receiverId, userId), eq(messages.isRead, false)))
      .orderBy(desc(messages.createdAt));
  }

  async markMessageAsRead(id: string): Promise<void> {
    await db
      .update(messages)
      .set({ isRead: true })
      .where(eq(messages.id, id));
  }

  // Notification operations
  async createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification> {
    const [newNotification] = await db.insert(notifications).values(notification).returning();
    return newNotification;
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt))
      .limit(50);
  }

  async markNotificationAsRead(id: string): Promise<void> {
    await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, id));
  }

  // Dashboard operations
  async getDashboardStats(userId: string): Promise<{
    totalProjects: number;
    totalEarnings: number;
    averageRating: number;
    completionRate: number;
    activeProjects: number;
  }> {
    const user = await this.getUser(userId);
    if (!user) {
      return {
        totalProjects: 0,
        totalEarnings: 0,
        averageRating: 0,
        completionRate: 0,
        activeProjects: 0,
      };
    }

    const userProjects = await this.getUserProjects(userId);
    const activeProjects = userProjects.filter(p => p.status === 'in_progress').length;
    const completedProjects = userProjects.filter(p => p.status === 'completed').length;
    const completionRate = userProjects.length > 0 ? (completedProjects / userProjects.length) * 100 : 0;

    return {
      totalProjects: user.completedProjects,
      totalEarnings: parseFloat(user.totalEarnings || '0'),
      averageRating: parseFloat(user.rating || '0'),
      completionRate,
      activeProjects,
    };
  }
}

export const storage = new DatabaseStorage();
