import { Router } from 'express';
import { validate } from '../middlewares/validate';
import { webhookSchema } from '../middlewares/validations/subscription.validation';
import * as webhookController from '../controllers/webhook.controller';

const router = Router();

router.post('/', validate(webhookSchema), webhookController.handleWebhook);

export default router;
