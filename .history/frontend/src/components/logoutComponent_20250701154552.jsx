import { Navigate } from "react-router-dom";


const Logout= ()=>
{
    localStorage.removeItem("token");

}

export default Logout;