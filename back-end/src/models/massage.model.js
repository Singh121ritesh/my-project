import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    // The chat this message belongs to
    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
      required: true,
      index: true,
    },

    // Sender (user or assistant)
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    // Message text (for Perplexity-like prompts/responses)
    content: {
      type: String,
      required: true,
      trim: true,
    },

    // Role helps when you have a special assistant identity
    role: {
      type: String,
      enum: ['user', 'assistant'],
      default: 'user',
      index: true,
    },

    // Optional: store model/provider metadata
    metadata: {
      type: Schema.Types.Mixed,
    },

    // Optional: if you want to distinguish different answer types
    isError: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;

