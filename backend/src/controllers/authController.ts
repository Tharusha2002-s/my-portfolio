import { Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { AuthenticatedRequest } from "../middleware/auth";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-tharusha-portfolio";

export const login = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      res.status(400).json({
        success: false,
        error: "Username/Email and password are required.",
      });
      return;
    }

    const trimmedIdentifier = String(identifier).trim().toLowerCase();

    // Find admin by email or username
    const admin = await prisma.admin.findFirst({
      where: {
        OR: [
          { email: trimmedIdentifier },
          { username: trimmedIdentifier },
        ],
      },
    });

    if (!admin) {
      res.status(401).json({
        success: false,
        error: "Invalid credentials. Please verify your username/email and password.",
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        error: "Invalid credentials. Please verify your username/email and password.",
      });
      return;
    }

    const payload = {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      success: true,
      message: "Authentication successful.",
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("[Auth Login Error]:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error during authentication.",
    });
  }
};

export const getMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.admin?.id) {
      res.status(401).json({ success: false, error: "Not authenticated." });
      return;
    }

    const admin = await prisma.admin.findUnique({
      where: { id: req.admin.id },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!admin) {
      res.status(404).json({ success: false, error: "Admin account not found." });
      return;
    }

    res.status(200).json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error("[Auth GetMe Error]:", error);
    res.status(500).json({ success: false, error: "Failed to fetch admin profile." });
  }
};

export const changePassword = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.admin?.id) {
      res.status(401).json({ success: false, error: "Not authenticated." });
      return;
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({
        success: false,
        error: "Both current password and new password are required.",
      });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({
        success: false,
        error: "New password must be at least 6 characters long.",
      });
      return;
    }

    const admin = await prisma.admin.findUnique({
      where: { id: req.admin.id },
    });

    if (!admin) {
      res.status(404).json({ success: false, error: "Admin not found." });
      return;
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isMatch) {
      res.status(400).json({
        success: false,
        error: "Current password is incorrect.",
      });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    await prisma.admin.update({
      where: { id: req.admin.id },
      data: { passwordHash: newPasswordHash },
    });

    res.status(200).json({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error("[Auth ChangePassword Error]:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update password.",
    });
  }
};
