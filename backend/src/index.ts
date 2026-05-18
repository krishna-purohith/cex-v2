import express, { Request, Response, NextFunction } from "express";
import { appRouter } from "./routes";
import { env } from "./utils/env";
import {
  connectRedis,
  listenForEngineResponse,
  pingRedis,
} from "./utils/engine-client";

await connectRedis();
void listenForEngineResponse();

const app = express();
app.use(express.json());

app.get("/health", async (req, res) => {
  try {
    await pingRedis();
    res.json({ ok: true });
  } catch (error) {
    res.status(503).json({ ok: false, error: "Redis unavailable" });
  }
});

app.use(appRouter);

app.use((err: unknown, _req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({
    error: err instanceof Error ? err.message : "Internal_server_error",
  });
});

app.listen(env.port, () => {
  console.log(`Backend running on http://localhost:${env.port}`);
  console.log(`Response queue: ${env.responseQueue}`);
});
