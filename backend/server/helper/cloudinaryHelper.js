import {v2 as cloudinary} from 'cloudinary';



  cloudinary.config({
    cloud_name: process.env.cloudinaryCloudName,
    api_key: process.env.cloudinaryAPIKey,
    api_secret: process.env.cloudinaryAPISecret,
  });

export default cloudinary;
