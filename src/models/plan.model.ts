import mongoose, { Document } from 'mongoose';

export interface IPlan extends Document {
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  level: number;
  features: string[];
}

const planSchema = new mongoose.Schema<IPlan>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    billingCycle: { type: String, enum: ['monthly', 'yearly'], default: 'monthly' },
    level: { type: Number, required: true }, // e.g. 1 for Basic, 2 for Pro (used for upgrade logic)
    features: [{ type: String }],
  },
  { timestamps: true }
);

export const Plan = mongoose.model<IPlan>('Plan', planSchema);
