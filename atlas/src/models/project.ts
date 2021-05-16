import mongoose, { Schema, Document } from 'mongoose';
import Channel from './channel';
import User from './user';

interface ProjectDocument extends Document {
  name: string;
  contributors: mongoose.Types.ObjectId[];
  owner: mongoose.Types.ObjectId;
  channelId: mongoose.Types.ObjectId;
  addContributor(userId: string): Promise<void>;
  removeContributor(userId: string): Promise<void>;
}

const ProjectSchema: Schema<ProjectDocument> = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    contributors: {
      type: [mongoose.Types.ObjectId],
      required: true,
      default: [],
    },
    channelId: {
      type: mongoose.Types.ObjectId,
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

ProjectSchema.pre('save', async function (next) {
  if (this.isModified('owner')) {
    this.contributors.push(this.owner);
  }

  if (this.isNew) {
    const channel = new Channel({ type: 1, recipients: [this.owner] });
    this.channelId = mongoose.Types.ObjectId(channel.id);
    await channel.save();
  }

  next();
});

ProjectSchema.pre('remove', async function (next) {
  const { contributors } = this;
  await Promise.all(
    contributors.map(async (contributor) => {
      const user = await User.findById(contributor.toString());

      if (user) {
        await user.removeProject(this.id);
      }
    })
  );

  await Channel.findByIdAndDelete(this.channelId);

  next();
});

ProjectSchema.methods.addContributor = async function (
  userId: string
): Promise<void> {
  const isContributor = this.contributors.find(
    (contributor) => contributor.toString() === userId
  );

  if (isContributor) {
    throw new Error("You can't join a project you have already join");
  }

  this.contributors.push(mongoose.Types.ObjectId(userId));
  await this.save();
};

ProjectSchema.methods.removeContributor = async function (
  userId: string
): Promise<void> {
  this.contributors = this.contributors.filter(
    (contributor) => contributor.toString() !== userId
  );

  await this.save();
};

const Project = mongoose.model<ProjectDocument>('Project', ProjectSchema);

export default Project;
