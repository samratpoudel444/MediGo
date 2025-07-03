import { Link } from "react-router-dom";
import scope from "../../assets/stethoscope.jpg";
import image from "../../assets/MEDIGO.png";
import HomeIcon from "@mui/icons-material/Home";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

const Buttons = [
  { name: "Dashboard", link: "/doctor/dashboard", icon:<HomeIcon/>},
  { name: "Patients", link: "/doctor/Patients", icon:"" },
  { name: "Appointments", link: "/doctor/Appointment" },
  { name: "Write Blogs", link: "/doctor/blog" },
//   {name:""}
];

const DoctorSidebar = () => {
  return (
    <div className="w-80 h-screen border-r bg-white flex flex-col p-6 shadow-lg">
      <div className="flex items-center space-x-4 mb-10">
        <img
          src={scope}
          alt="Scope"
          className="w-14 h-14 object-contain cursor-pointer hover:scale-110 transition-transform duration-300"
        />
        <div className="text-4xl text-blue-600 font-extrabold cursor-pointer hover:scale-110 transition-transform duration-300">
          <Link to="/home">MediGO</Link>
        </div>
      </div>

      <nav className="flex flex-col space-y-3 flex-1">
        {Buttons.map((data) => (
          <Link to={data.link}>
            <div
              key={data.name}
              className="
              px-4 py-3 rounded-lg
              text-gray-700 font-semibold text-lg
              hover:bg-blue-600 hover:text-white
              hover:shadow-md
              cursor-pointer
              transition
              duration-300
              ease-in-out
              select-none
            "
            >
            {data.icon} &nbsp;
              {data.name}
            </div>
          </Link>
        ))}
      </nav>

      <div
        className="
          mt-auto
          px-4 py-3
          border-t
          text-gray-600 font-medium
          hover:text-blue-600 hover:bg-blue-100
          cursor-pointer
          rounded-t-lg
          transition
          duration-300
          select-none
        "
      >
        <Link to="/doctor/viewProfile">
          <div className="flex flex-row">
            <img src={image} alt="profile" className="h-15 w-18 rounded-full" />
            <a className="px-2 py-5 text-xl font-bold">View Profile</a>
          </div>
        </Link>

        <a className="px-25 text-xl font-bold">Doctor</a>
      </div>
    </div>
  );
};

export default DoctorSidebar;
