import { toast } from "react-toastify";

toast
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