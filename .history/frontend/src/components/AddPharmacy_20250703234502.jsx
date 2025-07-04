import { useState } from "react";
import MapWithMarker from "./MapComponent";
import axiosInstance from "./utils/AxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddPharmacy() {
  const [formData, setFormData] = useState({
    pharmacyName: "",
    licenseNo: "",
    contactNo: "",
    email: "",
    longitude: "",
    latitude: "",
  });

  const addPharmacyMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/api/v1/addPharmacy", data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Pharmacy added successfully!");
      console.log("API Response:", data);
      setFormData({
        pharmacyName: "",
        licenseNo: "",
        contactNo: "",
        email: "",
        longitude: "",
        latitude: "",
      });
    },
    onError: (error) => {
      console.error("Error submitting pharmacy:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Failed to add pharmacy. Please try again.";
      toast.error(errorMessage);
    },
  });

  const handleForm = (e) => {
    e.preventDefault();

    const { pharmacyName, licenseNo, email, latitude, longitude } = formData;

    if (!pharmacyName || !licenseNo || !email || !latitude || !longitude) {
      toast.error("Please fill all required fields including location.");
      return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    addPharmacyMutation.mutate(formData);
  };

  const handleMapSelect = ({ lat, lng }) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="overflow-auto min-h-screen bg-gray-50">
      {/* Toast Container must be included somewhere in your app */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="shadow-sm bg-white py-6">
        <h1 className="text-3xl text-center">Add Pharmacy</h1>
      </div>

      <form
        onSubmit={handleForm}
        className="max-w-5xl mx-auto bg-white mt-10 rounded shadow-md p-6 space-y-6"
      >
        {/* Name + License */}
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <label className="mb-1 font-medium block">
              Pharmacy Name: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="pharmacyName"
              value={formData.pharmacyName}
              onChange={handleInputChange}
              className="p-2 border w-full shadow-sm rounded"
              placeholder="Enter Pharmacy Name"
              required
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 font-medium block">
              License No: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="licenseNo"
              value={formData.licenseNo}
              onChange={handleInputChange}
              className="p-2 border w-full shadow-sm rounded"
              placeholder="Enter License Number"
              required
            />
          </div>
        </div>

        {/* Contact + Email */}
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <label className="mb-1 font-medium block">
              Contact No: <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleInputChange}
              className="p-2 border w-full shadow-sm rounded"
              placeholder="Enter Contact Number"
              required
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 font-medium block">
              Email: <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-2 border w-full shadow-sm rounded"
              placeholder="Enter Email"
              required
            />
          </div>
        </div>

        {/* Map Location Selector */}
        <div>
          <label className="mb-1 font-medium block">
            Select Location of Pharmacy: <span className="text-red-500">*</span>
          </label>
          <MapWithMarker onSelect={handleMapSelect} />
          {formData.latitude && formData.longitude ? (
            <p className="mt-2 text-sm text-gray-600">
              Selected: Latitude {formData.latitude}, Longitude{" "}
              {formData.longitude}
            </p>
          ) : (
            <p className="mt-2 text-sm text-red-500">
              Please select a location on the map
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/3 bg-sky-600 text-white rounded py-3 hover:bg-sky-700 transition duration-300 disabled:bg-sky-400 disabled:cursor-not-allowed"
            disabled={addPharmacyMutation.isLoading}
          >
            {addPharmacyMutation.isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Add Pharmacy"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPharmacy;
