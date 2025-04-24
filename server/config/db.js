import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://ht934715:123@cluster0.j75kq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      
    );
    console.log(`MongoDB Connected: VoltAi`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
