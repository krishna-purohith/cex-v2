import "dotenv/config";

function readRequiredEnv(name: string): string {
  console.log("name: ", name);

  const value = process.env[name];
  console.log("value: ", value);
  if (!value) throw new Error(`Missing required env variable: ${name}`);
  return value;
}

export const env = {
  redisUrl: readRequiredEnv("REDIS_URL"),
  incomingQueue: process.env.INCOMING_QUEUE ?? "backend-to-engine-broker",
};
