import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { purchaseSchema } from '../middlewares/validations/subscription.validation';
import * as subscriptionController from '../controllers/subscription.controller';
import { auth } from '../middlewares/auth';

const router = Router();

router.use(auth);

router.post('/purchase', validate(purchaseSchema), subscriptionController.purchase);
router.post('/:subscriptionId/cancel', subscriptionController.cancel);
router.get('/my', subscriptionController.mySubscription);

export default router;
