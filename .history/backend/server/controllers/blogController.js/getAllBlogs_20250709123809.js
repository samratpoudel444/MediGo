import blogTable from "../../db/models/blogModel"

export default getAllBlogs= async(req)=>
{
    try{
        const data= await blogTable.find()
    }
    catch(err)
    {

    }
}