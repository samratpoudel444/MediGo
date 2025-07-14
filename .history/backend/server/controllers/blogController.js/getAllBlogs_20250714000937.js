import blogTable from "../../db/models/blogModel.js"

export const getAllBlogs= async(req, res, next)=>
{
    try{
        const data= await blogTable.find();
        if(!data)
        {
            return next({code:400, message:"Data not found"})
        }
        // console.log("hell")
        return res.status(201).json({message:data})
    }
    catch(err)
    {
        return next({code:err.code || 500 , message:err.message ||"Internal Server error"})
    }
}