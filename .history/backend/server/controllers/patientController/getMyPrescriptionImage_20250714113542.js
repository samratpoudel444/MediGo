import prescriptionTable from "../../db/models/prescriptionModel"

const getMyPrescriptionImage=()=>
{
    try{
        const userId= req.user.id;
        const data= await
    }
    catch(err)
    {
        console.log(err)
        return next({err:err.code})
    }
}