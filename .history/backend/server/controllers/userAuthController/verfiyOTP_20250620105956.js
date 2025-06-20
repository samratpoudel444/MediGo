export default VerifyOtp = async(req, resizeBy, next) =>
{
    try{

    }
    catch(err)
    {
        console.log(err);
        return next(code:err.code || 500 , message:err.message|| "Internal Server error")
    }
}