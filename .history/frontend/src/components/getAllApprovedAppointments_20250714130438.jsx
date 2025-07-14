import axiosInstance from "./utils/AxiosInstance";

const getData= async()=>
{
    try{
        const response= await axiosInstance.get('/api/v1/');
        return response.data.message;
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
}

constGetAllApprovedAppointmenr=()=>
{
    return(

    )
}