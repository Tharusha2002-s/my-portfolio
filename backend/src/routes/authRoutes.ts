import { Router } from "express";
import { login, getMe, changePassword } from "../controllers/authController";
import { authenticateAdmin } from "../middleware/auth";
import { createRateLimiter } from "../middleware/rateLimiter";

const router = Router();

// Rate limiter: Max 10 login attempts per 15 minutes per IP
const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts. Please wait 15 minutes before trying again.",
});

// Public auth route protected with brute force limiter
router.post("/login", loginLimiter, login);

// Protected routes (Admin token required)
router.get("/me", authenticateAdmin, getMe);
router.post("/change-password", authenticateAdmin, changePassword);

export default router;
