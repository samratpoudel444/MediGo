

const getAllDoctor= async(req, res, next)=>
{
    try{
        const data= await 
    }
    catch(err)
{
    console.log(err);
    return next({code:err.code|| 500, message:err.message|| "Internal Server Error"})
}
}