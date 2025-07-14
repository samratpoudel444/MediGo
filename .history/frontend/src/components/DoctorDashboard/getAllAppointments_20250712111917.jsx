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

    }
}


const GetAllAppointments = ()=>
{
    return(
        <div> 

        </div>
    )
}

export default GetAllAppointments;