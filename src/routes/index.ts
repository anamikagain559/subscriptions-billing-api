import { Router } from 'express';
import authRoute from './auth.route';
import planRoute from './plan.route';
import subscriptionRoute from './subscription.route';
import webhookRoute from './webhook.route';

const router = Router();

router.use('/auth', authRoute);
router.use('/plans', planRoute);
router.use('/subscriptions', subscriptionRoute);
router.use('/webhook', webhookRoute);

export default router;
