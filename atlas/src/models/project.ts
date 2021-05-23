import mongoose, { Schema, Document } from 'mongoose';
import Channel from './channel';

interface ProjectDocument extends Document {
  name: string;
  contributors: string[];
  owner: string;
  channelId: mongoose.Types.ObjectId;
  githubId: string;
  githubUrl: string;
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
      type: [String],
      required: true,
      default: [],
    },
    githubId: {
      type: String,
      required: true,
    },
    githubUrl: {
      type: String,
      required: true,
    },
    channelId: {
      type: mongoose.Types.ObjectId,
    },
    owner: {
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
  await Channel.findByIdAndDelete(this.channelId);

  next();
});

ProjectSchema.methods.addContributor = async function (
  userId: string
): Promise<void> {
  const isContributor = this.contributors.find(
    (contributor: string) => contributor === userId
  );

  if (isContributor) {
    throw new Error("You can't join a project you have already join");
  }

  this.contributors.push(userId);

  const channel = await Channel.findById(this.channelId);

  if (!channel) {
    throw new Error("Unnable to join project's channel");
  }

  channel.recipients.push(userId);
  await channel.save();
  await this.save();
};

ProjectSchema.methods.removeContributor = async function (
  userId: string
): Promise<void> {
  this.contributors = this.contributors.filter(
    (contributor: string) => contributor !== userId
  );

  await this.save();
};

const Project = mongoose.model<ProjectDocument>('Project', ProjectSchema);

export default Project;
