import { Router } from "express";
import { me } from "../controllers/me-controller";
import { requireAuth } from "../utils/auth";
import { asyncHandler } from "../utils/async-handler";

export const meRouter = Router();

meRouter.get("/me", requireAuth, asyncHandler(me));
