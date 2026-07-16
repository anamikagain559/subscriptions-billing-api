import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import * as subscriptionService from '../services/subscription.service';
import { AuthRequest } from '../middlewares/auth';

export const purchase = catchAsync(async (req: AuthRequest, res: Response) => {
  const subscription = await subscriptionService.purchaseSubscription(req.user._id as string, req.body.planId);
  res.status(201).send(subscription);
});

export const cancel = catchAsync(async (req: AuthRequest, res: Response) => {
  const subscription = await subscriptionService.cancelSubscription(req.user._id as string, req.params.subscriptionId as string);
  res.send(subscription);
});

export const mySubscription = catchAsync(async (req: AuthRequest, res: Response) => {
  const subscription = await subscriptionService.getUserSubscription(req.user._id as string);
  res.send({ activeSubscription: subscription });
});

export const history = catchAsync(async (req: AuthRequest, res: Response) => {
  const history = await subscriptionService.getUserSubscriptionHistory(req.user._id as string);
  res.send(history);
});
