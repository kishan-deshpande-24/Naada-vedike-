import mongoose from 'mongoose';

const startupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  founder: { type: String, required: true },
  district: { type: String, required: true },
  description: { type: String, required: true },
  website: { type: String },
  contact: { type: String },
  category: { type: String },
  isApproved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Startup = mongoose.model('Startup', startupSchema);
