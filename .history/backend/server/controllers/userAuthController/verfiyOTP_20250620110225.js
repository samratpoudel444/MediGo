import RedisClient from "../../helper/redisHelper";

export default VerifyOtp = async(req, res, next) =>
{
    try{
        const {otp, email}= req.body;
        const redis= await RedisClient.get(email);

        if(otp === )
    }
    catch(err)
    {
        console.log(err);
        return next({code:err.code || 500 , message:err.message|| "Internal Server error"})
    }
}