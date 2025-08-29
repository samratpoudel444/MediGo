import mongoose from "mongoose";
// import { date, string } from "yup";

const remainderSchema = new mongoose.Schema({
  Email: {
    required: true,
  },

  Title: {
    type: String,
        required: true,
  },
  Time: {
    type: String,
  },
  
});

const RemainderTable = mongoose.model("remainder", remainderSchema);

export default RemainderTable;
