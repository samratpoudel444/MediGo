import PharmacyTable from "../../db/models/pharmacyModel";
import { verifyPharmacyData } from "../utils/pharmacyValidation";



export const addPharmacy= async(req, res, next)=>
{
    try{
         const validatePharmacy = await verifyPharmacyData.validate(req.body, {
           abortEarly: false,
         });

         const checkIfUserExist = await PharmacyTable.findOne({
           pharmacyName: req.pharmacyName,
           licenseNo: req.licenseNo,
           contactNo: req.contactNo,
           email: req.email,
           longitude: req.longitude,
           latitude: req.latitude,
         });

         if(checkIfUserExist)
         {
            return next({code:401, message:"provided Data already exist"});
         }

         await PharmacyTable.insertOne(req.body);
        
         return res.s
         
    }
    catch(err)
    {
        console.log("The error is", err);
        return next({code:err.code || 500, message:err.message || "Internal Server Error"});
    }
}