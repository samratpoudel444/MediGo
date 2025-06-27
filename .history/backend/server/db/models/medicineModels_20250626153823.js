import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: {
    type: string,
    required: true,
    trim: true,
  },
});

const medicineTable = mongoose.model("medicine", medicineSchema);