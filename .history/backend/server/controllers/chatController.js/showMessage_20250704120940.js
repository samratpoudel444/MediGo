

const showAllMessage= async(req, res, next)=>
{
    try{
        const currentUser= req.user.id;
        const otherUser= req.params.otherUser;

        const message1= await charTable.find({senderId:})
    }
    catch(err)
    {

    }
}