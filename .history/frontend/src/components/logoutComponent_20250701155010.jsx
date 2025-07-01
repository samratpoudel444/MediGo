import { Navigate, useNavigate } from "react-router-dom";


const Logout= ()=>
{
    useEffect(() => {
    const navigate= useNavigate();
    localStorage.removeItem("token");
    navigate("/login");

}

export default Logout;