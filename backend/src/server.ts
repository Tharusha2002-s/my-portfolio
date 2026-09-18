import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create Express application instance
const app = express();
const PORT = process.env.PORT || 5001;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// ==========================================
// Middlewares (Functions that run before routes)
// ==========================================

// 1. CORS: Allows our Next.js frontend (on port 3000) to communicate with this backend (on port 5000)
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// 2. JSON Body Parser: Parses incoming requests with JSON payloads (e.g. from contact form)
app.use(express.json());

// ==========================================
// API Routes
// ==========================================

// Health Check Route: Verifies the server is running properly
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "Portfolio Backend API is running smoothly!",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Root fallback route
app.get("/", (req: Request, res: Response) => {
  res.send("🚀 Welcome to Tharusha's Portfolio API. Use /api/health to check status.");
});

// ==========================================
// Start Server
// ==========================================
app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🛡️  Allowed frontend: ${FRONTEND_URL}`);
  console.log(`========================================`);
});
