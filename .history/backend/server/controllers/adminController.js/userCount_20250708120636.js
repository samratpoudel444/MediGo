import UserTable from "../../db/models/userModels.js";

export const userCount= async(req, res, next)=>
{
    try{
     const data = await UserTable.aggregate([
       {
         $group: {
           _id: "$role",
           count: { $sum: 1 },
         },
       },
       {
         $project: {
           _id: 0,
           role: "$_id",
           count: 1,
         },
       },
     ]);

        if(!data)
        {
            return next({code:400, message:"Data not found"})
        }
        console.log(data);
        return res.status(201).json({message:data})
    }
    catch(err)
    {
        console.log(err);
        return next({code:err.code||500 , message:err.message || "Internal Server error"})
    }
}