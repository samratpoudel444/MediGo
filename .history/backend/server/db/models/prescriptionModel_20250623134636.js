import mongoose from "mongoose";


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
    unique: true,
  },
  publicId: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
});

const prescriptionTable = mongoose.model("prescription", prescriptionSchema);

export default prescriptionTable;
