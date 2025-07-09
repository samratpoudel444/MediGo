import blogTable from "../../db/models/blogModel"

export default getAllBlogs= async(req, res, nex)=>
{
    try{
        const data= await blogTable.find()
    }
    catch(err)
    {

    }
}