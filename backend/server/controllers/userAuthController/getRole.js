

export const getRole= async(req, res, next)=>
{
    try{    
        const role= req.user.role;
        if(!role)
        {
            return next ({code:401 ,message: "Unauthorized"})
        }
      return res.status(200).json({ message:role });   
    }
    catch(err)
    {
        console.log(error)
    }
}