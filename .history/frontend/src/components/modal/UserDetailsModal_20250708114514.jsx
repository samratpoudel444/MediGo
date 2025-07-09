import { useNavigate } from "react-router-dom";
import doctor from "../../assets/MEDIGO.png";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-toastify";
import axiosInstance from "../utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const getUserDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/showPatientById/${id}`);
    return response.data.message;
  } catch (err) {
    toast.error(err.response.data.message);
    return err.response.data.message;
  }
};

function UserDetailsModal({ id, fullname, onClose }) {
  const { data } = useQuery({
    queryKey: ["getPatientDetails", id],
    queryFn: ({ queryKey }) => getUserDetails(queryKey[1]),
  });

  console.log("the data is ", data);
  return (
    <div
      id="details-modal"
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
            <h3 className="mb-5 font-normal text-black dark:text-gray-300 text-2xl text-bold">
              User Details
            </h3>

            <div className="flex flex-col my-3 text-black">
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
                    {data?.firstName}
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="border px-3 py-2 w-1/2">Last Name:</div>
                  <div className="border px-3 py-2 w-1/2">{data?.lastName}</div>
                </div>

                <div className="flex flex-row w-full">
                  <div className="border px-3 py-2 w-1/2 ">Email:</div>
                  <div className="border px-3 py-2 w-1/2 break-words whitespace-normal">
                    {data?.email}
                  </div>
                </div>

                <div className="flex flex-row w-full">
                  <div className="border px-3 py-2 w-1/2">Date of Birth:</div>
                  <div className="border px-3 py-2 w-1/2">{data?.dob}</div>
                </div>

                <div className="flex flex-row w-full">
                  <div className="border px-3 py-2 w-1/2">Gender:</div>
                  <div className="border px-3 py-2 w-1/2">{data?.gender}</div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="border px-3 py-2 w-1/2">role:</div>
                  <div className="border px-3 py-2 w-1/2">{data?.role}</div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="border px-3 py-2 w-1/2">Address:</div>
                  <div className="border px-3 py-2 w-1/2">{data?.address}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center py-3">
            <button className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mr-2">
              MessageUser
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

export default UserDetailsModal;
