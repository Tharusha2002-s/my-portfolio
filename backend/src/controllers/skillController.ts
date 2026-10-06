import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getSkills = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;

    const whereClause: Record<string, unknown> = {};
    if (category && typeof category === "string") {
      whereClause.category = category;
    }

    const skills = await prisma.skill.findMany({
      where: whereClause,
      orderBy: [{ category: "asc" }, { order: "asc" }, { name: "asc" }],
    });

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    console.error("[Get Skills Error]:", error);
    res.status(500).json({ success: false, error: "Failed to fetch skills." });
  }
};

export const createSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, name, proficiency, icon, order } = req.body;

    if (!category || !name) {
      res.status(400).json({
        success: false,
        error: "Category and skill name are required.",
      });
      return;
    }

    const newSkill = await prisma.skill.create({
      data: {
        category: category.trim(),
        name: name.trim(),
        proficiency: proficiency !== undefined ? Number(proficiency) : 85,
        icon: icon ? icon.trim() : null,
        order: order !== undefined ? Number(order) : 0,
      },
    });

    res.status(201).json({
      success: true,
      message: "Skill created successfully.",
      data: newSkill,
    });
  } catch (error) {
    console.error("[Create Skill Error]:", error);
    res.status(500).json({ success: false, error: "Failed to add skill." });
  }
};

export const updateSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { category, name, proficiency, icon, order } = req.body;

    const existing = await prisma.skill.findUnique({ where: { id } });
    if (!existing) {
      res.status(404).json({ success: false, error: "Skill not found." });
      return;
    }

    const updateData: Record<string, unknown> = {};
    if (category !== undefined) updateData.category = category.trim();
    if (name !== undefined) updateData.name = name.trim();
    if (proficiency !== undefined) updateData.proficiency = Number(proficiency);
    if (icon !== undefined) updateData.icon = icon ? icon.trim() : null;
    if (order !== undefined) updateData.order = Number(order);

    const updated = await prisma.skill.update({
      where: { id },
      data: updateData,
    });

    res.status(200).json({
      success: true,
      message: "Skill updated successfully.",
      data: updated,
    });
  } catch (error) {
    console.error("[Update Skill Error]:", error);
    res.status(500).json({ success: false, error: "Failed to update skill." });
  }
};

export const deleteSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.skill.delete({ where: { id } });

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully.",
    });
  } catch (error) {
    console.error("[Delete Skill Error]:", error);
    res.status(500).json({ success: false, error: "Failed to delete skill." });
  }
};
