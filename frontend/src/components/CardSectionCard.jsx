import React from "react";
import scope from "../assets/scope.png";
import { Button } from "@mui/material";

const CardSectionCard = () => {
  return (
    <div className="h-[70%] w-[20%] bg-white rounded-3xl flex flex-col p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Appointment</h2>
        <div className="w-12 h-12 bg-[#42cbf5] rounded-xl overflow-hidden flex items-center justify-center">
          <img
            src={scope}
            alt="scope"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error qui
        dolore placeat totam minima harum mollitia vero. Perspiciatis maxime.
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
      </p>

      {/* Button */}
      <div className="mt-auto flex justify-center mb-2">
        <Button className="!rounded-2xl !w-[140px]" variant="contained">
          Learn More
        </Button>
      </div>
    </div>
  );
};

export default CardSectionCard;
