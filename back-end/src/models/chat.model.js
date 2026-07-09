import mongoose from 'mongoose';

const { Schema } = mongoose;

const chatSchema = new Schema(
  {
    // Chat belongs to a single user (Perplexity-like: one user conversation)
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // Conversation title (optional)
    title: {
      type: String,
      trim: true,
    },

    // Latest message reference (optional)
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

chatSchema.index({ user: 1, title: 1 });

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;

