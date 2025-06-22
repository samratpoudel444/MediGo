export default forgotPassword= async(req, res, next)=>
{
    try{
        const {email, otp}
    }
    catch(err)
    {
        console.log(err);
        return next({code:err.code|| 500, message:err.message || "Internal server error"})
    }
}