import RedisClient from "../../helper/redisHelper";

export default VerifyOtp = async(req, res, next) =>
{
    try{
        const {otp, email}= req.body;
        const redisOTP= await RedisClient.get(email);

        if(otp === redisOTP)
        {
            return res.status(200).json({message:"OTP verification sucessfull"});
        }

        return res.status(200).json({message:""});
    }
    catch(err)
    {
        console.log(err);
        return next({code:err.code || 500 , message:err.message|| "Internal Server error"})
    }
}