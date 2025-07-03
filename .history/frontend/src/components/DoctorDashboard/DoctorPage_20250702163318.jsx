import DoctorSidebar from "./DoctorSidebar"
import { Outlet } from "react-router-dom";



const DoctorPage  = () => {
  return (
    <div className="">
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