import RemainderTable from "../../db/models/remainderModel.js";

const listAllRemainder= async(req, res, next)=>
{
    try{
    
        const userId= req.user.email;
     
        const data= await RemainderTable.find({Email:userId});
        if(!data)
        {
         return next({code:400 , message:"Data not found"})   
        }
           console.log(userId)
        return res.status(200).json({message:data});
    }
    catch(err)
    {
        console.log(err);

    }
}

export default listAllRemainder;