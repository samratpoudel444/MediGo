import UserTable from "../../db/models/userModels";
import { verifyPassword } from "../utils/passwordValidation";
import bcrypt from "bcrypt";

export const changePassword = async (req, res, next) => {
  try {
    const validateData = await verifyPassword.validate(req.body, {
      abortEarly: false,
    });

    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return next({
        code: 400,
        message: "Password and confirm password doesnot match",
      });
    }

    const updateUser = await UserTable.findOneAndUpdate(
      { email: email },
      { password: await bcrypt.hash(password, 10) }
    );

    if (!updateUser) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Password Update Sucessfull" });
  } catch (err) {
    console.log(err);
    return next({
      err: err.code || 500,
      message: err.message || "Internal Server error",
    });
  }
};
