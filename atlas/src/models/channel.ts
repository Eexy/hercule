import mongoose, { Schema } from 'mongoose';
import {MessageDocument} from './message';

interface ChannelDocument extends Document {
  recipients: mongoose.Types.ObjectId[];
  type: number;
  messages: MessageDocument[];
  addRecipient(userId: string): void;
}

const ChannelSchema: Schema<ChannelDocument> = new Schema(
  {
    type: {
      type: Number,
      required: true,
    },
    recipients: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
  },
  { timestamps: true }
);

ChannelSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'channelId',
});

const Channel = mongoose.model<ChannelDocument>('Channel', ChannelSchema);

export default Channel;
