import mongoose from "mongoose";

const pharmacySchema = new mongoose.Schema({
  pharmacyName: {
    type: String,
    required: true,
    trim: true,
  },
  licenseNo: {
    type: Number,
    required: true,
    trim: true,
  },

  contactNo: {
    type: Number,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
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
  isAp
});


const PharmacyTable= mongoose.model("pharmacy", pharmacySchema )


export default PharmacyTable;
