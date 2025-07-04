const sendMessage= async(req, res, next)=>
{
    try{

    }
    catch(err)
    {
        return next({err: err.code || 500, message: err.message || "Internal Server Error"})
    }
}