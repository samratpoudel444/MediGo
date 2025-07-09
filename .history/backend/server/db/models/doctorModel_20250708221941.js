import mongoose from "mongoose";
// import { date, string } from "yup";

const doctorSchema = new mongoose.Schema({
  userId: {
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
      "Internal Medicine",
      "Pediatrics",
      "Gynecology",
      "Orthopedics",
      "Neurology",
      "Oncology",
      "Others",
    ],
  },
  isApproved:
});

const DoctorTable = mongoose.model("doctor", doctorSchema);

export default DoctorTable;
