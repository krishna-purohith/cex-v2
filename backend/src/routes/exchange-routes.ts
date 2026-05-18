import { Router } from "express";
import { asyncHandler } from "../utils/async-handler";
import {
  createOrder,
  cancelOrder,
  getBalance,
  getDepth,
  getOrder,
} from "../controllers/exchange-controller";
import { requireAuth } from "../utils/auth";

export const exchangeRouter = Router();

exchangeRouter.post("/order", requireAuth, asyncHandler(createOrder));
exchangeRouter.get("/depth/:symbol", asyncHandler(getDepth));
exchangeRouter.get("/balance", requireAuth, asyncHandler(getBalance));
exchangeRouter.get("/order/:orderId", requireAuth, asyncHandler(getOrder));
exchangeRouter.delete(
  "/order/:orderId",
  requireAuth,
  asyncHandler(cancelOrder)
);
