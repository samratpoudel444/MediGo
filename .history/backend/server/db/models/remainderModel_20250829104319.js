import mongoose from "mongoose";
// import { date, string } from "yup";

const remainderSchema = new mongoose.Schema({
  Email: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  licenseNo: {
    type: Number,
    maxLength: 10,
    trim: true,
    required: true,
    unique: true,
  },
  degreeType: {
    type: String,
    trim: true,
    required: true,
    enum: ["MBBS", "MD", "DM"],
  },
  specialistType: {
    type: String,
    required: true,
    trim: true,
    enum: [
      "General",
      "Surgery",
      "InternalMedicine",
      "Pediatrics",
      "Gynecology",
      "Orthopedics",
      "Neurology",
      "Oncology",
      "Others",
    ],
  },
  isApproved:{
    type:Boolean,
    default:false,
    required:true
  }
});

const RemainderTable = mongoose.model("remainder", remainderSchema);

export default RemainderTable;
