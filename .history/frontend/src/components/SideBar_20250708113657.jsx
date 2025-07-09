import { FaUserAlt } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { IoIosCreate } from "react-icons/io";
import { GiMedicines } from "react-icons/gi";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa";
import image from "../assets/MEDIGO.png"



function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      icon: <TbDeviceDesktopAnalytics />,
      text: "View Analytics",
      navigate: "ViewAnalytics",
    },
    {
      icon: <FaUserAlt />,
      text: "Show Users",
      navigate: "ShowUsers",
    },
    {
      icon: <FaUserDoctor />,
      text: "Show Doctors",
      navigate: "ShowDoctors",
    },
    {
      icon: <IoIosCreate />,
      text: "Create Doctor",
      navigate: "CreateDoctor",
    },
    {
      icon: <GiMedicines />,
      text: "Add Pharmacy",
      navigate: "AddPharmacy",
    },
    {
      icon: <FaThumbsUp />,
      text: "Approve Doctor",
      navigate: "Approve",
    },
  ];

  const navigate= useNavigate();

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-sky-600 text-white rounded-md shadow-lg hover:bg-sky-700 transition-colors duration-300"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      <div
        className={`
          fixed lg:relative
          h-screen 
          w-80 lg:w-72 xl:w-80
          bg-sky-600
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          z-40 lg:z-auto
          flex flex-col
          shadow-2xl lg:shadow-none
        `}
      >
        <div className="p-6 border-b border-sky-500">
          <h1 className="text-2xl lg:text-3xl font-bold text-white text-center leading-tight">
            Admin Dashboard
          </h1>
        </div>

        <nav className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <div className="space-y-3 lg:space-y-4">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="
                  w-full
                  group
                  hover:shadow-xl 
                  transition-all duration-300 
                  hover:bg-sky-700 
                  hover:scale-105
                  rounded-lg
                  p-3 lg:p-4
                  text-white
                  hover:text-white
                "
                onClick={() =>{ setIsOpen(false);
                    if(item.navigate)
                    {
                        navigate(item.navigate)
                    }
                }
            }
              >
                <a
                  className="flex items-center justify-center lg:justify-start gap-3 lg:gap-4 text-lg lg:text-xl font-medium"
                >
                  <span className="text-xl lg:text-2xl flex-shrink-0">
                    {item.icon}
                  </span>
                  <span className="hidden sm:block lg:block">{item.text}</span>
                </a>
              </button>
            ))}
          </div>
        </nav>

        <div className="p-4 lg:p-6 border-t border-sky-500 mt-auto">
          <a
            href="#profile"
            className="
              flex items-center justify-center lg:justify-start gap-3 
              text-white hover:text-sky-200 
              transition-all duration-300 
              hover:scale-105 
              group
              p-2 rounded-lg
            "
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-sky-400 rounded-full flex items-center justify-center text-white font-bold text-lg lg:text-xl flex-shrink-0">
              
            </div>
            <div className="hidden sm:block lg:block">
              <div className="text-base lg:text-lg font-semibold">
                View Profile
              </div>
              <div className="text-xs lg:text-sm text-sky-200 opacity-80">
                Administrator
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  );
}

export default SideBar;
