import mongoose from "mongoose";
import { Schema } from "mongoose";

const locationSchema = new Schema(
    {

    },{timestamps: true}
)

export default  Location = mongoose.model("Location",locationSchema);