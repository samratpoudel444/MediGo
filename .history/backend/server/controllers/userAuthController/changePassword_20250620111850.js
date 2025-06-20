export const changePassword= async(req, res, next)=>
{
    try{

    }
    catch(err)
    {
        console.log(err);
        return next({err:err.code|| 500, message:err.message||"Internal Server error" });
    }
}