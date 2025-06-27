import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
  name: {
    type: tring,
    required: true,
    trim: true,
  },
});

const medicineTable = mongoose.model("medicine", medicineSchema);

export default medicineTable;