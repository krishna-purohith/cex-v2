import { Router } from "express";
import { authRouter } from "./auth-routes";
import { meRouter } from "./me-route";
import { exchangeRouter } from "./exchange-routes";

export const appRouter = Router();

appRouter.use(authRouter);
appRouter.use(meRouter);
appRouter.use(exchangeRouter);
