import mongoose from "mongoose";
import { config } from "dotenv";

config();




const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB Connected`);
  } catch (error : any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;