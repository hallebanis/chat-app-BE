import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('DB connected !!');
    } catch (error) {
        console.error('Error connection ', error);
    }
}

export { connectDb }