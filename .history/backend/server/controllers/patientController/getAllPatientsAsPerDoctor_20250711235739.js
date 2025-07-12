export const getAllPatientAsPerDoctors= ()=>
{
    try{

    }
    catch(err)
    {
        return nextTick({err:err.code|| 500, message:err.message|| "Internal Server Error"})
    }
}