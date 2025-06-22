import UserTable from "../../db/models/userModels.js";
import otpGenerator from "otp-generator";
import redis from "../../helper/redisHelper.js";
import sendMailToUser from "../../helper/nodeMailerHelper.js";

export default forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const checkUser= await UserTable.findOne({email:email});
    if(!checkUser || checkUser.length === 0)
    {
        return next({code:400, message:"User not founded"});
    }
    const otp= otpGenerator.generate(6,{upperCaseAlphabets:false, specialChars:false})
    const to= email;
    const subject= ``

    sendMailToUser()
    await redis.set(email, otp, 5000);
    
  } catch (err) {
    console.log(err);
    return next({
      code: err.code || 500,
      message: err.message || "Internal server error",
    });
  }
};
