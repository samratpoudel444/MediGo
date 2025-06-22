import UserTable from "../../db/models/userModels.js";
import otpGenerator from "otp-generator";

export default forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const checkUser= await UserTable.findOne({email:email})
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal server error",
    });
  }
};
