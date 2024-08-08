import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
   await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
   console.log("MongoDB Connected...")

    } catch(error) {
        console.log("mongodb connection ", error)
        throw err
    }
}

export default connectDB;