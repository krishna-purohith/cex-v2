import { Router } from "express";
import { signin, signup } from "../controllers/auth-controller";
import { asyncHandler } from "../utils/async-handler";

export const authRouter = Router();

authRouter.post("/signup", asyncHandler(signup));

authRouter.post("/signin", asyncHandler(signin));
