import { verifyData } from "../utils/userValidation.js";
import UserTable from "../../db/models/userModels.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import DoctorTable from "../../db/models/doctorModel.js";

dotenv.config();

export const signUpUser = async (req, res, next) => {
  try {
    if (!req.body.role) {
      req.body.role = "Patient";
    }

    const validateUser = await verifyData.validate(req.body, {
      abortEarly: false,
    });
    const checkIfUserExist = await UserTable.findOne({
      email: validateUser.email,
    });
    if (checkIfUserExist) {
      return next({
        code: 409,
        message: "Provided email with user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(validateUser.password, 10);

    validateUser.password = hashedPassword;

    if (req.body.role === "Doctor") {
      const userId = newUser._id;

      const doctorData = {
        userId,
        specialistType: req.body.specialistType,
        licenseNo: req.body.licenseNo,
        degreeType: req.body.degreeType,
      };
       const newUser = await UserTable.create(validateUser);
      await DoctorTable.create(doctorData);
      return res
        .status(201)
        .json({ message: "Doctor account created sucessfully" });
    }

    return res.status(201).json({ message: "User created sucessfully" });
  } catch (err) {
    console.log(err);
    if (err.name === "ValidationError") {
      return next({ code: 400, message: err.errors });
    }

    return next({ code: 500, message: "Internal server error" });
  }
};
