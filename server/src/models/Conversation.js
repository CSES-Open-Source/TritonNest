import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
    lastMessageAt: Date,
  },
  { timestamps: true },
);

conversationSchema.index({ participants: 1 });

export const Conversation = mongoose.model('Conversation', conversationSchema);
