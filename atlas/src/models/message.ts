import mongoose, { Document, Schema } from 'mongoose';

interface MessageDocument extends Document {
  senderId: mongoose.Types.ObjectId;
  channelId: mongoose.Types.ObjectId;
  content: string;
}

const MessageSchema = new Schema<MessageDocument>(
  {
    senderId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    channelId: {
      type: mongoose.Types.ObjectId,
      required: true,
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
