import PharmacyTable from "../../db/models/pharmacyModel";

const getAllPharmacies= async(req, res, next)=>
{
    try{
        const pharmacyData= await PharmacyTable.find();
        if (!pharmacyData || pharmacyData.length === 0) {
             return next({
               code: 400,
               message:"Data Not found",
             });
        }
        return res.status(201).json({message: pharmacyData})
    }
    catch(err)
    {
        console.log(err)
        return next({code:err.code || 500 , message:err.message|| "Internal Server Error"})
    }
}