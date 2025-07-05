
import chatTable from "../../db/models/chatModel.js";
import { authenticateSocket } from "../../middleware/socketAuthMiddleware.js";
import io from "../../socketIo/initializeSocket.js";
import RedisClient from "../../helper/redisHelper.js";

export const sendMessage= async(req, res, next)=>
{
    try{

        const senderId= req.user.id;
        const recieverId = req.params.recieverId;
        const message= req.body.message;


        const sendMessages = await chatTable.insertOne({
          senderId: senderId,
          recieverId: recieverId,
          content: message,
        });

        const socketId= await RedisClient.get(`${recieverId}`);

        if(socketId)
        {
            io.to(socketId).emit("message", {
              _id: sendMessages._id,
                message,
              senderId,
              recieverId,
              timestamp: sendMessages.timestamp,
            });
        }

     
        return res.status(201).json("message Sent Sucessfull");

        
    }
    catch(err)
    {
        console.log(err);
        return next({err: err.code || 500, message: err.message || "Internal Server Error"})
    }
}