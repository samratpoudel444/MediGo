import UserTable from "../../db/models/userModels.js";

export const getUserDetails= async(req, res , next)=>
{
    //const id = req.query;
    const id= "6825b1de3e96997d37da25fd";
    try{
        const data= await UserTable.findOne({_id: id});
        if(!data)
        {
            return next({code:404, message:"Data not found"});
        }
       const { _id, password, __v, ...userData } = data.toObject();
       return res.status(201).json({message: userData});
    }
    catch(err)
    {
        console.log(err);
        return next({code:500, message:"Internal Server error"});
    }
}