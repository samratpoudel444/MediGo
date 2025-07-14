import {  useQuery } from "@tanstack/react-query";
import Footer from "./Footer"
import Navbar from "./Navbar"
import axiosInstance from "./utils/AxiosInstance";
import image from"../assets/MediGO.png"

const getAllDoctors= async()=>
{
    try{
        const response = await axiosInstance.get(
          "api/v1/getAllDoctorsForDisplay"
        );
        console.log("the resp is", response.data.doctors);
        return response.data.doctors;
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
}

const ShowAllDoctorDisplay= ()=>
{
    const { data, isLoading, isError } = useQuery({
      queryFn: getAllDoctors,
      queryKey: ["displayForDoctor"],
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Something went wrong.</div>;

    console.log("The data is",data)

    if(!data)
    {
        return (
          <div>
            <Navbar />
            <div>No Doctor Avilable currently</div>
            <Footer className="fixed bottom-0 w-full" />
          </div>
        );
    }

    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className=" flex-grow flex justify-center flex-wrap gap-10 py-10">
          {data.map((arr, index) => (
            <div className="h-70 w-60 mx-10 my-10 rounded-2xl hover:scale-105 shadow-2xl border border-gray-300">
              <img
                className="px-2 py-2 rounded-full"
                src={arr?.image || image}
                alt=""
              />
              <span className="block w-full text-center text-2xl font-bold px-4">
                {arr.userId.firstName + " " + arr.userId.lastName}
              </span>
              <span className="block w-full text-center text-2xl px-4">
                {arr.userId.firstName + " " + arr.userId.lastName}
              </span>
            </div>
          ))}
        </main>
        <Footer className="fixed bottom-0 w-full" />
      </div>
    );
}

export default ShowAllDoctorDisplay;