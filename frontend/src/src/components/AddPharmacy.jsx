import { useState } from "react";
import MapWithMarker from "./MapComponent";
import axiosInstance from "./utils/AxiosInstance";


function AddPharmacy() {
  const [formData, setFormData] = useState({
    PharmacyName: "",
    LiscenseNo: "",
    ContactNo: "",
    email: "",
    longitude: "",
    latitude: "",
  });

  const handleForm = (e) => {
    e.preventDefault(); 
    
  };

  const HandleMapClick = (coordinates) => {
    setFormData((prev) => ({
      ...prev,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    }));
  };

  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="overflow-auto min-h-screen bg-gray-50">
      <div className="h-22 shadow-sm bg-white">
        <h1 className="text-3xl text-center py-6">Add Pharmacy</h1>
      </div>
      <div>
        <form
          onSubmit={handleForm}
          className="max-w-5xl mx-auto bg-white mt-10 rounded shadow-md space-y-6 min-h-screen"
        >
          {/* 1st Row */}
          <div className="flex flex-col lg:flex-row px-10 lg:px-30 gap-20 py-10 w-full">
            <div className="flex flex-col w-full">
              <label className="mb-1 font-medium">Pharmacy Name:</label>
              <input
                type="text"
                name="PharmacyName"
                value={formData.PharmacyName}
                placeholder="Enter Pharmacy Name"
                className="p-2 border w-80 h-10 shadow-sm rounded"
                onChange={HandleInputChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">License No:</label>
              <input
                type="text"
                name="LiscenseNo"
                value={formData.LiscenseNo}
                placeholder="Enter the license No"
                className="p-2 border w-80 h-10 shadow-sm rounded"
                onChange={HandleInputChange}
              />
            </div>
          </div>

          {/* 2nd Row */}
          <div className="flex flex-col lg:flex-row px-10 lg:px-30 gap-20 py-0 w-full">
            <div className="flex flex-col w-full">
              <label className="mb-1 font-medium">Contact No:</label>
              <input
                type="number"
                name="ContactNo"
                value={formData.ContactNo}
                placeholder="Enter Contact No"
                className="p-2 border w-80 h-10 shadow-sm rounded"
                onChange={HandleInputChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter email"
                className="p-2 border w-80 h-10 shadow-sm rounded"
                onChange={HandleInputChange}
              />
            </div>
          </div>

          {/* 3rd Row */}
          <div className="w-full px-10 lg:px-30">
            <label className="mb-1 font-medium">
              Enter Exact location of Pharmacy:
            </label>
            <MapWithMarker onLocationSelect={HandleMapClick} />
            <p className="text-sm text-gray-600 mt-2">
              Latitude: {formData.latitude}, Longitude: {formData.longitude}
            </p>
          </div>

          <div className="flex align-center justify-center">
            <button
              type="submit"
              className="w-1/3 bg-sky-600 text-white rounded py-3 hover:opacity-90 hover:bg-sky-700 transition-all duration-300"
            >
              Add Pharmacy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPharmacy;
