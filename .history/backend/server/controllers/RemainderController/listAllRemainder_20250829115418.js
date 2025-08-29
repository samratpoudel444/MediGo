import RemainderTable from "../../db/models/remainderModel";

const listAllRemainder= async(req, res, next)=>
{
    try{
        const userId= req.user.emal;
        const data= await RemainderTable.find({email})
    }
    catch(err)
    {
        console.log(err);

    }
}