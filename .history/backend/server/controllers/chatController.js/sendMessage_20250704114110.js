
import chatTable from "../../db/models/chatModel.js";

export const sendMessage= async(req, res, next)=>
{
    try{
        const senderId= req.user.id;
        const recieverId= req.params;
        console.log(recieverId)
        const message= req.body.message;
        const sendMessages= await chatTable.insertOne({senderId:senderId, recieverId:recieverId, content:message});

        return res.status(201).json("message Sent Sucessfull");

        
    }
    catch(err)
    {
        console.log(err);
        return next({err: err.code || 500, message: err.message || "Internal Server Error"})
    }
}