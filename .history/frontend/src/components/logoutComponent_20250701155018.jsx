import { Navigate, useNavigate } from "react-router-dom";


const Logout= ()=>
{
    useEffect(() => {
    const navigate= useNavigate();
    localStorage.removeItem("token");
    navigate("/login");
    },[na]
}

export default Logout;