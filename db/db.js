import mongoose from 'mongoose';
let isConnected = false;
const connectToMongoDB = async()=>{
  if (isConnected) return;
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("Connected to MongoDB");
  }catch(error){
    console.log("Error connecting to MongoDB", error.message);
  }
}
export default connectToMongoDB;