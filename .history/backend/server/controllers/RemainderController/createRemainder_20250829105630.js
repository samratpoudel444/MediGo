import RemainderTable from "../../db/models/remainderModel.js";
import UserTable from "../../db/models/userModels.js";



const createRemainder= async(req, res, next)=>
{
    const userId= req.user.id;
    const{title, time}= req.body;
   const data= await UserTable.findById(userId);
    
    const value= RemainderTable.updateOne({Email:data.email, name:data.firstName, title:title, time:time})
    if(value)
    {
        return res.status(200).json({message:""})
    }
}

export default createRemainder;