import { z } from 'zod';

export const createPlanSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    price: z.number().min(0, 'Price must be a positive number'),
    billingCycle: z.enum(['monthly', 'yearly']),
    level: z.number().int().positive('Level must be a positive integer'),
    features: z.array(z.string()).optional(),
  }),
});
