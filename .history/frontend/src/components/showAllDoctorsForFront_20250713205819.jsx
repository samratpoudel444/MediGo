import Footer from "./Footer"
import Navbar from "./Navbar"
import axiosInstance from "./utils/AxiosInstance";

const getAllDoctors= async()=>
{
    try{
        const response = await axiosInstance.get(
          "api/v1/getAllDoctorsForDisplay"
        );
        return response.data.message;
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
}

const ShowAllDoctorDisplay= ()=>
{
    
    return(
        <div>
          <Navbar/>
          <div>
                <div className="h-20 w-10 border mx-10 my-10">

                </div>
          </div>
          <Footer/>
        </div>
    )
}

export default ShowAllDoctorDisplay;