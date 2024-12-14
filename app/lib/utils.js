import mongoose from "mongoose";

const connection = {};

export const connectDB = async () => {
  try {
    if (connection.isConnected === 1) return;

    const db = await mongoose.connect(process.env.MONGO);
    connection.isConnected = db.connections[0].readyState;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Error connecting to MongoDB", error);
  }
};

// mongodb+srv://root:root@bookstore.0l1jl.mongodb.net/admindashboard?retryWrites=true&w=majority
// mongodb://localhost:27017/admindashboard
