import mongoose from "mongoose";
import { Schema } from "mongoose";

const notificationSchema = new Schema(
    {

    },{timestamps: true}
)

export default  Notification = mongoose.model("Notification",notificationSchema);