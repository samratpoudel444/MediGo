import { Link } from "react-router-dom";
import scope from "../../assets/stethoscope.jpg";

const DoctorSidebar= ()=>
{
    return (
      <div className="w-80 h-screen border">
        <div className="w-[20%] ml-12 flex items-center mr-12">
          <img
            src={scope}
            alt="Scope image"
            className="w-[35%] h-[45%] object-contain mt-8 cursor-pointer hover:scale-105 transition-transform duration-300"
          />
          <div className="ml-8 text-3xl text-[#42cbf5] cursor-pointer font-bold hover:scale-105 transition-transform duration-300">
            {/* Changed <a href> to Link to */}
            <Link to="/home">MediGO</Link>
          </div>
        </div>
      </div>
    );
}

export default DoctorSidebar;