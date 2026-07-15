import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./config/env";

let server: any;

async function bootstrap() {
  try {
    await mongoose.connect(envVars.MONGODB_URL);
    console.log("🛢️ Connected to Database successfully");

    server = app.listen(envVars.PORT, () => {
      console.log(`🚀 Server is running on port ${envVars.PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to database:", err);
  }
}

bootstrap();

process.on("unhandledRejection", (err) => {
  console.log(`😈 unhandledRejection is detected, shutting down...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected, shutting down...`);
  process.exit(1);
});
