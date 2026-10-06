import { Router } from "express";
import {
  createMessage,
  getMessages,
  getMessageById,
  updateMessageStatus,
  deleteMessage,
} from "../controllers/messageController";
import { authenticateAdmin } from "../middleware/auth";
import { createRateLimiter } from "../middleware/rateLimiter";

const router = Router();

// Rate limiter: Max 5 inquiries per 15 minutes per IP to prevent bot spam
const contactLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many messages sent from this IP. Please wait 15 minutes before sending another inquiry.",
});

// Public inquiry submission route: POST /api/contact protected against spam
router.post("/", contactLimiter, createMessage);

// Admin-only inquiry management routes: /api/contact/messages
router.get("/messages", authenticateAdmin, getMessages);
router.get("/messages/:id", authenticateAdmin, getMessageById);
router.patch("/messages/:id", authenticateAdmin, updateMessageStatus);
router.delete("/messages/:id", authenticateAdmin, deleteMessage);

export default router;
