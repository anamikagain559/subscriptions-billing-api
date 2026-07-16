import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("5000"),
  MONGODB_URL: z.string().default("mongodb+srv://anamikagain8:1xvOREUhSh2qWGyq@cluster0.o6amai6.mongodb.net/subscription_billing?retryWrites=true&w=majority&appName=Cluster0"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  JWT_SECRET: z.string().default("my_super_secret_subscription_jwt_key"),
});

const _envVars = envSchema.safeParse(process.env);

if (!_envVars.success) {
  console.error("Invalid environment variables:", _envVars.error.format());
  process.exit(1);
}

export const envVars = _envVars.data;
