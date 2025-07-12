import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "./utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";


const getRole= async()=>
{
  try{  
    const response= await axiosInstance.get('/api/v1/testRole')
    return response.data.message;
  }
  catch(error)
  {
     return error.response.data.message;
  }
 }


const ProtectedRoute= ({allowedRole})=>
{
    
    const token= localStorage.getItem("token");
    const { data: role } = useQuery({
      queryFn: getRole,
      queryKey: ["role"],
      enabled: !!token,
      retry: false,
    });

    if(!token)
    {
        toast.error("Unauthorized access Please Login")
        return <Navigate to="/login" replace={false}/>
         
    }

    console.log("The allowes role is", allowedRole)
    console.log("The role is", role);
    if(allowedRole && !allowedRole.includes(role))
    {
          toast.error("Unauthorized access Please Login");
      
        return (
          <Navigate
            to="/login"
          />
        );
    }
    return <Outlet/>
}

export default ProtectedRoute;