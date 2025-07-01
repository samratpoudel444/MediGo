import { Navigate, useNavigate } from "react-router-dom";
use

const Logout= ()=>
{
    useEffect(() => {
    const navigate= useNavigate();
    localStorage.removeItem("token");
    navigate("/login");
    },[navigate]);
}

export default Logout;