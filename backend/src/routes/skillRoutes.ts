import { Router } from "express";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController";
import { authenticateAdmin } from "../middleware/auth";

const router = Router();

// Public: list skills
router.get("/", getSkills);

// Admin-only management
router.post("/", authenticateAdmin, createSkill);
router.put("/:id", authenticateAdmin, updateSkill);
router.delete("/:id", authenticateAdmin, deleteSkill);

export default router;
