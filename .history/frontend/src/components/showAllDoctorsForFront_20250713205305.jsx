import Footer from "./Footer"
import Navbar from "./Navbar"

const getAllDoctors= async()=>
{
    try{

    }
    catch(err)
    {
        console.log(err)
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