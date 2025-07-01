import mongoose from "mongoose";

const pharmacySchema = new mongoose.Schema({
  pharmacyName: {
    type:String,
    required:true,
    tr
  },
  licenseNo: {},
  contactNo: {},
  email: {},
  longitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  latitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
});