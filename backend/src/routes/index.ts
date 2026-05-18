import { Router } from "express";
import { authRouter } from "./auth-routes";
import { meRouter } from "./me-route";

export const appRouter = Router();

appRouter.use(authRouter);
appRouter.use(meRouter);
