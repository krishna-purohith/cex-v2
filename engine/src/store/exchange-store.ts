export interface Balance {
  available: number;
  locked: number;
}

export type OrderType = "LIMIT" | "MARKET";
export type Side = "BUY" | "SELL";
export type Status = "open" | "partially_filled" | "filled" | "cancelled";

export interface Fill {
  userId: string;
  filledId: string;
  qty: number;
  side: Side;
  type: OrderType;
  createdAt: Date;
  symbol: string;
  buyOrderId: string;
  sellOrderId: string;
}

export interface OrderRecord {
  userId: string;
  orderId: string;
  side: Side;
  qty: number;
  filledQty: number;
  price: number | null;
  status: Status;
  symbol: string;
  fills: Fill[];

  createdAt: Date;
}

export interface RestingOrder {
  side: Side;
  qty: number;
  filledQty: number;
  userId: string;
  type: "limit";
  symbol: string;
  status: Status;
  orderId: string;
}

export interface OrderBook {
  bids: Record<number, RestingOrder[]>;
  asks: Record<number, RestingOrder[]>;
}

export interface DepthLevel {
  price: number;
  qty: number;
}

export interface CreateOrderInput {
  symbol: string;
  side: Side;
  type: OrderType;
  qty: number;
  price: number | null;
  userId: string;
}

export interface DepthResponse {
  symbol: string;
  asks: DepthLevel[];
  bids: DepthLevel[];
}

export const BALANCES = new Map<string, Record<string, Balance>>();

export const ORDERBOOKS = new Map<string, OrderBook>();
export const ORDERS = new Map<string, OrderRecord>();
export const FILLS: Fill[] = [];
