import prescriptionTable from "../../db/models/prescriptionModel"

const getMyPrescriptionImage=()=>
{
    try{

    }
    catch(err)
    {
        console.log(err)
        return next({err:err.code})
    }
}