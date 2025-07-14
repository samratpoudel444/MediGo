import { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import GetAllApprovedAppointments from "./getAllApprovedAppointments";
GetAll
const ViewAppointmentSchedule = () => {
  const [activeButton, setActiveButton] = useState("unapproved");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow w-full h-full">
        <div className="w-full flex justify-center items-center gap-6 mt-16 ">
          <button
            onClick={() => setActiveButton("unapproved")}
            className={`rounded-2xl border px-4 py-2 text-xl transition duration-300 ${
              activeButton === "unapproved"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            View Unapproved Appointment
          </button>

          <button
            onClick={() => setActiveButton("old")}
            className={`rounded-2xl border px-4 py-2 text-xl transition duration-300 ${
              activeButton === "old"
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
          >
            View Old Appointments
          </button>
        </div>

        {/* Conditionally render the table for old appointments */}
        <div className="mt-10 px-6">
          {activeButton === "old" && <GetAllApprovedAppointments />}
          {activeButton === "unapproved" && (
            <p className="text-center text-gray-600 mt-8">
              {/* Replace with your Unapproved Appointment content or component */}
              Showing Unapproved Appointments content here.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewAppointmentSchedule;
