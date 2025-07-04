import chatTable from "../../db/models/chatModel.js";

const getAllUser= async()=>
{
    try{
        const senderId= req.user;
    }
    catch(err)
    {
        return next({code:err.code || 500 , message:err.message || "Internal Server Error"})
    }
}