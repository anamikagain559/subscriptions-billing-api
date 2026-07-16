import { Router } from "express";
import authRoutes from "./auth.route";
import planRoutes from "./plan.route";
import subscriptionRoutes from "./subscription.route";
import webhookRoutes from "./webhook.route";

export const router = Router();

const moduleRoutes: { path: string; route: any }[] = [
  { path: "/auth", route: authRoutes },
  { path: "/plans", route: planRoutes },
  { path: "/subscriptions", route: subscriptionRoutes },
  { path: "/webhooks", route: webhookRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
