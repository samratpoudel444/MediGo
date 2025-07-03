import DoctorSidebar from "./DoctorSidebar"
import { Outlet } from "react-router-dom";



const DoctorPage  = () => {
  return (
    <div className="flex flex-row">
      <div className="">
        <DoctorSidebar />
      </div>
      <div className="h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorPage;