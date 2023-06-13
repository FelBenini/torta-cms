import mongoose from "mongoose";

const dbConnect = async () => {
  await mongoose.connect(process.env.CONNECTION_STRING as string);
  mongoose.connection.once('open', () => {
    console.log('MongoDB connected')
  })
}

export default dbConnect
