import { Subscription, ISubscription } from '../models/subscription.model';
import { Plan } from '../models/plan.model';
import { ApiError } from '../utils/ApiError';

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

  const subscription = await Subscription.create({
    userId,
    planId,
    status: 'active',
    startDate,
    expiryDate,
    autoRenew: true,
  });

  return subscription;
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
