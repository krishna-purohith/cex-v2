import "dotenv/config";

function readRequireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env variable: ${name}`);
  return value;
}

export const env = {
  port: process.env.PORT ?? "3000",
  redisURL: readRequireEnv("REDIS_URL"),
  jwtSecret: readRequireEnv("JWT_SECRET"),
  incomingQueue: process.env.INCOMING_QUEUE ?? "backend-to-engine-broker",
  responseQueue: `response-queue-${
    process.env.BACKEND_QUEUE_ID ?? crypto.randomUUID()
  }`,
  engineTimeoutMs: Number(process.env.ENGINE_TIMEOUT_MS ?? "30000"),
};
