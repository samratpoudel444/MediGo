import DoctorSidebar from "./DoctorSidebar"
import { Outlet } from "react-router-dom";



const DoctorPage  = () => {
  return (
  <div c>
    <div>
      <DoctorSidebar />
    </div>
    <div>
      <Outlet/>
    </div>
  </div>
  )
};

export default DoctorPage;