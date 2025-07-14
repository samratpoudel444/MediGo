import Footer from "./Footer"
import Navbar from "./Navbar"


const ViewAppointmentSchedule=()=>
{
    const[button1, setButton1]
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow w-full h-full">
          <div className="w-full flex justify-center items-center gap-6 mt-16 border">
            <button className="rounded-2xl border px-2 py-2 text-xl">
              View Unapproved Appointment
            </button>
            <button className="rounded-2xl border px-2 py-2 text-xl">
              View Old Appointments
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
}

export default ViewAppointmentSchedule;