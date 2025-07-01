import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Logout= ()=>
{
    useEffect(() => {
    const navigate= useNavigate();
    localStorage.removeItem("token");
    navigate("/login");
    },[Navigate]);
}

export default Logout;