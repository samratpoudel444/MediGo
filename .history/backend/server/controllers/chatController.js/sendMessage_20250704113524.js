import chatTable from "../../db/models/chatModel";

const sendMessage= async(req, res, next)=>
{
    try{
        const senderId= req.user.Id;
        const recieverId= req.params;
        const message= req.body.message;
        const sendMessages= await chatTable.insertOne({senderId:senderId, recieverId:recieverId});

        
    }
    catch(err)
    {
        return next({err: err.code || 500, message: err.message || "Internal Server Error"})
    }
}