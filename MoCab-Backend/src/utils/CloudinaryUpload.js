import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

// comfiguration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:CLOUDINARY_API_SECRET
})
// upload images and video from local file (public/temp) to cloudinary 

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }
        const response =await cloudinary.uploader.upload(localFilePath,{
            folder:"MoCab_folder",resource_type:"auto"
        })
        console.log("File uploaded successfully on cloudinary",response.url);
        // After upload of file delete the file form local path
        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath)
        }        
    } catch (error) {
        console.log("Error in uploading the file", error);
        if(fs.existsSync(localFilePath)){
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
}

export { uploadOnCloudinary }