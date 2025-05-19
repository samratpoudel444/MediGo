import DoctorTable from "../../db/models/doctorModel.js";
import UserTable from "../../db/models/userModels.js";


export const getDoctorProfile= async(req, res, next)=>
{
    try{
    const doctorId= req.query;
     const data= await DoctorTable.findById({_id: "6825b399c95a77f08c7f7d69"}).populate('userId')
     console.log(data)

  }
    catch(err)
    {
        console.log(err);
        return next({code:500, message:"Internal Server Error"})
    }
}