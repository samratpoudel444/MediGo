import React, { useState } from "react";
import doctorImage from "../assets/doctor.png";
import scope from "../assets/scope.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const navItems = [
  { text: "About", link: "#" },
  { text: "Services", link: "#" },
  { text: "Doctor", link: "#" },
  { text: "Blog", link: "#" },
  { text: "Contact", link: "/contact" },
];

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

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
            MediGO
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
              <Link
                href={item.link}
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

      {/* Background Image */}
      {/* <div className="absolute top-[0px] right-0">
        <img
          className="w-[700px] hover:scale-105 transition-transform duration-300"
          src="./navimage.png"
          alt=""
        />
      </div> */}

      {/* Appointment Button */}
      <div className="absolute -top-[-22px] right-[20px] z-20">
        <Button
          variant="contained"
          className="!bg-white !rounded-2xl px-4 py-2 flex items-center justify-center !text-black text-xl font-bold shadow-lg border border-gray-100 hover:!bg-[#42cbf5] hover:!text-white transition-all duration-300 hover:scale-105"
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          Appointment
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;