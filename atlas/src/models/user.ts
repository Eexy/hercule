import mongoose, { Schema, Document, Model, LeanDocument } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';

export interface UserDocument extends Document {
  email: string;
  password: string;
  projects: mongoose.ObjectId[];
  removeProject(projectId: string): void;
}

const UserSchema: Schema<UserDocument> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (email: string): void => {
          if (!isEmail(email)) {
            throw new Error('Invalid email format');
          }
        },
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    projects: {
      type: [mongoose.Types.ObjectId],
      default: []
    }
  },
  { timestamps: true }
);

UserSchema.statics.findByCredentials = async (email = '', password = '') => {
  // eslint-disable-next-line no-use-before-define
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error(
      "Unable to find user, incorrect email or user doesn't exist"
    );
  }

  const match: boolean = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('incorrect password');
  }

  return user;
};

interface UserObject {
  email: string;
  password?: string;
  projects: LeanDocument<mongoose.ObjectId>[];
}

UserSchema.methods.toJSON = function (): UserObject {
  const userObject: UserObject = this.toObject();

  delete userObject.password;

  return userObject;
};

UserSchema.methods.removeProject = async function (projectId: string): Promise<void> {
  this.projects = this.projects.filter((project) => project.toString() !== projectId);

  await this.save();
}

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

interface UserModel extends Model<UserDocument> {
  findByCredentials(email: string, password: string): UserDocument;
}

const User = mongoose.model<UserDocument, UserModel>('User', UserSchema);

export default User;
