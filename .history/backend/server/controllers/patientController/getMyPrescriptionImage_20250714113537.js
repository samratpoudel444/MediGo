import prescriptionTable from "../../db/models/prescriptionModel"

const getMyPrescriptionImage=()=>
{
    try{
        const userId= req.user.id;
        
    }
    catch(err)
    {
        console.log(err)
        return next({err:err.code})
    }
}