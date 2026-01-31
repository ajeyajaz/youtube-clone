import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';


 // Configuration
export function configCloudinary(){
  cloudinary.config({ 
    cloud_name: process.env.CLODINARY_CLOUD_NAME, 
    api_key: process.env.CLODINARY_API_KEY, 
    api_secret: process.env.CLODINARY_API_SECRET_KEY 
  });
};
    

export async function uploadToCloudinary(filePath, options) {

  try{
    return await cloudinary.uploader.upload(filePath, {resource_type: 'auto', ...options});
  }
  catch(ex){
    console.log(ex)
    throw new Error('cloudinary: image/video upload failed');
  }
  finally{
    await fs.unlink(filePath).catch(()=> {});
  }
}

export async function  deleteFromCloudinary(public_id) {
    return await cloudinary.uploader.destroy(public_id);
}