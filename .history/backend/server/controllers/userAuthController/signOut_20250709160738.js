export const signOut= async(req, res, next)=>
{
    try{
          res.clearCookie("accessToken");
    }
    catch(err)
    {
        return next({code:err.code|| 500, message:err.message ||"Internal Server error"})
    }
}