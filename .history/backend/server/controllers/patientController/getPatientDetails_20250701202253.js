import UserTable from "../../db/models/userModels.js";

export const getMyDetails = async (req, res, next) => {
  const id = req.user.id;
  try {
    const data = await UserTable.findOne({ _id: id });
    if (!data) {
      return next({ code: 404, message: "Data not found" });
    }
    const { _id, password, __v, ...userData } = data.toObject();
    console.log
    return res.status(201).json({ message: userData });
  } catch (err) {
    console.log(err);
    return next({ code: 500, message: "Internal Server error" });
  }
};
