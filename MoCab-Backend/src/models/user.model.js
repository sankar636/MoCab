import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3,'First name must be atleast three character']
        },
        lastname: {
            type: String,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: Number,
        // required: true
    },
    password: {
        type: String,
        required: true,
        select: false // Hide password field when querying users
    },
    socketId:{
        type: String
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

// Pre-save middleware: Auto-hash password before saving if modified
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 8)
    next();
});

// Instance method: Check if the entered password matches the hashed password
userSchema.methods.isPasswordCorrect = async function (inputPassword) {
    const isMatch = await bcrypt.compare(inputPassword, this.password)
    return isMatch
}

// Instance method: Generate JWT auth token 
userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET,{ expiresIn: '24h' })
    return token
}

// Static method: Manual password hashing (for special cases like manual updates)
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const User = mongoose.model("User", userSchema);
export default User;