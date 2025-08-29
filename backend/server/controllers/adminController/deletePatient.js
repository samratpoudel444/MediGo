import mongoose from "mongoose";
import UserTable from "../../db/models/userModels.js";

export const deletePatient = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("deletePatient id param:", id);

    if (!id) {
      return next({ code: 400, message: "Patient ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next({ code: 400, message: "Invalid patient ID format" });
    }

    const data = await UserTable.findOne({ _id: id });
    if (!data) {
      return next({ code: 404, message: "Provided user does not exist" });
    }

    await UserTable.deleteOne({ _id: id });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    return next({ code: err.code || 500, message: "Internal Server error" });
  }
};
