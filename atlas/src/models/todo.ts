import mongoose, { Document, Model, Schema } from 'mongoose';

interface TodoDocument extends Document {
  id: string;
  desc: string;
  completed: boolean;
  project: string;
}

const schema: Schema = new Schema(
  {
    desc: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    project: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo: Model<TodoDocument> = mongoose.model('Todo', schema);

export default Todo;
