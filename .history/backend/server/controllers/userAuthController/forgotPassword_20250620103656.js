import otpGenerator from 'otp-generator'

export default forgotPassword= async(req, res, next)=>
{
    try{
        const {email}= req.body;
        if(!otp)
        {
            
        }
    }
    catch(err)
    {
        console.log(err);
        return next({code:err.code|| 500, message:err.message || "Internal server error"})
    }
}