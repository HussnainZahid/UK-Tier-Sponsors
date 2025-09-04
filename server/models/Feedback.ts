import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const FeedbackSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  email: { type: String, required: false, lowercase: true, trim: true },
  message: { type: String, required: true, trim: true, maxlength: 5000 },
  rating: { type: Number, min: 1, max: 5, required: false },
  page: { type: String, required: false, trim: true },
}, { timestamps: true });

export const Feedback = models.Feedback || model('Feedback', FeedbackSchema);
