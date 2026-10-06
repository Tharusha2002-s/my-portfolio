import { Router } from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController";
import { authenticateAdmin } from "../middleware/auth";

const router = Router();

// Public routes
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Admin-only protected routes
router.post("/", authenticateAdmin, createProject);
router.put("/:id", authenticateAdmin, updateProject);
router.delete("/:id", authenticateAdmin, deleteProject);

export default router;
