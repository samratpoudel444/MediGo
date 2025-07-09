import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    try{
         localStorage.removeItem("token");
        toast.success("user logout successful")
        navigate('/login')
    }
}