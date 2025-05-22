import UserTable from "../../db/models/userModels";

export const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await UserTable.find({ role: `Doctor` });
    if (!doctors) {
      return next({ code: 404, message: "doctors not found" });
    }

    return res.status(200).json({ message: doctors });
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal server error",
    });
  }
};
