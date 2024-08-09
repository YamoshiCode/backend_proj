import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from "fs"

dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

const uploadCloudinary = async ( filePath ) => {
try {
    if(!filePath) return null
const response = await cloudinary.uploader.upload(
    filePath , {
        resource_type: 'auto',
    }
)
console.log("file has been uploaded on cloudinary : ", response.url)
return response


}catch(error){
    console.log(error);
    fs.unlinkSync(filePath) 
    return null
}
};

export {uploadCloudinary};