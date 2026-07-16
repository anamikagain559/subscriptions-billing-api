import cors from "cors";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { globalErrorHandler } from "./modules/middlewares/globalErrorHandler";
import notFound from "./modules/middlewares/notFound";
import { router } from "./routes";
import { envVars } from "./config/env";

const app = express();

// Connect to MongoDB for Serverless (Vercel)
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(envVars.MONGODB_URL);
    console.log("🛢️ Connected to Database (Serverless)");
  } catch (err) {
    console.error("Failed to connect to database:", err);
  }
};

app.use(express.json());

// Ensure DB is connected before handling any requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use(
  cors({
    origin: ["https://weather-ai-app-eta.vercel.app", "http://localhost:5173", "http://localhost:3000", "http://localhost:5000"],
    credentials: true,
  })
);

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Subscription Billing API"
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
