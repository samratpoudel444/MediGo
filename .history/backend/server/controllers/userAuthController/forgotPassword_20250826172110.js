import UserTable from "../../db/models/userModels.js";
import otpGenerator from "otp-generator";
import sendMailToUser from "../../helper/nodeMailerHelper.js";
import RedisClient from "../../helper/redisHelper.js";

const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const checkUser= await UserTable.findOne({email:email});
    if(!checkUser || checkUser.length === 0)
    {
        return next({code:400, message:"User not founded"});
    }
    const otp= otpGenerator.generate(6,{upperCaseAlphabets:false, specialChars:false})
    const to= email;
    const subject= `Forgot your password? OTP to reset your password is given`;
    const body= `The OTP to reset you password is ${otp}. Please Donot share this code with others and this OTP will expire in % minutes`

    sendMailToUser(to, subject, body);
    await RedisClient.connect();
    await RedisClient.set(email, otp, 5000);

    return res.status(200).json({message:"OTP send sucessfully"});
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal server error",
    });
  }
};

export default forgotPassword;