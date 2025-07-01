import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = (navigate) => {


    localStorage.removeItem("token");
    navigate("/login");


  return null; 
};

export default Logout;
