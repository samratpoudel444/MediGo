import DoctorSidebar from "./DoctorSidebar"
import { Outlet } from "react-router-dom";



const DoctorPage  = () => {
  return (
    <div className="w-80 h-screen border-r bg-white flex flex-col p-6 shadow-lg">
      <div>
        <DoctorSidebar />
      </div>
      <div >
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorPage;