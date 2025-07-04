

const getAllUser= async()=>
{
    try{
        
    }
    catch(err)
    {
        return next({code:err.code || 500 , message:err.message || "Internal Server Error"})
    }
}