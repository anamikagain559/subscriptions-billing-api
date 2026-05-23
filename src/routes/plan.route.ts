import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { createPlanSchema } from '../middlewares/validations/plan.validation';
import * as planController from '../controllers/plan.controller';
import { auth } from '../middlewares/auth';

const router = Router();

router.post('/', auth, validate(createPlanSchema), planController.createPlan);
router.get('/', planController.getPlans);

export default router;
