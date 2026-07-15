import cors from "cors";
import express, { Request, Response } from "express";
import { globalErrorHandler } from "./modules/middlewares/globalErrorHandler";
import notFound from "./modules/middlewares/notFound";
import { router } from "./routes";

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
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
