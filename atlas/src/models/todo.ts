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
    toObject: {
      virtuals: true,
      transform: (_, ret) => {
        const obj = ret;
        // eslint-disable-next-line no-underscore-dangle
        obj.id = ret._id;
        // eslint-disable-next-line no-underscore-dangle
        delete obj._id;
        return obj;
      },
    },
  }
);

const Todo: Model<TodoDocument> = mongoose.model('Todo', schema);

export default Todo;
