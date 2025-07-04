import chatTable from "../../db/models/chatModel";


const showAllMessage= async(req, res, next)=>
{
    try{
        const currentUser= req.user.id;
        const otherUser= req.params.otherUser;

        const message1= await chatTable.find({senderId:currentUser, recieverId:otherUser});
        const message2= await chatTable.find({senderId:otherUser, recieverId:otherUser});

        const message= [...]

    }
    catch(err)
    {

    }
}