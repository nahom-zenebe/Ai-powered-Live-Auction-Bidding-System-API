import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function  connectionDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("the mongodb is connected successfully!")

   
  } catch (error) {
   
    process.exit(1);
  }
}
