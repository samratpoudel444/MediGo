

export const addPharmacy= async(req, res, next)=>
{
    try{

    }
    catch(err)
    {
        console.log("The error is", err);
        return next({code:err.code || 500, message:err.message})
    }
}