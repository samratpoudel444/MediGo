import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "./AxiosInstance";
import { useMutation } from "@tanstack/react-query";


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
    const mutation= useMutation({
        mutationFn:logout,
        onSuccess:{

        },
        onError
    })
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