import { v2 as cloudinary } from 'cloudinary';


 // Configuration
export function configCloudinary(){
    cloudinary.config({ 
        cloud_name: process.env.CLODINARY_CLOUD_NAME, 
        api_key: process.env.CLODINARY_API_KEY, 
        api_secret: process.env.CLODINARY_API_SECRET_KEY 
});
}
    

export async function uploadToCloudinary(filePath) {

  try{
    const { secure_url } = await cloudinary.uploader.upload(filePath, {resource_type:'auto'});
    return secure_url;
  }
  catch(ex){
    console.log('unable to upload an image', ex);
  }
}