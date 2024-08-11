import mongoose from "mongoose"

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    if (!process.env.MONGODB_URI) {
        throw new Error("No mongo uri")
    }
    if(isConnected){
        console.log("Already connected to MongoDB")
    }
    try {
        
    } catch (error) {

    }
}