

export const deletePharmacy = async(req, res, next)=>
{
    try{
        const {id}= req.params.id;
        const checkIfPharmacyExist =await PharmacyTable.findOne({})
    }
    catch(err)
    {
        console.log(err);

    }
}