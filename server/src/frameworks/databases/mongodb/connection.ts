import mongoose from "mongoose";
import ENVIRONMENT_VARIABLES from "../../../config";
mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL||ENVIRONMENT_VARIABLES.DB_URL, {
      dbName: process.env.DB_NAME||ENVIRONMENT_VARIABLES.DB_NAME,
    });
    console.log(`Database connected successfully`.bgGreen.bold);
  } catch (error: any) {
    process.exit(1);
  }
};
export default connectDB;