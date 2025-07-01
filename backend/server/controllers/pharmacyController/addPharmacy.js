import PharmacyTable from "../../db/models/pharmacyModel.js";
import { verifyPharmacyData } from "../utils/pharmacyValidation.js";



export const addPharmacy= async(req, res, next)=>
{
    try{
         const validatePharmacy = await verifyPharmacyData.validate(req.body, {
           abortEarly: false,
         });

         const checkIfUserExist = await PharmacyTable.findOne({
           pharmacyName: req.body.pharmacyName,
           licenseNo: req.body.licenseNo,
           contactNo: req.body.contactNo,
           email: req.body.email,
           longitude: req.body.longitude,
           latitude: req.body.latitude,
         });

         if(checkIfUserExist)
         {
            return next({code:401, message:"provided Data already exist"});
         }

         await PharmacyTable.insertOne(req.body);
        
         return res.status(201).json({message:"Pharmacy inserted in system"});
         
    }
    catch(err)
    {
        console.log("The error is", err);
        return next({code:err.code || 500, message:err.message || "Internal Server Error"});
    }
}