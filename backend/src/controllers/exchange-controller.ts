import { Request, Response } from "express";
import {
  orderBodySchema,
  orderIdParamSchema,
  symbolParamSchema,
} from "../types/engine-schema";
import { sendValidationError } from "../utils/validation";
import { sendToEngine } from "../utils/engine-client";

function getUserId(req: Request) {
  if (!req.userId) throw new Error("Missing authenticated user");
  return req.userId;
}

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = getUserId(req);
  const parsedBody = orderBodySchema.safeParse(req.body);
  if (!parsedBody.success) {
    sendValidationError(res, parsedBody.error);
    return;
  }

  const { qty, side, symbol, type } = parsedBody.data;

  const engineResponse = await sendToEngine("create_order", {
    qty,
    side,
    symbol,
    type,
    price: type === "limit" ? parsedBody.data.price : null,
    userId,
  });

  res
    .status(engineResponse.ok ? 201 : 400)
    .json(
      engineResponse.ok ? engineResponse.data : { error: engineResponse.error }
    );
};

export const getDepth = async (req: Request, res: Response): Promise<void> => {
  const parsedParams = symbolParamSchema.safeParse(req.params);
  if (!parsedParams.success) {
    sendValidationError(res, parsedParams.error);
    return;
  }
  const { symbol } = parsedParams.data;

  const engineResponse = await sendToEngine("get_depth", {
    symbol,
  });

  res
    .status(engineResponse.ok ? 200 : 400)
    .json(
      engineResponse.ok ? engineResponse.data : { error: engineResponse.error }
    );
};

export const getBalance = async (
  req: Request,
  res: Response
): Promise<void> => {
  const engineResponse = await sendToEngine("get_user_balance", {
    userId: getUserId(req),
  });

  res
    .status(engineResponse.ok ? 200 : 400)
    .json(
      engineResponse.ok ? engineResponse.data : { error: engineResponse.error }
    );
};
export const getOrder = async (req: Request, res: Response): Promise<void> => {
  const parsedParam = orderIdParamSchema.safeParse(req.params);
  if (!parsedParam.success) {
    sendValidationError(res, parsedParam.error);
    return;
  }

  const engineResponse = await sendToEngine("get_order", {
    userId: getUserId(req),
    orderId: parsedParam.data.orderId,
  });

  res
    .status(engineResponse.ok ? 200 : 404)
    .json(
      engineResponse.ok ? engineResponse.data : { error: engineResponse.error }
    );
};

export const cancelOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const parsedParams = orderIdParamSchema.safeParse(req.params);
  if (!parsedParams.success) {
    sendValidationError(res, parsedParams.error);
    return;
  }

  const engineResponse = await sendToEngine("cancel_order", {
    userId: getUserId(req),
    orderId: parsedParams.data.orderId,
  });

  res
    .status(engineResponse.ok ? 200 : 400)
    .json(
      engineResponse.ok ? engineResponse.data : { error: engineResponse.error }
    );
};
