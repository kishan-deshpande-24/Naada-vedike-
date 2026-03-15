import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'creator', 'admin'], default: 'user' },
  isPremium: { type: Boolean, default: false },
  subscriptionId: { type: String },
  savedSongs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  followedCreators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model('User', userSchema);
