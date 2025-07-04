const sendMessage= async(req, res, next)=>
{
    try{
        const senderId= req.user.Id;
        const recieverId= req.
    }
    catch(err)
    {
        return next({err: err.code || 500, message: err.message || "Internal Server Error"})
    }
}