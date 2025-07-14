import prescriptionTable from "../../db/models/prescriptionModel"

const getMyPrescriptionImage=async(req, res, next)=>
{
    try{
        const userId= req.user.id;
        const data= await prescriptionTable.find({userId:userId})
        if(!data || data.length ==0)
        {
            return next({err:err.code|| 400, message:err.message || "Prescription not found"})
        }
        return res.status(201).json({message:})

    }
    catch(err)
    {
        console.log(err)
        return next({err:err.code})
    }
}