Ver

export const changePassword= async(req, res, next)=>
{
    try{
         const validateData = await verifyData.validate(req.body, {
              abortEarly: false,
        });
        
        const {password, confirmPassword, email}= req.body;
        if(password !== confirmPassword)
        {
            return next({code: 400, message:"Password and confirm password doesnot match"})
        }
        

    }
    catch(err)
    {
        console.log(err);
        return next({err:err.code|| 500, message:err.message||"Internal Server error" });
    }
}