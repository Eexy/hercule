import mongoose, { Document, Schema } from 'mongoose';

export interface MessageDocument extends Document {
  user: {
    name: string;
    id: string;
    avatar: string;
  };
  channelId: mongoose.Types.ObjectId;
  content: string;
}

const MessageSchema = new Schema<MessageDocument>(
  {
    user: {
      name: String,
      id: String,
      avatar: String,
    },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Channel',
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Message = mongoose.model<MessageDocument>('Message', MessageSchema);

export default Message;
