import { z } from 'zod';

export const purchaseSchema = z.object({
  body: z.object({
    planId: z.string().min(1, 'Plan ID is required'),
  }),
});

export const webhookSchema = z.object({
  body: z.object({
    subscriptionId: z.string().min(1, 'Subscription ID is required'),
    event: z.enum(['payment_success', 'payment_failed', 'subscription_cancelled']),
  }),
});
