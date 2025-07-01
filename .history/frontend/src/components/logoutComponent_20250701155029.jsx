import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
useEffect

const Logout= ()=>
{
    useEffect(() => {
    const navigate= useNavigate();
    localStorage.removeItem("token");
    navigate("/login");
    },[navigate]);
}

export default Logout;