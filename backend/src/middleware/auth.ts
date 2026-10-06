import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AdminPayload {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  admin?: AdminPayload;
}

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key-tharusha-portfolio";

export const authenticateAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        error: "Unauthorized: Missing or malformed authorization header.",
      });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({
        success: false,
        error: "Unauthorized: Token not provided.",
      });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as AdminPayload;
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      error: "Unauthorized: Invalid or expired access token.",
    });
  }
};
