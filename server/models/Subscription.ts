import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const SubscriptionSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  plan: { type: String, enum: ['free','pro','enterprise'], default: 'free' },
  status: { type: String, enum: ['active','canceled','past_due','trialing'], default: 'active', index: true },
  meta: { type: Schema.Types.Mixed },
}, { timestamps: true });

export const Subscription = models.Subscription || model('Subscription', SubscriptionSchema);
