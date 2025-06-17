import mongoose from "mongoose";
import { MONGO_URL } from "./serverConfig.js";

export default async function connectDB(){
    try{
        await mongoose.connect(MONGO_URL);
        console.log("Connected to db");
    } catch(error){
        console.log("Connection Failed\n",error);
    }
}