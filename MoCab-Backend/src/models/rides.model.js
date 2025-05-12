import mongoose from "mongoose";
import { Schema } from "mongoose";

const ridesSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        driverId: {
            type: Schema.Types.ObjectId,
            ref: "Driver"
        },
        pickupLocation: {
            type: String,
            required: true
        },
        destinationLocation: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'in-processed', 'completed', 'cancelled'],
            default: 'pending',
        },
        fare: {
            type: Number,
            required: true
        },
        distance: {   // In kiloMeter
            type: Number
        },
        duration: {
            type: Number // in minutes
        },
        paymentID: {
            type: String,
        },
        orderId: {
            type: String,
        },
        signature: {
            type: String,
        },

        otp: {
            type: String,
            select: false,
            required: true,
        }
    }, { timestamps: true }
)

const Rides = mongoose.model("Rides", ridesSchema)

export default Rides

// Important --> GeoJSON
//"This field contains GeoJSON data that represents a point on Earth. Optimize queries for real-world spherical geometry."