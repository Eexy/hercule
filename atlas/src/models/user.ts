import mongoose, { Schema, Document, Model } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';
 
interface UserDocument extends Document {
  email: string;
  password: string;
}

interface UserModel extends Model<UserDocument> {}

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
          if(!isEmail(email)){
            throw new Error('Invalid email format');
          }
        }
      }
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function(next) {
  const user: UserDocument = this;

  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

const User = mongoose.model<UserDocument, UserModel>('User', UserSchema);

export default User;
