import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`Database connected on ${connection.connection.host}`);
  } catch (error) {
    console.log('Database not Connected',  error);
    process.exit(1);
  }
};

export default ConnectDB
