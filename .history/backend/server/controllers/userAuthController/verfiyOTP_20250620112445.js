import RedisClient from "../../helper/redisHelper";

export default VerifyOtp = async(req, res, next) =>
{
    try{
        const {otp, email}= req.body;
        const redisOTP= await RedisClient.get(email);

        if(!email)
        {
            return next({code:400, message:"Please provide email. Email not found"});
        }

        if(!otp)
        {
            return next({code:400, message:"Please provide OTP"});
        }
        if(!redisOTP)
        {
         return next({code:400, message:"OTP expired. Please try again"});   
        }

        if(otp === redisOTP)
        {
           return res.status(200).json({message:"provided OTP is correct"});
        }

        return next({code:400, message:"Incorrect OTP"});
    }
    catch(err)
    {
        console.log(err);
        return next({code:err.code || 500 , message:err.message|| "Internal Server error"})
    }
}