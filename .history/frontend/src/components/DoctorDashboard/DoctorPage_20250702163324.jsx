import DoctorSidebar from "./DoctorSidebar"
import { Outlet } from "react-router-dom";



const DoctorPage  = () => {
  return (
    <div className="flex flex-row">
      <div >
        <DoctorSidebar />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorPage;