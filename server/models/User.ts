import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  company: { type: String, default: null, trim: true },
  passwordHash: { type: String, default: '' },
  provider: { type: String, enum: ['local', 'google', 'github'], default: 'local', index: true },
}, { timestamps: true });

export type UserDoc = {
  _id: any; id: string; name: string; email: string; company?: string | null; passwordHash?: string; provider: 'local'|'google'|'github';
  createdAt: Date; updatedAt: Date;
}

export const User = models.User || model('User', UserSchema);
