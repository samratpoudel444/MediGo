import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const connectDB = async () => {
  try {
    const URL = process.env.MONGO_DB_URL;
    await mongoose.connect(URL);
    console.log("Server to Database");
  } catch (error) {
    console.error("Connection failed");

    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
