import blogTable from "../../db/models/blogModel"

export default getAllBlogs= async(req, res, next)=>
{
    try{
        const data= await blogTable.find();
        if(!data)
        {
            
        }
    }
    catch(err)
    {

    }
}