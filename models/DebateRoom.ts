import mongoose from 'mongoose';

const debateRoomSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  description: { type: String },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  teamA: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  teamB: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  mutedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  bannedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  moderators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const DebateRoom = mongoose.model('DebateRoom', debateRoomSchema);
