import { Button } from "@mui/material";
import React from "react";
import scope from "../assets/download.jpg";

const AppointmentSchedule = () => {
  return (
    <div className="w-[98vw] h-[600px] flex items-center justify-center pr-48">
      <div className=" w-[60%] flex flex-col justify-items-start items-end mr-12">
        <div className="m-16 mt-12 w-[40%]">
          <h3 className="w-fit h-[30px] p-2 ml-1 text-gray text-xl text-[#42cbf5] bg-gray-50 rounded-2xl flex items-center justify-center">
            TIME TABLE
          </h3>
          <h1 className="text-6xl mt-4">Appointment</h1>
          <h1 className="text-6xl mt-4">Schedules</h1>
          <p className="mt-8  leading-6 text-gray text-xl ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique
            maxime reiciendis ullam deserunt minima recusandae quia nesciunt
            quidem, ad cumque quibusdam adipisci laboriosam voluptates quos
          </p>
          <Button className="!rounded-4xl !mt-8" variant="contained">
            Book Appointment
          </Button>
        </div>
      </div>
      <div className="w-[40%]">
        <img
          src={scope}
          alt="Scope image"
          className="w-[80%] h-[80%] object-contain mt-2"
        />
      </div>
    </div>
  );
};

export default AppointmentSchedule;
