import { Navigate, useNavigate } from "react-router-dom";


const Logout= ()=>
{
    const navigate= useNavigate()
    localStorage.removeItem("token");

}

export default Logout;