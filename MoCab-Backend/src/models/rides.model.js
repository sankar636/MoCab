import mongoose from "mongoose";
import { Schema } from "mongoose";

const ridesSchema = new Schema(
    {
        passengerId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        driverId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        pickupLocation: {
            type: {
                type: String,
                enum: ['Point'],  // Must be 'Point' for GeoJSON
                default: 'Point'
            },
            coordinates: {
                type: [Number],  // Format: [longitude, latitude]
                required: true
            }
        },
        dropOffLocation: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                type: [Number],
                required: true
            }
        },
        status: {
            type: String,
            enum: ['completed','requested','accepted','in-processed','cancelled']
        },
        fare: {
            type: Number
        },
        distance: {   // In kiloMeter
            type: Number
        },
        duration: {
            type: Number // in minutes
        }
    }, { timestamps: true }
)

ridesSchema.index({ pickupLocation: "2dsphere" });
ridesSchema.index({ dropOffLocation: "2dsphere" });

export default Rides = mongoose.model("Rides", ridesSchema);


// Important --> GeoJSON
//"This field contains GeoJSON data that represents a point on Earth. Optimize queries for real-world spherical geometry."