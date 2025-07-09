import mongoose from "mongoose";
import DoctorTable from "../../db/models/doctorModel.js";
import UserTable from "../../db/models/userModels.js";

export const deleteDoctor = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next({ code: 400, message: "Invalid user ID format" });
    }

    const data = await UserTable.findOne({
      _id: id,
    });

    if (!data) {
      console.log("User not found");
      return next({ code: 404, message: "Provided user does not exist" });
    }

    await UserTable.deleteOne({ _id: id });
    await DoctorTable.deleteOne({ userId: id });

    return res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (err) {
    console.log(err);
    return next({ code: err.code || 500, message: "Internal Server Error" });
  }
};
//686df4ff1da09df81dc81b19
