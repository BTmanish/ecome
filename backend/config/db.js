import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Use MONGO_URL as per your .env file
    const mongoURI = process.env.MONGO_URL;
    
    if (!mongoURI) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }
    
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    // Don't exit on error in production, just log
    if (process.env.NODE_ENV === 'development') {
      process.exit(1);
    }
  }
};

export default connectDB;