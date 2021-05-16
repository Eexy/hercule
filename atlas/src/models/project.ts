import mongoose, { Schema, Document, Model } from 'mongoose';
import Channel from './channel';
import User from './user';

interface ProjectDocument extends Document {
  name: string;
  contributors: mongoose.ObjectId[];
  owner: mongoose.ObjectId;
  channelId: mongoose.Types.ObjectId;
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

ProjectSchema.pre('save', async function(next){
  if(this.isModified('owner')){
    this.contributors.push(this.owner);
  }

  if(this.isNew){
    const channel = new Channel({type: 1});
    this.channelId = mongoose.Types.ObjectId(channel.id);
    await channel.save();
  }

  next();
})

interface ProjectModel extends Model<ProjectDocument> {
  findAndDelete(projectId: string, userId: string): void;
}

ProjectSchema.statics.findAndDelete = async (projectId = '', userId = '') => {
  // eslint-disable-next-line no-use-before-define
  const project = await Project.findById(projectId);

  if (!project) {
    throw new Error('Unable to find project to delete');
  }

  if (project.owner.toString() !== userId) {
    throw new Error("User isn't allowed to delete project");
  }
  const { contributors } = project;
  await Promise.all(
    contributors.map(async (contributor) => {
      const user = await User.findById(contributor.toString());

      if (user) {
        await user.removeProject(projectId);
      }
    })
  );

  await project.remove();
};

const Project = mongoose.model<ProjectDocument, ProjectModel>(
  'Project',
  ProjectSchema
);

export default Project;
