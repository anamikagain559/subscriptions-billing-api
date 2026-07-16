import { Subscription, ISubscription } from '../models/subscription.model';
import { Plan } from '../models/plan.model';
import { User } from '../models/user.model';
import { ApiError } from '../utils/ApiError';
import Stripe from 'stripe';
import { config } from '../config';

const stripe = new Stripe(config.stripe.secretKey as string, {
  apiVersion: '2026-04-22.dahlia',
});

export const purchaseSubscription = async (userId: string, planId: string): Promise<ISubscription> => {
  const newPlan = await Plan.findById(planId);
  if (!newPlan) {
    throw new ApiError(404, 'Plan not found');
  }

  // Check if user already has an active subscription
  const activeSubscription = await Subscription.findOne({ userId, status: 'active' }).populate('planId');

  if (activeSubscription) {
    const currentPlan = activeSubscription.planId as any;

    if (currentPlan._id.toString() === planId) {
      throw new ApiError(400, 'You already have this subscription active.');
    }

    if (newPlan.level <= currentPlan.level) {
      throw new ApiError(400, 'You cannot downgrade or purchase a same-level plan. Please wait for expiry.');
    }

    // It's an upgrade. Cancel old, create new.
    activeSubscription.status = 'cancelled';
    activeSubscription.autoRenew = false;
    await activeSubscription.save();
  }

  // Calculate expiry date
  const startDate = new Date();
  const expiryDate = new Date(startDate);
  if (newPlan.billingCycle === 'monthly') {
    expiryDate.setMonth(expiryDate.getMonth() + 1);
  } else {
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
  }

  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, 'User not found');

  // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    customer_email: user.email,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: { name: newPlan.name },
          unit_amount: Math.round(newPlan.price * 100), // Convert to cents
          recurring: { interval: newPlan.billingCycle === 'monthly' ? 'month' : 'year' },
        },
        quantity: 1,
      },
    ],
    success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:5173/cancel`,
    metadata: {
      userId: userId.toString(),
      planId: planId.toString(),
    },
  });

  const subscription = await Subscription.create({
    userId,
    planId,
    status: 'pending',
    startDate,
    expiryDate,
    autoRenew: true,
    stripeSessionId: session.id,
  });

  return { subscription, url: session.url } as any;
};

export const cancelSubscription = async (userId: string, subscriptionId: string): Promise<ISubscription> => {
  const subscription = await Subscription.findOne({ _id: subscriptionId, userId });
  if (!subscription) {
    throw new ApiError(404, 'Subscription not found');
  }
  
  subscription.autoRenew = false;
  subscription.status = 'cancelled';
  await subscription.save();

  return subscription;
};

export const getUserSubscription = async (userId: string): Promise<ISubscription | null> => {
  const subscription = await Subscription.findOne({ userId, status: 'active' }).populate('planId');
  
  if (subscription && subscription.expiryDate < new Date()) {
    subscription.status = 'expired';
    await subscription.save();
    return null;
  }
  
  return subscription;
};

export const getUserSubscriptionHistory = async (userId: string): Promise<ISubscription[]> => {
  return await Subscription.find({ userId }).populate('planId').sort({ createdAt: -1 });
};
