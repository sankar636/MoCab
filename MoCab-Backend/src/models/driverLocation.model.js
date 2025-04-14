import mongoose from "mongoose";
import { Schema } from "mongoose";

const driverLocationSchema = new Schema(
    {

    },{timestamps: true}
)

export default  DriverLocation = mongoose.model("DriverLocation",driverLocationSchema);