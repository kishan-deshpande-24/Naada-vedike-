import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  url: { type: String, required: true },
  thumbnail: { type: String },
  category: { type: String },
  duration: { type: String },
  isPremiumOnly: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Song = mongoose.model('Song', songSchema);
