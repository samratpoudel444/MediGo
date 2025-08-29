import RemainderTable from "../../db/models/remainderModel.js";
import UserTable from "../../db/models/userModels.js";



const createRemainder= async(req, res, next)=>
{
    try{
    const userId= req.user.id;
    const{title, time}= req.body;
   const data= await UserTable.findById(userId);
    const checkIfExist = await RemainderTable.findOne({
      email: data.email,
      name: data.firstName,
      title: title,
      time: time,
    });
    if(checkIfExist)
    {
      return next({code:400, message: "Error creating Remainder" });   
    }
    
    const value= RemainderTable.create({Email:data.email, name:data.firstName, title:title, time:time})
    if(value)
    {
        return res.status(200).json({message:"Remainder Created Sucessfully"});
    }
      return next({ code: 400, message: "Error creating Remainder" });   
}

catch(err)
{
return next({ code: err.code || 500, message: "Error creating Remainder" });
}}

export default createRemainder;