import { useState } from "react";
import MapWithMarker from "./MapComponent"; // Adjust path if needed
import axiosInstance from "./utils/AxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

function AddPharmacy() {
  console.log("AddPharmacy rendered");

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
      console.log("Sending data to API:", data);
      const res = await axiosInstance.post("/api/v1/addPharmacy", data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(res,);
      console.log("Response from API:", data);
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
      toast.error(error.response?.data?.message || "Failed to add pharmacy");
    },
  });

  const handleForm = (e) => {
    e.preventDefault();
    console.log("Submit clicked");

    const { pharmacyName, licenseNo, email, latitude, longitude } = formData;

    if (!pharmacyName || !licenseNo || !email || !latitude || !longitude) {
      toast.error("Please fill all required fields including location.");
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
            <label className="mb-1 font-medium block">Pharmacy Name:</label>
            <input
              type="text"
              name="pharmacyName"
              value={formData.pharmacyName}
              onChange={handleInputChange}
              className="p-2 border w-full shadow-sm rounded"
              placeholder="Enter Pharmacy Name"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 font-medium block">License No:</label>
            <input
              type="text"
              name="licenseNo"
              value={formData.licenseNo}
              onChange={handleInputChange}
              className="p-2 border w-full shadow-sm rounded"
              placeholder="Enter License Number"
            />
          </div>
        </div>

        {/* Contact + Email */}
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <label className="mb-1 font-medium block">Contact No:</label>
            <input
              type="text"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleInputChange}
              className="p-2 border w-full shadow-sm rounded"
              placeholder="Enter Contact Number"
            />
          </div>
          <div className="flex-1">
            <label className="mb-1 font-medium block">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-2 border w-full shadow-sm rounded"
              placeholder="Enter Email"
            />
          </div>
        </div>

        {/* Map Location Selector */}
        <div>
          <label className="mb-1 font-medium block">
            Select Location of Pharmacy:
          </label>
          <MapWithMarker onSelect={handleMapSelect} />
          {formData.latitude && formData.longitude && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: Latitude {formData.latitude}, Longitude{" "}
              {formData.longitude}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-1/3 bg-sky-600 text-white rounded py-3 hover:bg-sky-700 transition duration-300"
            disabled={addPharmacyMutation.isLoading}
          >
            {addPharmacyMutation.isLoading ? "Submitting..." : "Add Pharmacy"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPharmacy;
