import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectRoutes";
import messageRoutes from "./routes/messageRoutes";
import statsRoutes from "./routes/statsRoutes";
import skillRoutes from "./routes/skillRoutes";
import prisma from "./lib/prisma";

// Load environment variables from .env file
dotenv.config();

// Create Express application instance
const app = express();
const PORT = process.env.PORT || 5001;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// ==========================================
// Middlewares
// ==========================================

// 0. Security Headers (Industry standard protection against sniffing, clickjacking & XSS)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// 1. Dynamic CORS to support local frontend development
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);
      // Allow localhost on ports 3000, 3001, etc., or configured FRONTEND_URL
      if (
        origin === FRONTEND_URL ||
        origin.startsWith("http://localhost:") ||
        origin.startsWith("http://127.0.0.1:")
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive for local portfolio dev
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 2. Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Request Logger (Development friendly)
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (process.env.NODE_ENV !== "test") {
      console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// ==========================================
// API Routes
// ==========================================

// 1. Health & Server Status
app.get("/api/health", async (req: Request, res: Response) => {
  try {
    // Quick ping to database to verify connectivity
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({
      status: "ok",
      database: "connected",
      message: "Portfolio API & Database are running smoothly!",
      uptime: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    });
  } catch (dbErr) {
    res.status(500).json({
      status: "error",
      database: "disconnected",
      message: "Database ping failed.",
      error: String(dbErr),
    });
  }
});

// 2. Authentication Routes: /api/auth
app.use("/api/auth", authRoutes);

// 3. Projects Routes: /api/projects
app.use("/api/projects", projectRoutes);

// 4. Contact & Inquiries Routes: /api/contact
app.use("/api/contact", messageRoutes);

// 5. Skills Routes: /api/skills
app.use("/api/skills", skillRoutes);

// 6. Admin Analytics & Stats: /api/stats
app.use("/api/stats", statsRoutes);

// Root fallback route
app.get("/", (req: Request, res: Response) => {
  res.json({
    name: "Tharusha Portfolio API",
    version: "1.0.0",
    healthCheck: "/api/health",
    documentation: {
      auth: "/api/auth/login",
      projects: "/api/projects",
      contact: "/api/contact",
      skills: "/api/skills",
      stats: "/api/stats/dashboard",
    },
  });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.originalUrl} - Route not found.`,
  });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("[Unhandled Server Error]:", err);
  res.status(500).json({
    success: false,
    error: "Internal Server Error",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// ==========================================
// Start Server & Initialize Database
// ==========================================
async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`=================================================`);
      console.log(`🚀 Tharusha's Portfolio API running on port ${PORT}`);
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`🩺 Health: http://localhost:${PORT}/api/health`);
      console.log(`🛡️  Admin Dashboard Endpoints active at /api/*`);
      console.log(`=================================================`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

startServer();

export default app;
