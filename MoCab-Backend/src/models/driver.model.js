import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const driverSchema = new Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least three characters']
        },
        lastname: {
            type: String
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    phoneNo: {
        type: Number
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    socketId: {
        type: String
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, 'Color must be at least three characters']
        },
        plate: {
            type: String,
            required: true,
            minlength: [8, 'Plate must be at least eight characters']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ["car", "bike", "auto"]
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity is required"]
        }
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: false,
            default: undefined  // 👈 Prevents MongoDB errors if not set
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: false
        }
    },
    profilePicture: {
        type: String
    }
}, { timestamps: true });
// Methods for Driver
driverSchema.index({ location: "2dsphere" });
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
driverSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
    return token
}

// Static method: Manual password hashing (for special cases like manual updates)
driverSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
}
// 2dsphere index for geospatial queries
driverSchema.index({ location: "2dsphere" });


const Driver = mongoose.model("Driver", driverSchema);
export default Driver;