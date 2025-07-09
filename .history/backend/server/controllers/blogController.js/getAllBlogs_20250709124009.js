import blogTable from "../../db/models/blogModel"

export default getAllBlogs= async(req, res, next)=>
{
    try{
        const data= await blogTable.find();
        if(!data)
        {
            return next({code:400, message:"Data not found"})
        }
        tr
    }
    catch(err)
    {

    }
}