import PharmacyTable from "../../db/models/pharmacyModel";


export const deletePharmacy =async(req, res, next)=>
{
    try{
        const id= req.params.id;
        const userExist= await PharmacyTable.findOne({_id:id});
        if(userExist)
        {
            await PharmacyTable.deleteOne({ _id: id });
            return res.status(201).json({message:"Pharmacy delete Sucessfully"});
        }
          return next({
            code: 400,
            message: err.message || "Internal Server Error",
          });
    }
    catch(err)
    {
        console.log(err)
        return next({code:err.code || 500 , message:err.message || "Internal Server Error"})
    }

}
