import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = (navigate) => {

  useEffect(() => {

    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  return null; 
};

export default Logout;
