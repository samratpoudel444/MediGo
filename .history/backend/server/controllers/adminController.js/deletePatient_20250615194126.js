import UserTable from "../../db/models/userModels.js";

export const deletePatient = async(req, res, next)=>
{
    try{
        const id= req.params.id;
        console.log(id)
        const data= await UserTable.findOne({_ id: id})
        if(!data)
        {
            return next({code:404, message:"Provided user doesnot exists"});
        }
        await UserTable.deleteOne({ _id: id  });

        return res.status(200).json({message:"User deleted sucessfully"});

    }
    catch(err)
    {
        console.log(err);
        return next({code:err.code|| 500, message:"Internal Server error"})
    }
}