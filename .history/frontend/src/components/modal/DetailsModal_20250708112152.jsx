import doctor from "../../assets/MEDIGO.png";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axiosInstance from "../utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";


const getUserDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/showDoctorById/${id}`);
    console.log(response.data.message);
    return response.data.message;
  } catch (err) {
    toast.error(err.response.data.message);
    return err.response.data.message;
  }
};

function DetailsModal({ id, fullname, onClose }) {
  const { data } = useQuery({
    queryKey: ["getPatientDetails", id],
    queryFn: ({ queryKey }) => getUserDetails(queryKey[1]),
  });

  return (
    <div
      id="popup-modal"
      className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-transparent"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-500">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-2.5 text-black hover:text-gray-900 dark:hover:text-white"
          >
            ✕
          </button>

          <div className="p-5 text-center">
            <h3 className="mb-5 font-normal text-gray-500 dark:text-gray-300 text-2xl text-bold">
              Doctor Details <strong>{fullname}</strong>
            </h3>

            <div className="flex flex-col my-3 text-gray-300">
              <div className="flex items-center justify-center my-2">
                <img
                  src={doctor}
                  alt=""
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="flex flex-col items-center justify-center ">
                <div className="flex flex-row w-full">
                  <div className="border px-3 py-2 w-1/2">First Name:</div>
                  <div className="border px-3 py-2 w-1/2">
                    {data?.userId.firstName}
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="border px-3 py-2 w-1/2">Last Name:</div>
                  <div className="border px-3 py-2 w-1/2">
                    {data?.userId.lastName}
                  </div>
                </div>

                <div className="flex flex-row w-full">
                  <div className="border px-3 py-2 w-1/2">Email:</div>
                  <div className="border px-3 py-2 w-1/2 break-words">
                    {data?.userId.email}
                  </div>
                </div>

                <div className="flex flex-row w-full">
                  <div className="border px-3 py-2 w-1/2">Date of Birth:</div>
                  <div className="border px-3 py-2 w-1/2">
                    {data?.userId.dob}
                  </div>
                </div>

                <div className="flex flex-row w-full">
                  <div className="border px-3 py-2 w-1/2">Gender:</div>
                  <div className="border px-3 py-2 w-1/2">
                    {data?.userId.gender}
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="border px-3 py-2 w-1/2">role:</div>
                  <div className="border px-3 py-2 w-1/2">
                    {data?.userId.role}
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="border px-3 py-2 w-1/2">Address:</div>
                  <div className="border px-3 py-2 w-1/2">
                    {data?.userId.address}
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="border px-3 py-2 w-1/2">LiscenseNo:</div>
                  <div className="border px-3 py-2 w-1/2">
                    {data?.licenseNo}
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="border px-3 py-2 w-1/2">DegreeType:</div>
                  <div className="border px-3 py-2 w-1/2">
                    {data?.degreeType}
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="border px-3 py-2 w-1/2">SpecialistType:</div>
                  <div className="border px-3 py-2 w-1/2">
                    {data?.specialistType}
                  </div>
                </div>
              </div>
            </div>

            <button 
            onState
            className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">
              MessageDoctor
            </button>

            <button
              onClick={onClose}
              className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-400 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsModal;
