import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username: {
        type: String,
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
        enum: ['driver', 'passenger', 'admin'],
        default: 'passenger'
    },
    profilePicture: {
        type: String
    }
}, { timestamps: true })

// It Securely store hashed passwords before saving users.
userSchema.pre('save',async function (next) {
    if(!this.isModified("password")){
        return next()
    }
    this.password = await bcrypt.hash(this.password, 8)
    next();
});
// Method to check password is correct or not(ex- at the time of login of the user it need to check the password)
userSchema.methods.isPasswordCorrect = async function(inputPassword){
    const isMatch = await bcrypt.compare(inputPassword,this.password)
    return isMatch
}


export default User = mongoose.model("User", userSchema);