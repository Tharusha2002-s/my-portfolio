import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const [
      totalProjects,
      featuredProjects,
      totalMessages,
      unreadMessages,
      repliedMessages,
      recentMessages,
      recentProjectsRaw,
      totalSkills,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { featured: true } }),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { status: "UNREAD" } }),
      prisma.contactMessage.count({ where: { status: "REPLIED" } }),
      prisma.contactMessage.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.project.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.skill.count(),
    ]);

    const formattedProjects = recentProjectsRaw.map((p) => {
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

    const mem = process.memoryUsage();
    const memoryUsedMb = Math.round(mem.rss / 1024 / 1024);

    res.status(200).json({
      success: true,
      stats: {
        projects: {
          total: totalProjects,
          featured: featuredProjects,
        },
        messages: {
          total: totalMessages,
          unread: unreadMessages,
          replied: repliedMessages,
        },
        skills: {
          total: totalSkills,
        },
        recentMessages,
        recentProjects: formattedProjects,
        system: {
          status: "healthy",
          uptimeSeconds: Math.floor(process.uptime()),
          memoryRssMb: memoryUsedMb,
          nodeVersion: process.version,
          platform: process.platform,
          database: "PostgreSQL (Synced via Prisma ORM)",
          timestamp: new Date().toISOString(),
        },
      },
    });
  } catch (error) {
    console.error("[Dashboard Stats Error]:", error);
    res.status(500).json({
      success: false,
      error: "Failed to load dashboard statistics.",
    });
  }
};

export const getPublicStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const [projectCount, skillCount] = await Promise.all([
      prisma.project.count(),
      prisma.skill.count(),
    ]);

    const startYear = 2023;
    const currentYear = new Date().getFullYear();
    const yearsLearning = Math.max(1, currentYear - startYear);

    res.status(200).json({
      success: true,
      stats: {
        projects: projectCount,
        technologies: skillCount,
        yearsLearning,
      },
    });
  } catch (error) {
    console.error("[Public Stats Error]:", error);
    res.status(500).json({
      success: false,
      error: "Failed to load public statistics.",
    });
  }
};

