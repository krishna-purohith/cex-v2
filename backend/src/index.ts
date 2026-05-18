import express, { Request, Response, NextFunction } from "express";
import { appRouter } from "./routes";
import { env } from "./utils/env";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
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
