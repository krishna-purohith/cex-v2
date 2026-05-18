import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "./env";

export interface TokenPayload {
  userId: string;
}

export function createToken(payload: TokenPayload): string {
  const token = jwt.sign(payload, env.jwtSecret, { expiresIn: "7d" });
  return token;
}

export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  const token =
    typeof authHeader === "string" && authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : undefined;

  if (!token) {
    res.status(401).json({ error: "Missing auth token" });
    return;
  }
  try {
    const payload = jwt.verify(token, env.jwtSecret) as TokenPayload;
    req.userId = payload.userId;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid auth token" });
  }
}
