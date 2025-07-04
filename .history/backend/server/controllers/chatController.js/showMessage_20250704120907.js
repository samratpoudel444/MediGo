

const showAllMessage= async(req, res, next)=>
{
    try{
        const currentUser= req.user.id;
        const otherUser= req.params.otherUser;

        const message= await charTable.find()
    }
    catch(err)
    {

    }
}