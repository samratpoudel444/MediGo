
import React from "react";
import scope from "../assets/appointmenthouse.jpg";
import hand from "../assets/hand.png";

import { Button } from "@mui/material";

const OurSpeciality = () => {
  return (
    <div className="w-[97vw] h-[500px] bg-gray-50 flex flex-col items-center justify-around">
      <div>
        <h3 className="w-[94vw] h-[30px] p-2 ml-1  text-xl text-[#42cbf5] bg-gray-50  flex items-center justify-center">
          Features
        </h3>
        <h1 className="text-5xl mt-4 w-screen flex justify-center">
          Our Speciality
        </h1>
      </div>
      <div className="w-[60%] bg-[#42cbf5] h-[60%] rounded-4xl mt-8 mb-4 flex">
        <div className="w-[20%] h-[100%] flex justify-end mt-12">
          <img
            src={scope}
            alt="Scope image"
            className="w-[60%] h-[30%] object-contain mt-1 mr-8 rounded-3xl bg-white"
          />
        </div>
        <div className="w-[40%]">
          <h1 className="text-gray-50 text-3xl mt-12">View Previous Appointment </h1>
          <p className="text-gray-50 mt-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora
            totam minus fugiat soluta sapiente ab corporis, molestias neque
          </p>
          <Button
            className="!bg-white !text-[#42cbf5] !rounded-2xl !mt-4"
            variant="contained"
          >
            Learn More
          </Button>
        </div>
        <div>
          <img
            src={hand}
            alt="Scope image"
            className="w-[100%] h-[180%] object-contain -mt-36 "
          />
        </div>
      </div>
    </div>
  );
};

export default OurSpeciality;
