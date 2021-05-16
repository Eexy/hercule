import mongoose, { Schema, Document, Model } from 'mongoose';
import User from './user';

interface ProjectDocument extends Document {
  name: string;
  contributors: mongoose.ObjectId[];
  owner: mongoose.ObjectId;
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
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

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
  await Promise.all(contributors.map(async (contributor) => {
    const user = await User.findById(contributor.toString());

    if(user){
      await user.removeProject(projectId);
    }
  }));

  await project.remove();
};

const Project = mongoose.model<ProjectDocument, ProjectModel>(
  'Project',
  ProjectSchema
);

export default Project;
