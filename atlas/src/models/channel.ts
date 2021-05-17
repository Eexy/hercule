import mongoose, { Schema } from 'mongoose';
import Message, { MessageDocument } from './message';

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

ChannelSchema.pre('findOneAndDelete', async function (next) {
  const filters = this.getFilter();
  // eslint-disable-next-line no-underscore-dangle
  await Message.deleteMany({ channelId: filters._id });

  next(null);
});

const Channel = mongoose.model<ChannelDocument>('Channel', ChannelSchema);

export default Channel;
