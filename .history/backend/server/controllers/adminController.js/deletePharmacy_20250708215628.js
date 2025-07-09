import PharmacyTable from "../../db/models/pharmacyModel";


export const deletePharmacy =async(req, res, next)=>
{
    try{
        const id= req.params
    }
    catch(err)
    {
        console.log(err)
        return next({code:err.code || 500 , message:err.message || "Internal Server Error"})
    }

}
PharmacyTable