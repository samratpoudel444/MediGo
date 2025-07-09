import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "./AxiosInstance";


const logout= async()=>
{
    try{
        const response = await axiosInstance("/api/v1/signOutUsers");
        return response.data.message;
    }
    catch(err)
    {
        console.log(err)
    }
}

export const LogoutHandler= ()=>
{
    const mutation= useMutate
    const navigate = useNavigate();
    try{
         localStorage.removeItem("token");
        toast.success("user logout successful")
        navigate('/login')
    }
    catch(err)
    {
        console.log(err);
    }
}