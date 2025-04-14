import mongoose from "mongoose";
import { Schema } from "mongoose";


const userSchema = new Schema({
    username: {
        type:String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['driver','passenger','admin'],
        default: 'passenger'
    },
    profilePicture: {
        type: String
    }
},{timestamps: true})

export default User = mongoose.model("User",userSchema);