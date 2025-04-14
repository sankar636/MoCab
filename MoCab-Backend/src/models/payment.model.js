import mongoose from "mongoose";
import { Schema } from "mongoose";

const paymentSchema = new Schema(
    {

    },{timestamps: true}
)

export default  Payment = mongoose.model("Payment",paymentSchema);