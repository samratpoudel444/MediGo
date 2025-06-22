import RedisClient from "../../helper/redisHelper";

export default VerifyOtp = async(req, res, next) =>
{
    try{
        const {otp, email}= req.body;
        const redisOTP= await RedisClient.get(email);

        if(otp === redisOTP)
        {
            r
        }
    }
    catch(err)
    {
        console.log(err);
        return next({code:err.code || 500 , message:err.message|| "Internal Server error"})
    }
}