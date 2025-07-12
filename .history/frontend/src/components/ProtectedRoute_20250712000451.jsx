import { Navigate, Outlet } from "react-router-dom";
import axiosInstance from "./utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";


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
    const {data:role}= useQuery({
      queryFn: getRole,
      queryKey: ["role"]
    })

    if(!token)
    {
        return <Navigate to="/login" replace={false}
         toastError:"Unauthorized access Please Login">
    }

    console.log("The allowes role is", allowedRole)
    console.log("The role is", role);
    if(allowedRole && !allowedRole.includes(role))
    {
      
        return (
          <Navigate
            to="/login"
            replace={false}
            state={{ toastError: "Unauthorized access Please Login" }}
          />
        );
    }
    return <Outlet/>
}

export default ProtectedRoute;