import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const driverSchema = new Schema({
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
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
        // this part is called the regex. The regex used is a general one for validating email format.
    },
    phoneNo: {
        type: Number,
        // required: true
        // match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"]
    },
    password: {
        type: String,
        required: true,
        select: false // Hide password field when querying users
    },
    socketId:{
        type: String
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default:"inactive"
    },
    vehicle: {
        color:{
            type: String,
            required: true,
            minlength: [3,'color must be atleast three character']
        },
        plate:{
            type: String,
            required: true,
            minlength: [8,'First name must be atleast three character']
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ["car","bike","auto"]
        },
        capacity:{
            type:Number,
            required: true,
            min: [1,"Capacity must be required"]
        }
    },
    location: {
        lat:{
            type: Number,
            // required: true
        },
        log:{
            type: Number,
            // required: true
        }
    },
    profilePicture: {
        type: String
    }
}, { timestamps: true })
// Methods for Driver

// Pre-save middleware: Auto-hash password before saving if modified
driverSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 8)
    next();
});

// Instance method: Check if the entered password matches the hashed password
driverSchema.methods.isPasswordCorrect = async function (inputPassword) {
    const isMatch = await bcrypt.compare(inputPassword, this.password)
    return isMatch
}

// Instance method: Generate JWT auth token 
driverSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET,{ expiresIn: '24h' })
    return token
}

// Static method: Manual password hashing (for special cases like manual updates)
driverSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const Driver = mongoose.model("Driver",driverSchema);
export default Driver;