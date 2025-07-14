import { useNavigate } from "react-router-dom";
import doctor from "../../assets/MEDIGO.png";
import axiosInstance from "../utils/AxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const getUserDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/v1/showPatientById/${id}`);
    return response.data.message;
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to fetch user details");
    throw err; // Re-throw to let react-query handle the error
  }
};

function UserDetailsModal({ id, fullname, onClose }) {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getPatientDetails", id],
    queryFn: ({ queryKey }) => getUserDetails(queryKey[1]),
    retry: 1,
  });

  const handleMessageUser = () => {
    if (!data) {
      toast.error("User data not loaded yet");
      return;
    }

    navigate(`/chat`, {
      state: {
      setSelectedUser: {
        firstName: data?.firstName,
        lastName: data?.lastName,
        _id: data._id,
      },
    }
    });
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-transparent">
        <div className="p-4 rounded-lg shadow dark:bg-gray-500">
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-transparent">
        <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-500">
          <div className="p-5 text-center">
            <h3 className="mb-5 text-xl font-semibold text-red-500">
              Failed to load user details
            </h3>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="details-modal"
      className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-transparent"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-g rounded-lg shadow dark:bg-gray-500">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-2.5 text-black hover:text-gray-900 dark:hover:text-white"
          >
            ✕
          </button>

          <div className="p-5 text-center">
            <h3 className="mb-5 text-2xl font-semibold text-black dark:text-gray-300">
              User Details
            </h3>

            <div className="flex flex-col my-3 text-black">
              <div className="flex items-center justify-center my-2">
                <img
                  src={doctor}
                  alt="User avatar"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-0 border rounded-lg overflow-hidden">
                {[
                  { label: "First Name", value: data?.firstName },
                  { label: "Last Name", value: data?.lastName },
                  { label: "Email", value: data?.email },
                  { label: "Date of Birth", value: data?.dob },
                  { label: "Gender", value: data?.gender },
                  { label: "Role", value: data?.role },
                  { label: "Address", value: data?.address },
                ].map((item, index) => (
                  <>
                    <div
                      key={`label-${index}`}
                      className="p-2 bg-gray-100 border"
                    >
                      {item.label}:
                    </div>
                    <div
                      key={`value-${index}`}
                      className="p-2 border break-words"
                    >
                      {item.value || "N/A"}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 p-4">
            <button
              onClick={handleMessageUser}
              className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Message User
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100"
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
