
import chatTable from "../../db/models/chatModel.js";

export const sendMessage= async(req, res, next)=>
{
    try{
        const senderId= req.user.Id;
        const recieverId= req.params;
        const message= req.body.message;
        const sendMessages= await chatTable.insertOne({senderId:senderId, recieverId:recieverId, message:message});

        return res.status(201).json("message Sent Sucessfull");

        
    }
    catch(err)
    {
        console.log(err);
        return next({err: err.code || 500, message: err.message || "Internal Server Error"})
    }
}