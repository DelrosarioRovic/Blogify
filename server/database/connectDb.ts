import mongoose, { MongooseOptions } from 'mongoose';

interface CustomMongooseOptions extends MongooseOptions {
  useNewUrlParser?: boolean;
}

async function connectToDatabase(): Promise<void> {
  const options: CustomMongooseOptions = {
    useNewUrlParser: true,
  };
  mongoose.set('strictQuery', false);
  await mongoose.connect('mongodb://127.0.0.1:27017/blogify', options);
}

export default connectToDatabase;
