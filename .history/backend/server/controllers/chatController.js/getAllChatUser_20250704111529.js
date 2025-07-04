import chatTable from "../../db/models/chatModel.js";

const getAllUser= async()=>
{
    try{
        const userId= req.user;
        const sentTo = await chatTable.distinct("receiverId", {
          senderId: userId,
        });
        const receivedFrom = await chatTable.distinct("senderId", {
          receiverId: userId,
        });

    }
    catch(err)
    {
        return next({code:err.code || 500 , message:err.message || "Internal Server Error"})
    }
}