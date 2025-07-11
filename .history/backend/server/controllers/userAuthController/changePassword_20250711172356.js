import UserTable from "../../db/models/userModels.js";
import { verifyPassword } from "../utils/passwordValidation.js";
import bcrypt from "bcrypt";

export const changePassword = async (req, res, next) => {
  try {
    const validateData = await verifyPassword.validate(req.body, {
      abortEarly: false,
    });

    const id = req.user.id;
    const { previousPassword, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      console.log("hell")
      return next({
        code: 400,
        message: "Password and confirm password doesnot match",
      });
    }

    const updateUser = await UserTable.findById(
      { _id: id },
    );

    if (!updateUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatc


    return res.status(200).json({ message: "Password Update Sucessfull" });
  } catch (err) {
    console.log(err);
    return next({
      err: err.code || 500,
      message: err.message || "Internal Server error",
    });
  }
};
