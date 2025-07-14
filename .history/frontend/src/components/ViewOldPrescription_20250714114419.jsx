import { useQuery } from "@tanstack/react-query";
import Footer from "./Footer"
import Navbar from "./Navbar"
import axiosInstance from "./utils/AxiosInstance";

const getAllPrescription= async()=>
{
    try{
        const response = await axiosInstance.get(
          "/api/v1/getAllPrescriptionImage"
        );
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
}

const ViewOldPrescription= ()=>
{
    const {data}= useQuery({
        queryKey:["dataFetch"],
        queryFn:getAllPrescription
    })

    return(
        <div className="flex flex-col flex-grow min-h-screen">
            <Navbar/>
            <div className="flex-grow">
                {
                    data && data.map((arr, index)=>
                    {
                        <img src={arr.imageUrl} alt="" />;
                    } )
                }
            </div>
            <Footer/>
        </div>
    )
}


export default ViewOldPrescription