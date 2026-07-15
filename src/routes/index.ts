import { Router } from "express";

export const router = Router();

const moduleRoutes: { path: string; route: any }[] = [
  // { path: "/auth", route: AuthRoutes },
  // { path: "/users", route: UserRoutes },
  // { path: "/subscriptions", route: SubscriptionRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
