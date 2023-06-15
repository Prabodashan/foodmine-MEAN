import { connect } from "mongoose";

export const dbConnect = async () => {
  try {
    const conn = await connect(process.env.MONGO_URL!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
