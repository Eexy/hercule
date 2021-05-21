import mongoose, { Document, Schema } from 'mongoose';

export interface MessageDocument extends Document {
  senderId: string;
  channelId: mongoose.Types.ObjectId;
  content: string;
}

const MessageSchema = new Schema<MessageDocument>(
  {
    senderId: {
      type: String,
      required: true,
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
  { timestamps: true }
);

const Message = mongoose.model<MessageDocument>('Message', MessageSchema);

export default Message;
