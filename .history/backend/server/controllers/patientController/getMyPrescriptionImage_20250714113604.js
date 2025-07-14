import prescriptionTable from "../../db/models/prescriptionModel"

const getMyPrescriptionImage=async(req, res, next)=>
{
    try{
        const userId= req.user.id;
        const data= await prescriptionTable.find({})
    }
    catch(err)
    {
        console.log(err)
        return next({err:err.code})
    }
}