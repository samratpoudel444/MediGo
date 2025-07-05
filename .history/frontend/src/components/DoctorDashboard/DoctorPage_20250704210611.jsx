import ChatButton from "../ChatApp/ChatButton";
import DoctorSidebar from "./DoctorSidebar"
import { Outlet } from "react-router-dom";



const DoctorPage = () => {
  return (
    <div className="flex flex-row h-screen">
      <div className="">
        <DoctorSidebar />
        <ChatButton />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};


export default DoctorPage;