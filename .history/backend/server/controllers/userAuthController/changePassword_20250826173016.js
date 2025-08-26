import UserTable from "../../db/models/userModels.js";
import { verifyPassword } from "../utils/passwordValidation.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const changePassword = async (req, res, next) => {
  try {
    const validateData = await verifyPassword.validate(req.body, {
      abortEarly: false,
    });

    const id = req.user.id;
    if(!)

    const { previousPassword, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      console.log("hell")
      return next({
        code: 400,
        message: "Password and confirm password doesnot match",
      });
    }

    const user = await UserTable.findById(id);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch= await bcrypt.compare(previousPassword, user.password )

      if (!isMatch) {
        return res.status(400).json({ message: "Please provide correct old password" });
      } 
    
    const updatedPassword= await bcrypt.hash(newPassword, 10);

    const updateUser = await UserTable.updateOne(
      { _id: id },
      { $set: { password: updatedPassword }}
    );

    
    if (updateUser.modifiedCount === 0) {
      return res.status(400).json({ message: "Password update failed" });
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
