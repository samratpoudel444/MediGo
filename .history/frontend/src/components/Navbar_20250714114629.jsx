import React, { useEffect, useState } from "react";
import doctorImage from "../assets/doctor.png";
import scope from "../assets/scope.png";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const navItems = [
  { text: "Contact", link: "/home" },
  { text: "About", link: "/about" },
  { text: "Services", link: "/services" },
  { text: "Doctor", link: "/doctors" },
  { text: "Blog", link: "/listBlogs" },
  { text: "Contact", link: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  const [dropDown, setDropDown] = useState(false);

  const navbarY = useTransform(scrollY, [0, 100], [0, -5]);
  const navbarScale = useTransform(scrollY, [0, 100], [1, 0.98]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Your animation variants remain the same (omitted here for brevity)...

  const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="relative bg-white w-full h-[80px] px-4 text-white font-bold text-xl overflow-visible">
      <div className="flex items-center h-full text-black w-fit">
        {/* Logo Section */}
        <div className="w-[20%] ml-12 flex items-center mr-12">
          <img
            src={scope}
            alt="Scope image"
            className="w-[35%] h-[35%] object-contain mt-8 cursor-pointer hover:scale-105 transition-transform duration-300"
          />
          <div className="ml-8 text-3xl text-[#42cbf5] cursor-pointer font-bold hover:scale-105 transition-transform duration-300">
            {/* Changed <a href> to Link to */}
            <Link to="/home">MediGO</Link>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="w-[40%] flex items-center justify-start z-10">
          {navItems.map((item, index) => (
            <div
              key={item.text}
              onMouseEnter={() => setHoveredItem(item.text)}
              onMouseLeave={() => setHoveredItem(null)}
              className="relative mt-6"
            >
              {/* Changed href to to here */}
              <Link
                to={item.link}
                className="text-black mr-12 transition-colors duration-300 font-medium cursor-pointer relative hover:text-[#42cbf5] hover:scale-110 inline-block"
              >
                {item.text}

                {/* Underline animation */}
                <div
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#42cbf5] to-[#36b7e0] transition-all duration-300 ${
                    hoveredItem === item.text ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Profile Button */}
      <div className="absolute -top-[-22px] right-[20px] z-20 flex flex-col justify-center align-center gap-1">
        <Button
          onClick={() => setDropDown(!dropDown)}
          variant="contained"
          className="!bg-white !rounded-2xl px-4 py-2 flex items-center justify-center !text-black text-xl font-bold shadow-lg border border-gray-100 hover:!bg-[#42cbf5] hover:!text-white transition-all duration-300 hover:scale-105"
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <motion.span initial={{ opacity: 0.8 }} whileHover={{ opacity: 1 }}>
            <a>Profile</a>
          </motion.span>
        </Button>
        {dropDown && (
          <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md w-48 py-2 px-4 flex flex-col gap-2 opacity-95 z-50">
            <Link to="/myProfile">
              <button className="text-left text-sm text-gray-700 hover:bg-gray-100 px-3 py-2 rounded transition-all">
                View Profile
              </button>
            </Link>

            <button
              onClick={handleLogout}
              className="text-left text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded transition-all"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
