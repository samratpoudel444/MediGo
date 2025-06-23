import prescriptionTable from "../../db/models/prescriptionModel.js";
import cloudinary from "../../helper/cloudinaryHelper.js";
import fs from "fs";

export const uploadPrescription= async(req, res, next)=>
{
    try{
         console.log("l xa");
        console.log(req.file)
        if(!req.file)
            {
                return next({code:400, message:"No image is Uploaded"});
            }
         const uploadResult = await cloudinary.uploader
           .upload(req.file.path, {
            folder: "prescription",
             public_id: `Prescription ${Date.now()}`,
           })
          fs.unlinkSync(req.file.path);

        const data = {
          user: "6831634d331abbdecca0b78f",
          imageUrl: uploadResult.secure_url,
          publicId: uploadResult.public_id,
        };
        
        return res
          .status(201)
          .json({
            message: "File upload sucessful",
            imageUrl: uploadResult.secure_url,
            publicId: uploadResult.public_id,
          });

      
    }
    catch(err)
    {
        console.log(""err);
        return next({code:500, message:"Internal Server error"});
    }
}