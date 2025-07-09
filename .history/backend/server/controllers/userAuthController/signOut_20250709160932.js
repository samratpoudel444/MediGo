export const signOut= async(req, res, next)=>
{
    try{
         res
           .clearCookie("accessToken", {
             httpOnly: true,
             secure: true,
             sameSite: "strict",
             path: "/",
           })
           .clearCookie("accessToken", {
             httpOnly: true,
             secure: true,
             sameSite: "strict",
             path: "/",
           }).status(200).json({});

    }
    catch(err)
    {
        return next({code:err.code|| 500, message:err.message ||"Internal Server error"})
    }
}