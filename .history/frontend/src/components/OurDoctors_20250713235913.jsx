import React from "react";
import DoctorCard from "./DoctorCard";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import image1 from "../assets/a.png"

const OurDoctors = () => {
  return (
    <>
      <div className="w-[98vw] h-[600px] bg-gray-50 pl-10 pr-8 pt-[30px]">
        <div className=" flex flex-col justify-center items-center">
          <h3 className="w-fit h-[30px] p-2 ml-1  text-xl text-[#42cbf5] bg-gray-50 rounded-2xl flex items-center justify-center">
            TEAM
          </h3>
          <h1 className="text-5xl mt-4">Our Doctors</h1>
        </div>
        <div className="w-[94vw] h-[70%] flex items-center justify-center ">
          <DoctorCard img={image1} name="Ram Singh" doctorType="Physician" />
          <DoctorCard
            img={image1}
            name="Hari Bahadur"
            doctorType="Gynocologist"
          />
          <DoctorCard
            img={image1}
            name="La Bahadur"
            doctorType="Gynocologist"
          />
        </div>
        <div className="w-[94vw] flex items-center justify-center ">
          <Link to="../doctors">
            <Button
              className="!rounded-4xl w-[125px]   right-[25px]"
              variant="contained"
            >
              See All
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OurDoctors;
