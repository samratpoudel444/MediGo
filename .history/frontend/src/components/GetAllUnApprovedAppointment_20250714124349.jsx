import axiosInstance from "./utils/AxiosInstance";

const getData= async()=>
{
    try{
        const response= await axiosInstance.get()
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
}

constGetAllUnApprovedAppointmenr=()=>
{
    return(

    )
}