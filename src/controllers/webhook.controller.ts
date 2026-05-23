import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { config } from '../config';
import { Subscription } from '../models/subscription.model';
import { logger } from '../config/logger';
import Stripe from 'stripe';

const stripe = new Stripe(config.stripe.secretKey as string, {
  apiVersion: '2026-04-22.dahlia',
});

export const handleWebhook = catchAsync(async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];

  let event: any;

  try {
    event = stripe.webhooks.constructEvent(
      req.body, // Must be raw body
      sig as string,
      config.stripe.webhookSecret as string
    );
  } catch (err: any) {
    logger.error(`Webhook signature verification failed: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  logger.info(`Received Stripe webhook event: ${event.type}`);

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as any;
      
      // We retrieve the subscription using the metadata or stripeSessionId
      const subscription = await Subscription.findOne({ stripeSessionId: session.id });
      if (subscription) {
        subscription.status = 'active';
        subscription.stripeSubscriptionId = session.subscription as string;
        await subscription.save();
        logger.info(`Subscription ${subscription._id} activated.`);
      }
      break;
    }
    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as any;
      const subscription = await Subscription.findOne({ stripeSubscriptionId: invoice.subscription as string });
      if (subscription) {
        // Extend expiry date based on plan (simplified)
        const expiryDate = new Date(subscription.expiryDate);
        expiryDate.setMonth(expiryDate.getMonth() + 1);
        subscription.expiryDate = expiryDate;
        await subscription.save();
      }
      break;
    }
    case 'invoice.payment_failed':
    case 'customer.subscription.deleted': {
      const stripeObj = event.data.object as any;
      const subscriptionId = stripeObj.subscription || stripeObj.id;
      const subscription = await Subscription.findOne({ stripeSubscriptionId: subscriptionId as string });
      if (subscription) {
        subscription.status = event.type === 'invoice.payment_failed' ? 'expired' : 'cancelled';
        subscription.autoRenew = false;
        await subscription.save();
      }
      break;
    }
    default:
      logger.warn(`Unhandled webhook event: ${event.type}`);
  }

  res.json({ received: true });
});
