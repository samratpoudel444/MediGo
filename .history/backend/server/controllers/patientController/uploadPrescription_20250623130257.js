import prescriptionTable from "../../db/models/prescriptionModel.js";
import cloudinary from "../../helper/cloudinaryHelper.js";
import fs from "fs";

export const uploadPrescription= async(req, res, next)=>
{
    try{
      const userId=""

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
          userId: "6831634d331abbdecca0b78f",
          imageUrl: uploadResult.secure_url,
          publicId: uploadResult.public_id,
        };

        const upload= await prescriptionTable.in
        
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
        console.log("The error is",err);
        return next({code:500, message:"Internal Server error"});
    }
}