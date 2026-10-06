import { Router } from "express";
import { getDashboardStats, getPublicStats } from "../controllers/statsController";
import { authenticateAdmin } from "../middleware/auth";

const router = Router();

// Public portfolio metrics endpoint
router.get("/public", getPublicStats);

// Protected dashboard metrics endpoint
router.get("/dashboard", authenticateAdmin, getDashboardStats);

export default router;
