import Jimp from "jimp";
import fs from "fs";
import path from "path";
import prescriptionTable from "../../db/models/prescriptionModel.js";
import cloudinary from "../../helper/cloudinaryHelper.js";
import { scanText } from "./ocrTest.js";


export const uploadPrescription = async (req, res, next) => {
  try {
    
    const userId = "6853af6a400c0e8a1a7b161c"; ;

    if (!req.file) {
      return next({ code: 400, message: "No image is uploaded" });
    }

    const originalPath = req.file.path;
    const scannedPath = `uploads/scanned_${req.file.filename}`;

    const image = await Jimp.read(originalPath);
    await image
      .resize(800, Jimp.AUTO)
      .grayscale()
      .contrast(0.5)
      .brightness(0.1)
      .convolute([
        [0, -1, 0],
        [-1, 5, -1],
        [0, -1, 0],
      ])
      .threshold({ max: 200 })
      .quality(80)
      .writeAsync(scannedPath); 

    const uploadResult = await cloudinary.uploader.upload(scannedPath, {
      folder: "prescription",
      public_id: `Prescription-${Date.now()}`,
    });


    fs.unlinkSync(originalPath);
    fs.unlinkSync(scannedPath);

    const data = {
      userId: userId,
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };

    const upload = await prescriptionTable.insertOne(data);
    const result= await scanText(data.imageUrl);

    
    return res.status(201).json()



    
  } catch (err) {
    console.error(" Error during image upload", err);
    return next({ code: 500, message: "Internal Server Error" });
  }
};
