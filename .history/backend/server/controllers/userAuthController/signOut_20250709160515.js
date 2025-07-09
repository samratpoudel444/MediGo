export const signOut= async(req, res, next)=>
{
    try{

    }
    catch(err)
    {
        return next({code:err.code|| 500, message:err.message ||""})
    }
}