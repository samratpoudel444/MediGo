import mongoose from "mongoose";
// import { number } from "yup";

 const userSchema = new mongoose.Schema({
   email: {
     type: String,
     required: true,
     trim: true,
     maxlength: 100,
     lowercase: true,
     unique: true, //index
   },
   password: {
     type: String,
     required: true,
     trim: true,
   },
   firstName: {
     type: String,
     required: true,
     trim: true,
     maxlength: 100,
   },
   lastName: {
     type: String,
     required: true,
     trim: true,
     maxlength: 100,
   },
   dob: {
     type: Date,
     max: Date.now(),
     required: false,
   },
   gender: {
     type: String,
     trim: true,
     required: true,
     enum: ["male", "female", "other"],
   },
   role: {
     type: String,
     required: true,
     trim: true,
     enum: ["Patient", "Admin", "Doctor"],
   },
   address: {
     type: String,
     required: true,
     trim: true,
     maxlength: 255,
   },
   lognitude: {
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

const UserTable = mongoose.model('User', userSchema);

export default UserTable;