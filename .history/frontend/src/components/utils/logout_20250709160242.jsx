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

export const LogoutHandler= ()=>
{
    try{
         localStorage.removeItem("token");
        toast.success("user logout successful")
        navigate('')
    }
}