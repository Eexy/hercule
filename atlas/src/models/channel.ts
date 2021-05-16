import mongoose, { Schema } from 'mongoose';

interface ChannelDocument extends Document {
  recipients: mongoose.ObjectId[];
  type: number;
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

const Channel = mongoose.model<ChannelDocument>('Channel', ChannelSchema);

export default Channel;
