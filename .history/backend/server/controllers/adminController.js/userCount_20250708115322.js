import UserTable from "../../db/models/userModels";

export const userCount= ()=>
{
    try{
        const data= db.UserTable
    }
    catch(err)
    {
        console.log(err);
        return next({code:err.code||500 , message:err.message || "Internal Server error"})
    }
}