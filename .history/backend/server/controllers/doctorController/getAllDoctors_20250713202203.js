import DoctorTable from "../../db/models/doctorModel";



const getAllDoctor= async(req, res, next)=>
{
    try{
        const data = await DoctorTable.find().populate("userId");
        if(!data)
        {
            return res.status(200).json({})
        }

    }
    catch(err)
{
    console.log(err);
    return next({code:err.code|| 500, message:err.message|| "Internal Server Error"})
}
}