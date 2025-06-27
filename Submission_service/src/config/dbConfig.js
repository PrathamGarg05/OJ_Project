import mongoose from "mongoose";
import { MONGO_URL } from "./serverConfig.js";

export const connectDB = async() => {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to db");
};