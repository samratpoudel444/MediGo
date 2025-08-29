import RemainderTable from "../../db/models/remainderModel";

const listAllRemainder= async(req, res, next)=>
{
    try{
        const userId= req.user.Id;
        const data= await RemainderTable.fi({})
    }
    catch(err)
    {
        console.log(err);

    }
}