import { Link } from "react-router-dom";
import scope from "../../assets/stethoscope.jpg";

const Buttons = [
  { name: "Dashboard" },
  { name: "Patients" },
  { name: "Appointments" },
];

const DoctorSidebar = () => {
  return (
    <div className="w-80 h-screen border flex flex-col p-4">
      {/* Logo and name */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={scope}
          alt="Scope"
          className="w-12 h-12 object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
        />
        <div className="text-3xl text-[#42cbf5] font-bold cursor-pointer hover:scale-105 transition-transform duration-300">
          <Link to="/home">MediGO</Link>
        </div>
      </div>

      {/* Sidebar Buttons */}
      <div className="space-y-2">
        {Buttons.map((data) => (
          <div
            key={data.name}
            className="border p-2 rounded hover:bg-black hover:text-white transition cursor-pointer gap-3"
          >
            {data.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorSidebar;
