import mongoose from "mongoose";
import { extraxtText } from "../../controllers/scanPrescriptionController/extractText";


const prescriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  imageUrl: {
    type: String,
    trim: true,
    required: true,
  },
  publicId: {
    type: String,
    trim: true,
    required: true,
  },
  extraxtText: {
    type: String,
    trim: true,
    required: true,
  },
});

const prescriptionTable = mongoose.model("prescription", prescriptionSchema);

export default prescriptionTable;
