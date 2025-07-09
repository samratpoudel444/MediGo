import PharmacyTable from "../../db/models/pharmacyModel";

const gerAllPharmacies= ()=>
{
    try{

    }
    catch(err)
    {
        return next({code:err.code || 500 , message:err.message|| "Internal Server Error"})
    }
}