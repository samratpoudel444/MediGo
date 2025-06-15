import React from "react";
import doctorImage from "../assets/doctor.png";
import scope from "../assets/scope.png";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";


const navItems = [
  // { text: "Home", link: "/" },
  { text: "About", link: "#" },
  { text: "Services", link: "#" },
  { text: "Doctor", link: "#" },
  { text: "Blog", link: "#" },
  { text: "Contact", link: "#" },
];
const Navbar = () => {
  return (
    <nav className="relative bg-white w-full h-[80px] px-4 text-white font-bold text-xl overflow-visible">
      <div className="flex items-center h-full text-black w-fit">
        <div className=" w-[20%] ml-12 flex items-center mr-12 ">
          <img
            src={scope}
            alt="Scope image"
            className="w-[35%] h-[35%] object-contain mt-2"
          />
          <div className="ml-8 text-3xl text-[#42cbf5]">MediGO</div>
        </div>
        <div className=" w-[40%] flex items-center justify-start z-10 ">
          {navItems.map((item) => (
            <Link
              key={item.text}
              href={item.link}
              className="text-black mr-12  hover:text-indigo-200 transition-colors duration-200 font-medium"
            >
              {item.text}
            </Link>
          ))}
        </div>
      </div>
      {/* Background circle */}
      {/* translae
      rounded-tl-[600px] rounded-bl-[600px] rounded-br-[300px] rounded-tr-none overflow-x-hidden */}
      <div className=" absolute top-[0px] right-0  ">
        <img className="w-[700px]" src="./navimage.png" alt="" />
        
      </div>
      {/* <div className="absolute -top-[-180px] right-70 translate-x-[100px] z-10 h-[600px] w-[400px] flex items-center justify-center pointer-events-none">
          <img
            src={doctorImage}
            alt="Doctor image"
            className="w-[90%] h-[90%] object-contain"
          />
        </div> */}
      

      {/* Foreground box */}
      <Button
        variant="contained"
        className="!absolute -top-[-22px] right-[20px] z-20  !bg-white !rounded-2xl px-4 py-2 flex items-center justify-center !text-black  text-xl font-bold shadow-lg"
      >
        Appointment
      </Button>
    </nav>
  );
};

export default Navbar;
