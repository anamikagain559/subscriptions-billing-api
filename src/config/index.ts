import dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoose: {
    url: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/subscription_billing',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'my_super_secret_subscription_jwt_key',
    accessExpirationMinutes: Number(process.env.JWT_ACCESS_EXPIRATION_MINUTES || 60),
    refreshExpirationDays: Number(process.env.JWT_REFRESH_EXPIRATION_DAYS || 30),
  },
  webhook: {
    secret: process.env.WEBHOOK_SECRET || 'webhook_secret_key',
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY || 'your_stripe_secret',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'your_webhook_secret',
  }
};
