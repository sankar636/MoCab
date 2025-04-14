import mongoose from "mongoose"
import { DB_NAME } from '../constants.js'

const connectDataBase = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${DB_NAME}`)
        console.log(`mongodb connected !! DB HOST: ${connectionInstance.connection.host}`);

        console.log(`✅ MongoDB connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Error while connect to mongoDB", error);
        process.exit(1)
    }
}

export default connectDataBase