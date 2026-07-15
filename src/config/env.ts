import dotenv from "dotenv";
import { z } from "zod";

import path from "path";

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envSchema = z.object({
  PORT: z.string().default("5000"),
  MONGODB_URL: z.string().default("mongodb://localhost:27017/subscription-billing"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const _envVars = envSchema.safeParse(process.env);

if (!_envVars.success) {
  console.error("Invalid environment variables:", _envVars.error.format());
  process.exit(1);
}

export const envVars = _envVars.data;
