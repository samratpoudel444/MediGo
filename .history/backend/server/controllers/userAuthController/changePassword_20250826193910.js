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

    let id;
    if(req.user)
    {
      id = req.user.id;
    }
     let email= null;
    if(!id)
    {
       email= req.body.email;
      console.log(id)
    }

    const { previousPassword, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
      return next({
        code: 400,
        message: "Password and confirm password doesnot match",
      });
    }

    if(id)
    {
  const user = await UserTable.findById(id);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
    const isMatch = await bcrypt.compare(previousPassword, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Please provide correct old password" });
    }

    const updatedPassword = await bcrypt.hash(newPassword, 10);

    const updateUser = await UserTable.updateOne(
      { _id: id },
      { $set: { password: updatedPassword } }
    );

    if (updateUser.modifiedCount === 0) {
      return res.status(400).json({ message: "Password update failed" });
    }

    return res.status(200).json({ message: "Password Update Sucessfull" });
    }

    if(email)
    {
      const users = await UserTable.findOne({ email: email });

      if(!users)
      {
         return res.status(404).json({ message: "User Not found" });
      }

       if (newPassword !== confirmPassword) {
      return next({
        code: 400,
        message: "Password and confirm password doesnot match",
      })
    }
    const updatedPassword = await bcrypt.hash(newPassword, 10);
     const updateUsers = await UserTable.updateOne(
       { _id: id },
       { $set: { password: updatedPassword } }
     );

     if (updateUsers.modifiedCount === 0) {
       return res.status(400).json({ message: "Password update failed" });
     }

     return res.status(200).json({ message: "Password reset Sucessfull" });


       
      }

  

   } catch (err) {
    console.log(err);
    return next({
      err: err.code || 500,
      message: err.message || "Internal Server error",
    });
  }
};
