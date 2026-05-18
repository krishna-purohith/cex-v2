import { Request, Response } from "express";

export const me = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId;

  if (!userId) {
    res.status(404).json({
      success: false,
      error: "userId not found",
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: { userId },
  });
};
