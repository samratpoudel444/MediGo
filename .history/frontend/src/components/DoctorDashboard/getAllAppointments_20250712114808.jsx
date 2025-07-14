import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/AxiosInstance";

const fetchData= async()=>
{
    try{
        const response = await axiosInstance.get(
          "/api/v1/getAllDoctorAppointments"
        );
        return response;
    }
    catch(err)
    {
        console.log("fetcing error", err)
        throw err;
    }
}


const GetAllAppointments = ()=>
{
    const {data, isLoading, isError}= useQuery({
        queryFn: fetchData,
        queryKey:['appoint']
    })

    console.log(data)

    return(
        <div> 
            <div className="w-full h-22 bg-gray-300 jus ">

            </div>
        </div>
    )
}

export default GetAllAppointments;