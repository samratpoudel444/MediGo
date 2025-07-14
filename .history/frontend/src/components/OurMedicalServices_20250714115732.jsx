import React from "react";
import bigdoctor from "../assets/bigdocor.png";
import scope from "../assets/scope.png";
import { Button } from "@mui/material";

const OurMedicalServices = () => {
  return (
    <div className="flex flex-col w-[97vw]">
      <div className="flex flex-col items-center justify-center m-18">
        <h3 className="w-fit h-[30px] p-2 ml-1 text-gray text-xl text-[#42cbf5] bg-gray-50 rounded-2xl flex items-center justify-center">
          Service
        </h3>
        <h1 className="text-6xl mt-4">Our Medical Services</h1>
      </div>
      <div className="w-[100%] h-[700px] flex items-center justify-center mb-14 ">
        <div className="bg-[#42cbf5] w-[300px] h-[450px] rounded-[40%] mr-48 mt-36 relative">
          {/* Buttons positioned absolutely above the image */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            {/* 1 */}
            <div className="absolute top-20 right-30 w-[180px] h-[60px] bg-white rounded-4xl flex items-center justify-around px-3 gap-4 shadow-lg">
              <div className="w-12 h-12  bg-[#42cbf5] rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={scope}
                  alt="scope"
                  className="w-full h-full object-cover"
                />
              </div>
              <h6 className="text-[16px]">Eye Care</h6>
            </div>

            {/* 2 */}
            <div className="absolute top-32 left-10 w-[180px] h-[60px] bg-white rounded-4xl flex items-center justify-around px-3 gap-4 shadow-lg">
              <h6 className="text-[16px]">Cardiologist</h6>
              <div className="w-12 h-12 bg-[#42cbf5] rounded-full overflow-hidden flex items-center justify-center">
                <a className="text-3xl">🫀</a>
              </div>
            </div>

            {/* 3 */}
            <div className="absolute top-60 right-20 w-[180px] h-[80px] bg-white rounded-4xl flex items-center justify-around px-3 gap-2 shadow-lg">
              <h6 className="text-[16px]">Medicine</h6>
              <div className="w-14 h-14 bg-[#42cbf5] rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={scope}
                  alt="scope"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* 4 */}
            <div className="absolute top-80 left-16 w-[180px] h-[60px] bg-white rounded-4xl flex items-center justify-around  gap-2 shadow-lg">
              <div className="w-12 h-12 bg-[#42cbf5] rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={scope}
                  alt="scope"
                  className="w-full h-full object-cover"
                />
              </div>
              <h6 className="text-[16]">Dental</h6>
            </div>

            {/* 5 */}
            <div className="absolute top-100 right-4 w-[140px] h-[50px] bg-white rounded-4xl flex items-center justify-around px-3 gap-4 shadow-lg">
              <div className="w-8 h-8 bg-[#42cbf5] rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={scope}
                  alt="scope"
                  className="w-full h-full object-cover"
                />
              </div>
              <h6 className="text-[16px]">Orthologist</h6>
            </div>
          </div>

          {/* Image remains untouched */}
          <img src={bigdoctor} alt="Scope image" className="h-[140%] -mt-48" />
        </div>

        <div className=" w-[30%] flex flex-col justify-items-start mt-12">
          <h1 className="text-4xl mt-4">🫀 Cardiologist Service</h1>

          <p className="mt-8  leading-6 text-gray-400 text-xl ">
            Our expert cardiologists provide comprehensive heart care, from
            diagnosis to treatment of cardiovascular conditions. Whether it's
            chest pain, hypertension, or routine heart screening — you're in
            safe hands. We use advanced diagnostics and personalized treatment
            plans to keep your heart healthy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurMedicalServices;
