import { useEffect, useState } from "react";
import image from "../assets/MediGO.png"
import axiosInstance from "./utils/AxiosInstance";

const Profile= ()=>{
   const data= {
  "name": "Samrat Poudel",
  "email": "samrat@example.com",
  "profileImage": "https://example.com/images/samrat.jpg"
}

    const [userDetails, setUserDetails]= useState(null);

    useEffect(()=>
    {
        axiosInstance.get('/api/v1/getMyDetails')
        .then;
    })

    return (
      <div className="flex flex-col gap-16 items-center justify-center mt-16 px-36 py-0 rounded-lg  bg-white">
        {/* Profile Image & Name */}
        <div className="flex flex-col items-center">
          <img
            src={image}
            alt="User"
            className="w-40 h-40 rounded-full object-cover border-2 shadow-sm"
          />
          <span className="font-semibold text-2xl text-gray-800">
            Samrat Poudel
          </span>
        </div>

        <div className="flex flex-col w-1/2 item-center justify-center text-center">
          <span className="font-bold text-4xl text-gray-900">User Details</span>
          {data.forEach(element => {
            
          });}
        </div>
      </div>
    );
}

export default Profile;