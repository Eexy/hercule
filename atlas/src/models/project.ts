import mongoose, { Schema, Document } from 'mongoose';

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
    },
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model<ProjectDocument>('Project', ProjectSchema);

export default Project;
