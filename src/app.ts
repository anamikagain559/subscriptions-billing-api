import cors from "cors";
import express, { Request, Response } from "express";
import { globalErrorHandler } from "./modules/middlewares/globalErrorHandler";
import notFound from "./modules/middlewares/notFound";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: true, // Allow any origin
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
