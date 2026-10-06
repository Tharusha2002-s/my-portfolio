import { Request, Response, NextFunction } from "express";

interface RateLimitStore {
  [key: string]: { count: number; resetTime: number };
}

/**
 * Lightweight, dependency-free in-memory rate limiter for production security.
 * Protects against brute-force logins and contact inquiry spam.
 */
export function createRateLimiter(options: {
  windowMs: number;
  max: number;
  message: string;
}) {
  const store: RateLimitStore = {};

  // Clean expired IPs periodically every 5 minutes to avoid memory leaks
  setInterval(() => {
    const now = Date.now();
    for (const ip in store) {
      if (now > store[ip].resetTime) {
        delete store[ip];
      }
    }
  }, 5 * 60 * 1000);

  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();

    if (!store[ip] || now > store[ip].resetTime) {
      store[ip] = { count: 1, resetTime: now + options.windowMs };
      return next();
    }

    store[ip].count += 1;

    if (store[ip].count > options.max) {
      res.status(429).json({
        success: false,
        error: options.message,
      });
      return;
    }

    next();
  };
}
