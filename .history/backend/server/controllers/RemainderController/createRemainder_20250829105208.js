import RemainderTable from "../../db/models/remainderModel.js";
import UserTable from "../../db/models/userModels.js";



const createRemainder= async(req, res, next)=>
{
    const userId= req.user.id;
    const Title
   const data= await UserTable.findById(userId);
    
   const value= RemainderTable.updateOne({})
}

export default createRemainder;