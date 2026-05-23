import { Plan, IPlan } from '../models/plan.model';
import { ApiError } from '../utils/ApiError';

export const createPlan = async (body: any): Promise<IPlan> => {
  if (await Plan.findOne({ name: body.name })) {
    throw new ApiError(400, 'Plan with this name already exists');
  }
  return Plan.create(body);
};

export const getPlans = async (): Promise<IPlan[]> => {
  return Plan.find().sort({ level: 1 });
};

export const getPlanById = async (id: string): Promise<IPlan | null> => {
  return Plan.findById(id);
};
