import Footer from "./Footer"
import Navbar from "./Navbar"


const ViewAppointmentSchedule=()=>
{
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow w-full h-full">
          <div className="w-full flex justify-center items-center gap-6 mt-16">
            <button className="rounded">View Unapproved Appointment</button>
            <button className="">View Old Appointments</button>
          </div>
        </div>
        <Footer />
      </div>
    );
}

export default ViewAppointmentSchedule;