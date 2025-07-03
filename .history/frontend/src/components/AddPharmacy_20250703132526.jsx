import { useState } from "react";
import MapWithMarker from "./MapComponent";
import axiosInstance from "./utils/AxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
      const res = await axiosInstance.post("/api/v1/addPharmacy", data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success("Pharmacy added successfully!");
      console.log("Response:", data);

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

    if (
      !formData.pharmacyName ||
      !formData.licenseNo ||
      !formData.email ||
      !formData.latitude ||
      !formData.longitude
    ) {
      toast.error("Please fill all required fields including location.");
      return;
    }

    addPharmacyMutation.mutate(formData);
  };

  const handleMapClick = (coordinates) => {
    setFormData((prev) => ({
      ...prev,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
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
      <div className="h-22 shadow-sm bg-white">
        <h1 className="text-3xl text-center py-6">Add Pharmacy</h1>
      </div>
      <div>
        <form
          onSubmit={handleForm}
          className="max-w-5xl mx-auto bg-white mt-10 rounded shadow-md space-y-6 min-h-screen"
        >
          {/* 1st Row */}
          <div className="flex flex-col lg:flex-row px-10 gap-20 py-10 w-full">
            <div className="flex flex-col w-full">
              <label className="mb-1 font-medium">Pharmacy Name:</label>
              <input
                type="text"
                name="pharmacyName"
                value={formData.pharmacyName}
                placeholder="Enter Pharmacy Name"
                className="p-2 border w-80 h-10 shadow-sm rounded"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">License No:</label>
              <input
                type="text"
                name="licenseNo"
                value={formData.licenseNo}
                placeholder="Enter License No"
                className="p-2 border w-80 h-10 shadow-sm rounded"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* 2nd Row */}
          <div className="flex flex-col lg:flex-row px-10 gap-20 py-0 w-full">
            <div className="flex flex-col w-full">
              <label className="mb-1 font-medium">Contact No:</label>
              <input
                type="text"
                name="contactNo"
                value={formData.contactNo}
                placeholder="Enter Contact No"
                className="p-2 border w-80 h-10 shadow-sm rounded"
                onChange={handleInputChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Enter Email"
                className="p-2 border w-80 h-10 shadow-sm rounded"
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Map */}
          <div className="w-full px-10">
            <label className="mb-1 font-medium">
              Enter Exact Location of Pharmacy:
            </label>
            <MapWithMarker onLocationSelect={handleMapClick} />
            <p className="text-sm text-gray-600 mt-2">
              Latitude: {formData.latitude || "-"}, Longitude:{" "}
              {formData.longitude || "-"}
            </p>
          </div>

          {/* Submit */}
          <div className="flex align-center justify-center">
            <button
              type="submit"
              className="w-1/3 bg-sky-600 text-white rounded py-3 hover:opacity-90 hover:bg-sky-700 transition-all duration-300"
              disabled={addPharmacyMutation.isLoading}
            >
              {addPharmacyMutation.isLoading ? "Submitting..." : "Add Pharmacy"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPharmacy;
