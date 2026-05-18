import { Request, Response } from "express";
import { authSchema } from "../types/auth-schema";
import { sendValidationError } from "../utils/validation";
import bcrypt from "bcrypt";
import { prisma } from "../db";
import { createToken } from "../utils/auth";

export const signup = async (req: Request, res: Response): Promise<void> => {
  const parsedBody = authSchema.safeParse(req.body);
  if (!parsedBody.success) {
    sendValidationError(res, parsedBody.error);
    return;
  }
  const { username, password } = parsedBody.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    res.status(201).json({
      token: createToken({ userId: user.id }),
      userId: user.id,
      username: user.username,
    });
  } catch (error) {
    res.status(409).json({ error: "username already exists" });
  }
};
export const signin = async (req: Request, res: Response): Promise<void> => {
  const parsedBody = authSchema.safeParse(req.body);
  if (!parsedBody.success) {
    sendValidationError(res, parsedBody.error);
    return;
  }

  const { username, password } = parsedBody.data;
  try {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      res.status(404).json({
        error: "user does not exist",
      });
      return;
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      res.status(401).json({
        error: "Invalid credentials",
      });
      return;
    }
    res.status(200).json({
      token: createToken({ userId: user.id }),
      userId: user.id,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
