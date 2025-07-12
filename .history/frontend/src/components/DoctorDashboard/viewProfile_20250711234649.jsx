// import { useEffect, useState } from "react";
// import axiosInstance from "../utils/AxiosInstance";
// import { toast } from "react-toastify";
// import image from "../../assets/MEDIGO.png";
// import { useNavigate } from "react-router-dom";


// const ViewProfile = () => {
//   const [userDetails, setUserDetails] = useState(null);
//     const navigate = useNavigate();
//   useEffect(() => {
//     axiosInstance
//       .get("/api/v1/getDoctorProfile")
//       .then((res) => {
//         setUserDetails(res.data.message);
//       })
//       .catch((err) =>
//         toast.error(err.response?.data?.message || "Error fetching data")
//       );
//   }, []);

//   const handleLogout= ()=>
//   {
//     localStorage.removeItem("token");
//     navigate("/login");
//     toast.success("Logout Sucessfull")
//   }

//   const user = userDetails?.userId;

//   return (
//     <div>
//       <div className="flex flex-row gap-16 items-start justify-center mt-20 px-24 py-12 bg-white rounded-xl max-w-6xl mx-auto  h-full">
//         <div className="flex flex-col items-center gap-4">
//           <img
//             src={user?.profileImage || image}
//             alt="User"
//             className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 shadow-md"
//           />
//           <h2 className="font-bold text-2xl text-gray-800">
//             {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
//           </h2>
//         </div>

//         <div className="flex flex-col w-2/3 items-start justify-start gap-3">
//           <h3 className="text-3xl font-bold text-blue-700 mb-6 border-b pb-2">
//             Doctor Details
//           </h3>
//           {userDetails && user ? (
//             <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-gray-700 text-lg w-full">
//               <p>
//                 <strong>First Name:</strong> {user.firstName}
//               </p>
//               <p>
//                 <strong>Last Name:</strong> {user.lastName}
//               </p>
//               <p>
//                 <strong>Date of Birth:</strong> {user.dob}
//               </p>
//               <p>
//                 <strong>Gender:</strong> {user.gender}
//               </p>
//               <p>
//                 <strong>Role:</strong> {user.role}
//               </p>
//               <p>
//                 <strong>Address:</strong> {user.address}
//               </p>
//               <p>
//                 <strong>Longitude:</strong> {user.longitude}
//               </p>
//               <p>
//                 <strong>Latitude:</strong> {user.latitude}
//               </p>
//               <p>
//                 <strong>Degree:</strong> {userDetails.degreeType}
//               </p>
//               <p>
//                 <strong>Specialist:</strong> {userDetails.specialistType}
//               </p>
//               <p>
//                 <strong>License No:</strong> {userDetails.licenseNo}
//               </p>
//             </div>
//           ) : (
//             <p className="text-gray-500">Loading user data...</p>
//           )}

//           <div className="flex gap-10 mt-10">
//             <button className="border rounded-xl px-3 py-2 bg-sky-500 font-bold text-white hover:opacity-50">
//               Update Profile Image
//             </button>
//             <button className="border rounded-xl px-3 py-2 bg-sky-500 font-bold text-white hover:opacity-50">
//               Update Details
//             </button>
//             <button className="border rounded-xl px-3 py-2 bg-red-500 font-bold text-white hover:opacity-50"
//             onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewProfile;


import { useEffect, useState } from "react";
import image from "../../assets/MediGO.png";
import { toast } from "react-toastify";
import { useLogout } from "../utils/logout";
import axiosInstance from "../utils/AxiosInstance";
import UpdatePassword from "../modal/updatePassword";

const AdminProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [updatePasswordDetails, setUpdatePasswordDetails] = useState(false);
  console.log(updatePasswordDetails);

  const logout = useLogout();
  useEffect(() => {
    axiosInstance
      .get("/api/v1/getDoctorProfile")
      .then((res) => {
        setUserDetails(res.data.message);
      })
      .catch((err) => toast.error(err.response.data.message));
  }, []);

  return (
    <div>
      <div className="flex flex-row gap-16 items-start justify-center mt-20 px-24 py-12 bg-white rounded-xl shadow-lg max-w-6xl mx-auto">
        {/* Profile Image & Name */}
        <div className="flex flex-col items-center gap-4">
          <img
            src={userDetails?.profileImage || image}
            alt="User"
            className="w-40 h-40 rounded-full object-cover border-4 border-gray-300 shadow-md"
          />
          <h2 className="font-bold text-2xl text-gray-800">
            {userDetails?.firstName + " " + userDetails?.lastName ||
              "Loading..."}
          </h2>
        </div>

        {/* User Info Section */}
        <div className="flex flex-col w-2/3 items-start justify-start gap-3">
          <h3 className="text-3xl font-bold text-blue-700 mb-6 border-b pb-2">
            Doctor Details
          </h3>
          {userDetails ? (
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-gray-700 text-lg w-full">
              <p>
                <strong>First Name:</strong> {userDetails.firstName}
              </p>
              <p>
                <strong>Last Name:</strong> {userDetails.lastName}
              </p>
              <p>
                <strong>Date of Birth:</strong> {userDetails.dob}
              </p>
              <p>
                <strong>Gender:</strong> {userDetails.gender}
              </p>
              <p>
                <strong>Role:</strong> {userDetails.role}
              </p>
              <p>
                <strong>Address:</strong> {userDetails.address}
              </p>
              <p>
                <strong>Longitude:</strong> {userDetails.longitude}
              </p>
              <p>
                <strong>Latitude:</strong> {userDetails.latitude}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Loading user data...</p>
          )}

          <div className="flex gap-10 mt-10">
            <button className="border rounded-xl px-3 py-2 bg-sky-500 font-bold text-white hover:opacity-50">
              Update Profile Image
            </button>
            <button
              className="border rounded-xl px-3 py-2 bg-sky-500 font-bold text-white hover:opacity-50"
              onClick={() => {
                setUpdatePasswordDetails(true);
                setUserDetails(userDetails);
              }}
            >
              Update Password
            </button>
            <button
              className="border rounded-xl px-3 py-2 bg-red-500 font-bold text-white hover:opacity-50"
              onClick={() => logout.mutate()}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      {updatePasswordDetails && (
        <UpdatePassword
          onClose={() => setUpdatePasswordDetails(false)}
          id={userDetails._id}
        />
      )}
    </div>
  );
};

export default AdminProfile;
