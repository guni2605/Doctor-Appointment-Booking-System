import { v2 as cloudinary } from 'cloudinary';
const connectCloudinary = async ()=>{
  cloudinary.config({ 
    cloud_name: process.env.Cloudname, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET_KEY
});
}
export default connectCloudinary