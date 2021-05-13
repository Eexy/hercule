import mongoose from 'mongoose';

const connect = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/hercule', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('connected to db');
  } catch (e) {
    console.log(e);
  }
};

connect();
