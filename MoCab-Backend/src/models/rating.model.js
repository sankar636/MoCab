import mongoose from "mongoose";
import { Schema } from "mongoose";

const ratingSchema = new Schema(
    {

    },{timestamps: true}
)

export default  Rating = mongoose.model("Rating",ratingSchema);