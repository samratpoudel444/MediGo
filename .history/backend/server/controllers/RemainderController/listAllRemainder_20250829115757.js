import RemainderTable from "../../db/models/remainderModel";

const listAllRemainder= async(req, res, next)=>
{
    try{
        const userId= req.user.email;
        const data= await RemainderTable.find({Email:userId});
        if(!data)
        {
         return next({code:400 , message:"Data not found"})   
        }
        return resp
    }
    catch(err)
    {
        console.log(err);

    }
}