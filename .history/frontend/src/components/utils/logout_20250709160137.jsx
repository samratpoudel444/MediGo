
const logout= ()=>
{
    try{
        
    }
    catch(err)
    {
        console.log(err)
    }
}

export const LogoutHandler= (navigate)=>
{
    try{
         localStorage.removeItem("token");

    }
}