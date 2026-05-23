import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { ApiError } from '../utils/ApiError';
import { config } from '../config';
import { Subscription } from '../models/subscription.model';
import { logger } from '../config/logger';

export const handleWebhook = catchAsync(async (req: Request, res: Response) => {
  const webhookSecret = req.headers['x-webhook-secret'];

  if (webhookSecret !== config.webhook.secret) {
    throw new ApiError(403, 'Invalid webhook secret');
  }

  const { subscriptionId, event } = req.body;

  const subscription = await Subscription.findById(subscriptionId);
  if (!subscription) {
    throw new ApiError(404, 'Subscription not found');
  }

  logger.info(`Received webhook event: ${event} for subscription ${subscriptionId}`);

  switch (event) {
    case 'payment_success':
      subscription.status = 'active';
      // Assume extension by 1 month for this demo
      const expiryDate = new Date(subscription.expiryDate);
      expiryDate.setMonth(expiryDate.getMonth() + 1);
      subscription.expiryDate = expiryDate;
      break;
    case 'payment_failed':
      subscription.status = 'expired';
      subscription.autoRenew = false;
      break;
    case 'subscription_cancelled':
      subscription.status = 'cancelled';
      subscription.autoRenew = false;
      break;
    default:
      logger.warn(`Unhandled webhook event: ${event}`);
  }

  await subscription.save();

  res.send({ received: true });
});
