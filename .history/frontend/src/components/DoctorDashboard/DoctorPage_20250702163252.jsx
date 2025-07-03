import DoctorSidebar from "./DoctorSidebar"
import { Outlet } from "react-router-dom";



const DoctorPage  = () => {
  return (
    <div>
      <div className="w-80 h-screen border-r bg-white flex flex-col p-6 shadow-lg">
        <DoctorSidebar />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorPage;