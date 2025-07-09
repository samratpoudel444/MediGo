import blogTable from "../../db/models/blogModel"

export default getAllBlogs= ()=>
{
    try{
        const data= await blogTable.find()
    }
    catch(err)
    {

    }
}