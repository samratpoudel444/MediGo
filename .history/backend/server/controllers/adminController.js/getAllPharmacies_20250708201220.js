import PharmacyTable from "../../db/models/pharmacyModel";

const gerAllPharmacies= async(req, res, next)=>
{
    try{
        const pharmacyData= await PharmacyTable.find();
        if (!pharmacyData || pharmacyData.length === 0) {
        }
    }
    catch(err)
    {
        console.log(err)
        return next({code:err.code || 500 , message:err.message|| "Internal Server Error"})
    }
}