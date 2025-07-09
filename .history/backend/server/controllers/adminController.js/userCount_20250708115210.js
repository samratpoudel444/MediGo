
export const userCount= ()=>
{
    try{

    }
    catch(err)
    {
        console.log(err);
        return next({code:err.code||5})
    }
}