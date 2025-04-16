import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

// comfiguration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:CLOUDINARY_API_SECRET
})
// upload images and video from local file (public/temp) to cloudinary 
