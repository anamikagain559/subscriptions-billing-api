import mongoose from 'mongoose';
import { envVars } from './config/env';
import { Plan } from './models/plan.model';

async function seedPlans() {
  try {
    await mongoose.connect(envVars.MONGODB_URL);
    console.log('Connected to DB...');

    await Plan.deleteMany({});
    console.log('Cleared existing plans.');

    const plans = [
      {
        name: 'Pro Monthly',
        price: 29,
        billingCycle: 'monthly' as const,
        features: ['Hourly API', '1,000 SMS', '5 Webhooks', '100k API Requests'],
        level: 2
      },
      {
        name: 'Pro Yearly',
        price: 276,
        billingCycle: 'yearly' as const,
        features: ['Hourly API', '1,000 SMS', '5 Webhooks', '100k API Requests'],
        level: 2
      },
      {
        name: 'Enterprise Monthly',
        price: 99,
        billingCycle: 'monthly' as const,
        features: ['Forestry AI', 'Unlimited SMS', 'Unlimited Webhooks', 'Unlimited API Requests'],
        level: 3
      },
      {
        name: 'Enterprise Yearly',
        price: 948,
        billingCycle: 'yearly' as const,
        features: ['Forestry AI', 'Unlimited SMS', 'Unlimited Webhooks', 'Unlimited API Requests'],
        level: 3
      }
    ];

    for (const p of plans) {
      await Plan.create(p);
      console.log(`Created plan: ${p.name}`);
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seedPlans();
