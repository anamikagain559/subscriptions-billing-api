import mongoose, { Document, Types } from 'mongoose';

export interface ISubscription extends Document {
  userId: Types.ObjectId;
  planId: Types.ObjectId;
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  expiryDate: Date;
  autoRenew: boolean;
}

const subscriptionSchema = new mongoose.Schema<ISubscription>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
    status: { type: String, enum: ['active', 'cancelled', 'expired'], default: 'active' },
    startDate: { type: Date, required: true, default: Date.now },
    expiryDate: { type: Date, required: true },
    autoRenew: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model<ISubscription>('Subscription', subscriptionSchema);
