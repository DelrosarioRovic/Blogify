import dotenv from "dotenv";
import mongoose, { MongooseOptions } from 'mongoose';
dotenv.config();


interface CustomMongooseOptions extends MongooseOptions {
  useNewUrlParser?: boolean;
}

async function connectToDatabase(): Promise<void> {
  const options: CustomMongooseOptions = {
    useNewUrlParser: true,
  };
  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.MONGO_DB_URI as string, options);
}

export default connectToDatabase;
