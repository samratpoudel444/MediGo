export default VerifyOtp = async(req, res, next) =>
{
    try{
        const otp= 
    }
    catch(err)
    {
        console.log(err);
        return next({code:err.code || 500 , message:err.message|| "Internal Server error"})
    }
}