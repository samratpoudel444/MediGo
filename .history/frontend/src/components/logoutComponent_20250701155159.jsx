import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = (navigate) => {
  const  = useNavigate();

  useEffect(() => {

    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  return null; 
};

export default Logout;
