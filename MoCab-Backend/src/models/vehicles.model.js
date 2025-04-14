import mongoose from "mongoose";
import { Schema } from "mongoose";

const vehicleSchema = new Schema(
    {
        driverId: {
            type: Schema.Types.ObjectId,
            ref:"User"
        },
        maker: {
            type: String,
            required: true
        },
        model: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        licensePlate: {
            type: String,
            required: true
        },
        color: {
            type: String,
            enum:['white','black','red','brown','green','other']
        },
        vehicleType: {
            type:String,
            enum: ['diesel','petrol','EV','ethanol']
        },
        image: {
            type: String,
        }
    },{timestamps: true}
)

export default  Vehicle = mongoose.model("Vehicle",vehicleSchema);