import UserTable from "../../db/models/userModels.js";

export const userCount= ()=>
{
    try{
        const data = db.UserTable.aggregate([
          {
            $group: {
              _id: "$role",
              count: { $sum: 1 },
            },
            $project: {
              _id: "$role",
              role:"$_id",
              count: 1 ,
            },
          },
        ]);
        if(!data)
        {
            return next({code:400, message:""})
        }
        return response.status(201).json({message:data})
    }
    catch(err)
    {
        console.log(err);
        return next({code:err.code||500 , message:err.message || "Internal Server error"})
    }
}