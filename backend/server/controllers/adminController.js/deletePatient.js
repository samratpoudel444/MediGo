import UserTable from "../../db/models/userModels";

export const deletePatient = async(req, res, next)=>
{
    try{
        const userId= req.params;

        const data= await UserTable.findOne({_id: userId})
        if(!data)
        {
            return next({code:404, message:"Provided user doesnot exists"});
        }
        await UserTable.deleteOne({ _id: userId  });

        return res.status(204).json({message:"User deleted sucessfully"});

    }
    catch(err)
    {
        console.log(err);
        return next({code:err.code|| 500, message:"Internal Server error"})
    }
}