import UserTable from "../../db/models/userModels";


export const getAllPatients= async(req, res, next)=>
{
    try{
        const patients = await UserTable.find({ role: `Patient` });
        if(!patients)
        {
            return next({code:404 , message:"Patients not found"});
        }

        return res.status(200).json({message: patients})
    }
    catch(err)
    {
     console.log(err);
     return next({code:err.code || 500, message:err.message ||"Internal server error" });   
    }
}