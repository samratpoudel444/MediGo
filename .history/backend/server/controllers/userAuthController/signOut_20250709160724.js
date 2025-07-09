export const signOut= async(req, res, next)=>
{
    try{
          res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", // or 'lax'
          });
    }
    catch(err)
    {
        return next({code:err.code|| 500, message:err.message ||"Internal Server error"})
    }
}