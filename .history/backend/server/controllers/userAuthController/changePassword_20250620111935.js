export const changePassword= async(req, res, next)=>
{
    try{
        const {password, confirmPassword, email}= req.body;
        if(password)
    }
    catch(err)
    {
        console.log(err);
        return next({err:err.code|| 500, message:err.message||"Internal Server error" });
    }
}