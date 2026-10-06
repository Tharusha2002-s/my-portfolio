import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, featured } = req.query;

    const whereClause: Record<string, unknown> = {};

    if (category && typeof category === "string" && category !== "All") {
      whereClause.category = category;
    }

    if (featured !== undefined) {
      whereClause.featured = featured === "true";
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    // Parse technologies JSON string into array for easier client handling
    const formattedProjects = projects.map((p) => {
      let parsedTech: string[] = [];
      try {
        parsedTech = JSON.parse(p.technologies);
      } catch {
        parsedTech = p.technologies
          ? p.technologies.split(",").map((s) => s.trim())
          : [];
      }
      return {
        ...p,
        technologies: parsedTech,
      };
    });

    res.status(200).json({
      success: true,
      count: formattedProjects.length,
      data: formattedProjects,
    });
  } catch (error) {
    console.error("[Get Projects Error]:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch projects.",
    });
  }
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      res.status(404).json({ success: false, error: "Project not found." });
      return;
    }

    let parsedTech: string[] = [];
    try {
      parsedTech = JSON.parse(project.technologies);
    } catch {
      parsedTech = project.technologies
        ? project.technologies.split(",").map((s) => s.trim())
        : [];
    }

    res.status(200).json({
      success: true,
      data: {
        ...project,
        technologies: parsedTech,
      },
    });
  } catch (error) {
    console.error("[Get Project By ID Error]:", error);
    res.status(500).json({ success: false, error: "Failed to retrieve project." });
  }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      number,
      title,
      description,
      technologies,
      category,
      github,
      demo,
      featured,
      order,
    } = req.body;

    if (!title || !description || !category) {
      res.status(400).json({
        success: false,
        error: "Title, description, and category are required fields.",
      });
      return;
    }

    // Auto-calculate project number if not provided
    let projectNumber = number;
    if (!projectNumber) {
      const totalCount = await prisma.project.count();
      projectNumber = String(totalCount + 1).padStart(2, "0");
    }

    // Standardize technologies storage as JSON string
    let techString = "[]";
    if (Array.isArray(technologies)) {
      techString = JSON.stringify(technologies);
    } else if (typeof technologies === "string") {
      try {
        JSON.parse(technologies);
        techString = technologies;
      } catch {
        techString = JSON.stringify(
          technologies.split(",").map((t) => t.trim()).filter(Boolean)
        );
      }
    }

    const newProject = await prisma.project.create({
      data: {
        number: projectNumber,
        title: title.trim(),
        description: description.trim(),
        technologies: techString,
        category: category.trim(),
        github: github ? github.trim() : null,
        demo: demo ? demo.trim() : null,
        featured: featured !== undefined ? Boolean(featured) : true,
        order: order !== undefined ? Number(order) : 0,
      },
    });

    let parsedTech: string[] = [];
    try {
      parsedTech = JSON.parse(newProject.technologies);
    } catch {
      parsedTech = [];
    }

    res.status(201).json({
      success: true,
      message: "Project created successfully.",
      data: {
        ...newProject,
        technologies: parsedTech,
      },
    });
  } catch (error) {
    console.error("[Create Project Error]:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create new project.",
    });
  }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      number,
      title,
      description,
      technologies,
      category,
      github,
      demo,
      featured,
      order,
    } = req.body;

    const existing = await prisma.project.findUnique({
      where: { id },
    });

    if (!existing) {
      res.status(404).json({ success: false, error: "Project not found." });
      return;
    }

    const updateData: Record<string, unknown> = {};

    if (number !== undefined) updateData.number = String(number).trim();
    if (title !== undefined) updateData.title = String(title).trim();
    if (description !== undefined) updateData.description = String(description).trim();
    if (category !== undefined) updateData.category = String(category).trim();
    if (github !== undefined) updateData.github = github ? String(github).trim() : null;
    if (demo !== undefined) updateData.demo = demo ? String(demo).trim() : null;
    if (featured !== undefined) updateData.featured = Boolean(featured);
    if (order !== undefined) updateData.order = Number(order);

    if (technologies !== undefined) {
      if (Array.isArray(technologies)) {
        updateData.technologies = JSON.stringify(technologies);
      } else if (typeof technologies === "string") {
        try {
          JSON.parse(technologies);
          updateData.technologies = technologies;
        } catch {
          updateData.technologies = JSON.stringify(
            technologies.split(",").map((t) => t.trim()).filter(Boolean)
          );
        }
      }
    }

    const updated = await prisma.project.update({
      where: { id },
      data: updateData,
    });

    let parsedTech: string[] = [];
    try {
      parsedTech = JSON.parse(updated.technologies);
    } catch {
      parsedTech = [];
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      data: {
        ...updated,
        technologies: parsedTech,
      },
    });
  } catch (error) {
    console.error("[Update Project Error]:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update project.",
    });
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const existing = await prisma.project.findUnique({
      where: { id },
    });

    if (!existing) {
      res.status(404).json({ success: false, error: "Project not found." });
      return;
    }

    await prisma.project.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: `Project "${existing.title}" deleted successfully.`,
    });
  } catch (error) {
    console.error("[Delete Project Error]:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete project.",
    });
  }
};
