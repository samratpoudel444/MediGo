import chatTable from "../../db/models/chatModel";

const sendMessage= async(req, res, next)=>
{
    try{
        const senderId= req.user.Id;
        const recieverId= req.params;

        const sendMessages= await chatTable.find({senderId:senderId, recieverId:recieverId});

        if()
        {
            
        }
    }
    catch(err)
    {
        return next({err: err.code || 500, message: err.message || "Internal Server Error"})
    }
}