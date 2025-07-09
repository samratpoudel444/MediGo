import { toast } from "react-toastify";


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
        toast.success("user logout successful")
    }
}