import UserTable from "../../db/models/userModels.js";

export const getPrescriptionsById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const patients = await UserTable.findOne({ _id: id, role: `Patient` });
    if (!patients) {
      return next({ code: 404, message: "Patient not found" });
    }

    return res.status(200).json({ message: patients });
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal server error",
    });
  }
};
