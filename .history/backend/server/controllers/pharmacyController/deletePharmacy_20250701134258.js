import PharmacyTable from "../../db/models/pharmacyModel";



export const deletePharmacy = async(req, res, next)=>
{
    try{
        const {id}= req.params.id;
        const checkIfPharmacyExist =await PharmacyTable.findOne({_id:id})

        if(checkIfPharmacyExist)
        {
            await PharmacyTable.deleteOne({ _id: id });
            return Response.status(201).message:"Pharmacy Removed from system"});
        }

        return next({code:401, message:""})
    }
    catch(err)
    {
        console.log(err);

    }
}