
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
         localStorage.removeItem("token"); // Adjust key if different
    localStorage.removeItem("user");
    }
}