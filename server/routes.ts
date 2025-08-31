import type { Express } from "express";
import { createServer, type Server } from "http";
import session from "express-session";
import connectPg from "connect-pg-simple";
import bcrypt from "bcryptjs";
import { storage } from "./storage";
import passport from "./auth";
import { insertProjectRequestSchema } from "@shared/schema";

// Middleware to check if user is authenticated
function requireAuth(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Authentication required" });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session configuration with PostgreSQL store
  const pgStore = connectPg(session);
  
  app.use(session({
    store: new pgStore({
      conString: process.env.DATABASE_URL,
      tableName: 'sessions',
      createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET || 'fallback-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production', // HTTPS in production
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Initialize passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Auth routes
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create user  
      const { randomUUID } = await import("crypto");
      const user = await storage.upsertUser({
        id: randomUUID(),
        email,
        firstName,
        lastName,
        password: hashedPassword,
      });

      // Log user in
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ message: "Registration successful but login failed" });
        }
        res.json({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: "Registration failed" });
    }
  });

  app.post('/api/auth/login', passport.authenticate('local'), (req, res) => {
    const user = req.user as any;
    res.json({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
  });

  app.post('/api/auth/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // Discord OAuth routes
  app.get('/api/auth/discord', passport.authenticate('discord'));
  app.get('https://discord.com/oauth2/authorize?client_id=1410900086463926308&response_type=code&redirect_uri=https%3A%2F%2Fprojecthub-fie.vercel.app%2Fapi%2Fauth%2Fdiscord%2Fcallback&scope=identify+email',
    passport.authenticate('discord', { failureRedirect: '/login?error=discord_failed' }),
    (req, res) => {
      res.redirect('/request-project?login=success');
    }
  );

  // Get current user
  app.get('/api/auth/me', (req, res) => {
    if (req.isAuthenticated()) {
      const user = req.user as any;
      res.json({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  });

  // Project request routes
  app.post('/api/project-requests', requireAuth, async (req, res) => {
    try {
      const user = req.user as any;
      const validatedData = insertProjectRequestSchema.parse({
        ...req.body,
        userId: user.id
      });
      
      const projectRequest = await storage.createProjectRequest(validatedData);
      res.json(projectRequest);
    } catch (error) {
      console.error('Project request creation error:', error);
      res.status(500).json({ message: "Failed to create project request" });
    }
  });

  app.get('/api/project-requests', requireAuth, async (req, res) => {
    try {
      const user = req.user as any;
      const requests = await storage.getProjectRequests(user.id);
      res.json(requests);
    } catch (error) {
      console.error('Project requests fetch error:', error);
      res.status(500).json({ message: "Failed to fetch project requests" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
