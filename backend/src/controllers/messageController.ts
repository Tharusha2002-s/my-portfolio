import { Request, Response } from "express";
import prisma from "../lib/prisma";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      res.status(400).json({ success: false, error: "Your name is required." });
      return;
    }

    if (!email || typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
      res.status(400).json({ success: false, error: "A valid email address is required." });
      return;
    }

    if (!subject || typeof subject !== "string" || subject.trim().length === 0) {
      res.status(400).json({ success: false, error: "Subject is required." });
      return;
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      res.status(400).json({
        success: false,
        error: "Message must be at least 10 characters long.",
      });
      return;
    }

    const newMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        status: "UNREAD",
      },
    });

    console.log(`[Contact Inquiry Saved]: ID ${newMessage.id} from ${newMessage.email}`);

    res.status(201).json({
      success: true,
      message: "Thank you for reaching out! Your message has been received.",
      data: {
        id: newMessage.id,
        createdAt: newMessage.createdAt,
      },
    });
  } catch (error) {
    console.error("[Create Message Error]:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error. Unable to deliver your message at this time.",
    });
  }
};

export const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, search } = req.query;

    const whereClause: Record<string, unknown> = {};

    if (status && typeof status === "string" && status.toUpperCase() !== "ALL") {
      whereClause.status = status.toUpperCase();
    }

    if (search && typeof search === "string" && search.trim().length > 0) {
      const q = search.trim();
      whereClause.OR = [
        { name: { contains: q } },
        { email: { contains: q } },
        { subject: { contains: q } },
        { message: { contains: q } },
      ];
    }

    const messages = await prisma.contactMessage.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    const unreadCount = await prisma.contactMessage.count({
      where: { status: "UNREAD" },
    });

    res.status(200).json({
      success: true,
      count: messages.length,
      unreadCount,
      data: messages,
    });
  } catch (error) {
    console.error("[Get Messages Error]:", error);
    res.status(500).json({
      success: false,
      error: "Failed to retrieve contact messages.",
    });
  }
};

export const getMessageById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const message = await prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!message) {
      res.status(404).json({ success: false, error: "Message not found." });
      return;
    }

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error("[Get Message By ID Error]:", error);
    res.status(500).json({ success: false, error: "Failed to load message." });
  }
};

export const updateMessageStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const validStatuses = ["UNREAD", "READ", "REPLIED", "ARCHIVED"];

    if (status && !validStatuses.includes(status.toUpperCase())) {
      res.status(400).json({
        success: false,
        error: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
      return;
    }

    const updatePayload: Record<string, unknown> = {};
    if (status) updatePayload.status = status.toUpperCase();
    if (adminNotes !== undefined) updatePayload.adminNotes = adminNotes;

    const updated = await prisma.contactMessage.update({
      where: { id },
      data: updatePayload,
    });

    res.status(200).json({
      success: true,
      message: "Message updated successfully.",
      data: updated,
    });
  } catch (error) {
    console.error("[Update Message Error]:", error);
    res.status(500).json({ success: false, error: "Failed to update message." });
  }
};

export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.contactMessage.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Message deleted successfully.",
    });
  } catch (error) {
    console.error("[Delete Message Error]:", error);
    res.status(500).json({ success: false, error: "Failed to delete message." });
  }
};
