import RemainderTable from "../../db/models/remainderModel.js";
import UserTable from "../../db/models/userModels.js";



const createRemainder= async(req, res, next)=>
{
    const userId= req.user.id;
    const{title, time}= req.body;
   const data= await UserTable.findById(userId);
   console.log(data)
    
   //const value= RemainderTable.updateOne({Email:data.email, name:data.first title:title, time:time})
}

export default createRemainder;