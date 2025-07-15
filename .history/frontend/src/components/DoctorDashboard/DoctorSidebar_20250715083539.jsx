import { Link } from "react-router-dom";
import scope from "../../assets/stethoscope.jpg";
import image from "../../assets/MEDIGO.png";
import HomeIcon from "@mui/icons-material/Home";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import BookIcon from "@mui/icons-material/Book";
import ChatIcon from "@mui/icons-material/Chat";

const Buttons = [
  { name: "Dashboard", link: "/doctor/dashboard", icon: <HomeIcon /> },
  {
    name: "Today's Appointments",
    link: "/doctor/getAllTodaysAppointment",
    icon: <DeviceThermostatIcon />,
  },
  {
    name: "Appointments",
    link: "/doctor/getAllAppointmentForDoctor",
    icon: <BookOnlineIcon />,
  },
  { name: "Write Blogs", link: "/doctor/blog", icon: <BookIcon /> },
  { name: "Make Chat", link: "/chat", icon: <ChatIcon /> },
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
          MediGO
        </div>
      </div>

      <nav className="flex flex-col space-y-3 flex-1">
        {Buttons.map((data) => (
          <Link
            to={data.link}
            key={data.name}
            className="
              px-4 py-4 rounded-lg
              text-gray-700 font-semibold text-lg
              hover:bg-blue-600 hover:text-white
              text-xl
              hover:shadow-md
              cursor-pointer
              transition
              duration-300
              ease-in-out
              select-none
              flex items-center
            "
          >
            {data.icon} &nbsp;
            {data.name}
          </Link>
        ))}
      </nav>

      <div
        className="
          mt-auto
          border-t
          rounded-t-lg
        "
      >
        <Link
          to="/doctor/viewProfile"
          className="
            flex flex-row items-center
            px-4 py-3
            text-gray-600 font-medium
            hover:text-blue-600 hover:bg-blue-100
            cursor-pointer
            transition
            duration-300
            select-none
          "
        >
          <img src={image} alt="profile" className="h-15 w-18 rounded-full" />
          <span className="px-2 py-5 text-xl font-bold">View Profile</span>
        </Link>

        <span className="px-6 py-3 block text-xl font-bold">Doctor</span>
      </div>
    </div>
  );
};

export default DoctorSidebar;
