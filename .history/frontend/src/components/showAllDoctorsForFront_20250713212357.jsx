import { useQuery } from "@tanstack/react-query";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axiosInstance from "./utils/AxiosInstance";
import image from "../assets/MediGO.png";

const getAllDoctors = async () => {
  try {
    const response = await axiosInstance.get("api/v1/getAllDoctorsForDisplay");
    console.log("the resp is", response.data.doctors);
    return response.data.doctors;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const ShowAllDoctorDisplay = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getAllDoctors,
    queryKey: ["displayForDoctor"],
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Something went wrong.</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex justify-center flex-wrap gap-10 py-10">
        {!data || data.length === 0 ? (
          <div className="text-center text-xl text-gray-600">
            No Doctor Available currently
          </div>
        ) : (
          data.map((arr, index) => (
            <div
              key={index}
              className="w-[200px] h-[200px] rounded-2xl border hover:w-[210px] hover:h-[210px] transition-all"
            >
              <img
                className="w-full h-full object-cover rounded-2xl px-5 py-2"
                src={arr?.image || image}
                alt={`Doctor ${index}`}
              />
              ds
            </div>
          ))
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ShowAllDoctorDisplay;
