import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {

    localStorage.removeItem("token");
    navigate("/login");
  }, [navigate]);

  return null; // or return a loading spinner if you prefer
};

export default Logout;
