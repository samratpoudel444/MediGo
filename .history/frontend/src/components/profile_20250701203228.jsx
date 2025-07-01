import { useEffect, useState } from "react";
import image from "../assets/MediGO.png";
import axiosInstance from "./utils/AxiosInstance";
import { toast } from "react-toastify";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/api/v1/getMyDetails")
      .then((res) => {
        setUserDetails(res.data.message); // assuming message contains the user object
      })
      .catch((err) => toast.error("Failed to load profile"));
  }, []); // ✅ include dependency array to avoid infinite loop

  return (
    <div className="flex flex-row gap-8 items-center justify-center mt-16 px-36 py-0 rounded-lg bg-white ">
      {/* Profile Image & Name */}
      <div className="flex flex-col items-center gap-3">
        <img
          src={userDetails?.profileImage || image}
          alt="User"
          className="w-40 h-40 rounded-full object-cover border-2 shadow-sm"
        />
        <span className="font-semibold text-2xl text-gray-800">
          {userDetails?.firstName + " " + userDetails?.lastName || "Loading..."}
        </span>
      </div>

      {/* User Info Section */}
      <div className="flex flex-col w-1/2 items-center justify-center text-center">
        <span className="font-bold text-4xl text-gray-900">User Details</span>
        {userDetails ? (
          <>
            <p className="text-lg text-gray-700 mt-4">
              <strong>Email:</strong> &nbsp; {userDetails.email}
            </p>
            {/* Add more fields here if needed */}
          </>
        ) : (
          <p className="text-gray-500 mt-4">Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
