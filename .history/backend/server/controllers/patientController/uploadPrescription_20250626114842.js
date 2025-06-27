import Jimp from "jimp";
import fs from "fs";
import path from "path";
import prescriptionTable from "../../db/models/prescriptionModel.js";
import cloudinary from "../../helper/cloudinaryHelper.js";

export const uploadPrescription = async (req, res, next) => {
  try {
    const userId = req.user;

    if (!req.file) {
      return next({ code: 400, message: "No image is uploaded" });
    }

    const originalPath = req.file.path;
    const scannedPath = `uploads/scanned_${req.file.filename}`;

    // 1. Process image with Jimp
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
      .writeAsync(scannedPath); // save processed image

    // 2. Upload the processed image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(scannedPath, {
      folder: "prescription",
      public_id: `Prescription-${Date.now()}`,
    });

    // 3. Clean up local files (original + processed)
    fs.unlinkSync(originalPath);
    fs.unlinkSync(scannedPath);

    // 4. Store in DB
    const data = {
      userId: userId,
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    };

    const upload = await prescriptionTable.insertOne(data);

    return res.status(201).json({
      message: "Scanned image upload successful",
      imageUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });
  } catch (err) {
    console.error("❌ Error during image upload", err);
    return next({ code: 500, message: "Internal Server Error" });
  }
};
