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
         const userIds = [...new Set([...sentTo, ...receivedFrom])];

         if(!userIds)
         {
            return next({code:404, message:"User Not found"});
         }

         user

    }
    catch(err)
    {
        return next({code:err.code || 500 , message:err.message || "Internal Server Error"})
    }
}