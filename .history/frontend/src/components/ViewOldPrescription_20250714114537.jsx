import { useQuery } from "@tanstack/react-query";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axiosInstance from "./utils/AxiosInstance";

const getAllPrescription = async () => {
  try {
    const response = await axiosInstance.get("/api/v1/getAllPrescriptionImage");
    return response.data.message; // <-- make sure this contains an array
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const ViewOldPrescription = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dataFetch"],
    queryFn: getAllPrescription,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Your Old Prescriptions
        </h1>

        {isLoading && <p className="text-center">Loading...</p>}
        {isError && (
          <p className="text-center text-red-500">
            Failed to load prescriptions.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data &&
            data.map((arr, index) => (
              <div key={index} className="shadow-lg p-4 rounded-md border">
                <img
                  src={arr.imageUrl}
                  alt={`Prescription ${index + 1}`}
                  className="w-full h-auto rounded-md"
                />
              </div>
            ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ViewOldPrescription;
