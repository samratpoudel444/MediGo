import React from "react";
import {
  FaPrescriptionBottleAlt,
  FaMapMarkerAlt,
  FaBell,
  FaUserMd,
  FaFileMedical,
} from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";


const services = [
  {
    icon: <FaPrescriptionBottleAlt className="text-blue-600 text-4xl" />,
    title: "OCR-Based Prescription Reader",
    description:
      "Upload your doctor's handwritten prescription and convert it into structured digital data using AI-powered OCR.",
  },
  {
    icon: <FaMapMarkerAlt className="text-green-600 text-4xl" />,
    title: "Nearby Pharmacy Locator",
    description:
      "Find pharmacies near you in real-time. Check availability, get directions, and opening hours instantly.",
  },
  {
    icon: <FaBell className="text-yellow-500 text-4xl" />,
    title: "Smart Medicine Reminders",
    description:
      "Never miss a dose. Set up personalized medicine reminders and get notified on time.",
  },
  {
    icon: <FaUserMd className="text-purple-600 text-4xl" />,
    title: "Doctor Appointment Booking",
    description:
      "Book appointments with doctors based on location, specialty, and availability with instant confirmations.",
  },
  {
    icon: <FaFileMedical className="text-red-500 text-4xl" />,
    title: "Health Records Organizer",
    description:
      "Securely upload and manage your health records, prescriptions, and medical history in one place.",
  },
];

function MedigoServices() {
  return (
    <div>
        <Navbar/>
      <div className="px-6 py-12 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      </>
    </div>
  );
}

export default MedigoServices;
