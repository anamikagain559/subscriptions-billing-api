import { Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import * as planService from '../services/plan.service';

export const createPlan = catchAsync(async (req: Request, res: Response) => {
  const plan = await planService.createPlan(req.body);
  res.status(201).send({
    success: true,
    message: "Plan created successfully",
    data: plan
  });
});

export const getPlans = catchAsync(async (req: Request, res: Response) => {
  const plans = await planService.getPlans();
  res.send(plans);
});
