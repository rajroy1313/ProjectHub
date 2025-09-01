import express from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import bcrypt from "bcryptjs";
import { storage } from "../server/storage.js";
import passport from "../server/auth.js";
import { insertProjectRequestSchema } from "../shared/schema.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware to check if user is authenticated
function requireAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Authentication required" });
}

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    const existingUser = await storage.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const { randomUUID } = await import("crypto");
    const user = await storage.upsertUser({
      id: randomUUID(),
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

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
  const user = req.user;
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
app.get('/api/auth/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/login?error=discord_failed' }),
  (req, res) => {
    res.redirect('/request-project?login=success');
  }
);

// Get current user
app.get('/api/auth/me', (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    res.json({ user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName } });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'yuborajroy00@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });
    
    const mailOptions = {
      from: `"Contact Form" <${process.env.GMAIL_USER || 'yuborajroy00@gmail.com'}>`,
      to: 'yuborajroy00@gmail.com',
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Sent from ProjectHub contact form</em></p>
      `,
      replyTo: email
    };
    
    await transporter.sendMail(mailOptions);
    
    res.json({ message: "Contact form submitted successfully" });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: "Failed to submit contact form" });
  }
});

// Project request routes
app.post('/api/project-requests', requireAuth, async (req, res) => {
  try {
    const user = req.user;
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
    const user = req.user;
    const requests = await storage.getProjectRequests(user.id);
    res.json(requests);
  } catch (error) {
    console.error('Project requests fetch error:', error);
    res.status(500).json({ message: "Failed to fetch project requests" });
  }
});

// Export the Express app as a Vercel serverless function
export default app;