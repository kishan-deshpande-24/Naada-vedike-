import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Video or Post ID
  targetType: { type: String, enum: ['Video', 'Post'], required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Comment = mongoose.model('Comment', commentSchema);
