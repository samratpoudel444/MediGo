
import { Outlet } from "react-router-dom";
import Banner from "./Banner";
import ChatButton from "./ChatApp/ChatButton";



function AuthLayout() {
  return (
    <div className="flex lg:flex-row flex-col">
      <div className="flex lg:w-1/2 realtive ">
        <Banner />
      </div>
      <div className="flex lg: w-1/2">
       
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
