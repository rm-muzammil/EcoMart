import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error("MongoDB_URI error");
}
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log("mongodb connection error", error);
    process.exit(1);
  }
}
export default connectToDB;
