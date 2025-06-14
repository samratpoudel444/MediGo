import { Button } from "@mui/material";
import React from "react";

const HealthCare = () => {
  return (
    <div className=" w-screen flex flex-col justify-items-start">
      <div className="m-16 mt-12 w-[40%]">
        <h3 className="w-fit h-[30px] p-2 ml-1 text-gray text-xl text-[#42cbf5] bg-gray-50 rounded-2xl flex items-center justify-center">
          MEDICAL
        </h3>
        <h1 className="text-6xl mt-4">Healthcare</h1>
        <h1 className="text-6xl mt-4">Solutions</h1>
        <p className="mt-8  leading-6 text-gray text-xl ">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique
          maxime reiciendis ullam deserunt minima recusandae quia nesciunt
          quidem, ad cumque quibusdam adipisci laboriosam voluptates quos
          exercitationem ad cumque quibusdam adipisci laboriosam voluptates quos
          exercitationem esse. A, ex eius!
        </p>
        <Button className="!rounded-4xl !mt-8" variant="contained">
          Find Doctor
        </Button>
      </div>
    </div>
  );
};

export default HealthCare;
