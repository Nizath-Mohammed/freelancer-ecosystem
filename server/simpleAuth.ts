import type { Express, RequestHandler } from "express";
import session from "express-session";
import { storage } from "./storage";

// Simple temporary authentication for development
export function setupSimpleAuth(app: Express) {
  // Setup session middleware with memory store
  app.use(session({
    secret: process.env.SESSION_SECRET || 'dev-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    },
  }));
  // Simple login endpoint for development
  app.get("/api/login", (req, res) => {
    // For development, create a demo user session
    const demoUser = {
      id: "demo-user-123",
      email: "demo@conectify.com",
      firstName: "Demo",
      lastName: "User",
      profileImageUrl: null,
      role: "freelancer" as const,
    };
    
    // Store in session
    (req as any).session.user = demoUser;
    
    res.redirect("/dashboard");
  });

  // Get current user
  app.get("/api/auth/user", async (req: any, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      // Ensure user exists in database
      let user = await storage.getUser(req.session.user.id);
      if (!user) {
        user = await storage.upsertUser({
          ...req.session.user,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Get current user (no auto-login)
  app.get("/api/auth/me", async (req: any, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      // Ensure user exists in database
      let user = await storage.getUser(req.session.user.id);
      if (!user) {
        user = await storage.upsertUser({
          ...req.session.user,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
      
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Logout
  app.get("/api/logout", (req: any, res) => {
    req.session.destroy((err: any) => {
      if (err) {
        console.error("Logout error:", err);
      }
      res.redirect("/");
    });
  });
}

// Simple authentication middleware
export const simpleAuth: RequestHandler = async (req: any, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  req.user = req.session.user;
  next();
};