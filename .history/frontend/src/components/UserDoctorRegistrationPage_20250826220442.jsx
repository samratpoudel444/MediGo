import React, { useState } from "react";
import MapWithMarker from "./MapComponent";
import axiosInstance from "./utils/AxiosInstance";
import { toast, ToastContainer } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const RegisterDoctor = async (form) => {
  try {
    const response = await axiosInstance.post("/api/v1/createDoctor", form);
    return response.data.message;
  } catch (err) {
    throw err;
  }
};

function CreateDoctorDirectly() {
  const [error, setError] = useState({});
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    dob: "",
    role: "Doctor",
    address: "",
    longitude: "",
    latitude: "",
    licenseNo: "",
    degreeType: "",
    specialistType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error[name]) {
      setError((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleMapSelect = ({ lat, lng }) => {
    setForm((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  const validateData = () => {
    const newError = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!form.firstName.trim()) newError.firstName = "First name is required";
    if (!form.lastName.trim()) newError.lastName = "Last name is required";
    if (!form.email.trim()) newError.email = "Email is required";
    else if (!emailRegex.test(form.email))
      newError.email = "Invalid email format";

    if (!form.password.trim()) newError.password = "Password is required";
    else if (!passwordRegex.test(form.password)) {
      newError.password =
        "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character.";
    }

    if (!form.gender.trim()) newError.gender = "Gender is required";
    if (!form.dob.trim()) newError.dob = "Date of birth is required";
    if (!form.address.trim()) newError.address = "Address is required";
    if (!form.licenseNo.trim())
      newError.licenseNo = "License number is required";
    if (!form.degreeType.trim())
      newError.degreeType = "Degree type is required";
    if (!form.specialistType.trim())
      newError.specialistType = "Specialist type is required";

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const mutation = useMutation({
    mutationFn: RegisterDoctor,
    onSuccess: (data) => {
      toast.success(data);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
        dob: "",
        role: "Doctor",
        address: "",
        longitude: "",
        latitude: "",
        licenseNo: "",
        degreeType: "",
        specialistType: "",
      });
    },
    onError: (error) => {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateData()) return;
    mutation.mutate(form);
  };

  const inputStyle = (field) =>
    `p-2 border rounded ${error[field] ? "border-red-500" : ""}`;

  return (
    <div className="overflow-auto min-h-  bg-gray-50">
      <h1 className="py-6 text-3xl font-semibold text-center bg-white shadow-sm mb-6">
        Create Doctor
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white p-6 rounded shadow-md space-y-6"
      >
        {/* Input rows */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col w-full">
            <label className="mb-1 font-medium">First Name:</label>
            <input
              name="firstName"
              className={inputStyle("firstName")}
              type="text"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Enter First Name"
            />
            {error.firstName && (
              <p className="text-red-500 text-sm">{error.firstName}</p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-1 font-medium">Last Name:</label>
            <input
              name="lastName"
              className={inputStyle("lastName")}
              type="text"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Enter Last Name"
            />
            {error.lastName && (
              <p className="text-red-500 text-sm">{error.lastName}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col  gap-6">
          <div className="flex flex-col w-full">
            <label className="mb-1 font-medium">Email:</label>
            <input
              name="email"
              className={inputStyle("email")}
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
            {error.email && (
              <p className="text-red-500 text-sm">{error.email}</p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-1 font-medium">Password:</label>
            <input
              name="password"
              className={inputStyle("password")}
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
            {error.password && (
              <p className="text-red-500 text-sm">{error.password}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col w-full">
            <label className="mb-1 font-medium">Gender:</label>
            <select
              name="gender"
              className={inputStyle("gender")}
              value={form.gender}
              onChange={handleChange}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
            {error.gender && (
              <p className="text-red-500 text-sm">{error.gender}</p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-1 font-medium">Date of Birth:</label>
            <input
              name="dob"
              className={inputStyle("dob")}
              type="date"
              value={form.dob}
              onChange={handleChange}
            />
            {error.dob && <p className="text-red-500 text-sm">{error.dob}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col w-full">
            <label className="mb-1 font-medium">Address:</label>
            <input
              name="address"
              className={inputStyle("address")}
              type="text"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter Address"
            />
            {error.address && (
              <p className="text-red-500 text-sm">{error.address}</p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-1 font-medium">License No:</label>
            <input
              name="licenseNo"
              className={inputStyle("licenseNo")}
              type="text"
              value={form.licenseNo}
              onChange={handleChange}
              placeholder="Enter License No"
            />
            {error.licenseNo && (
              <p className="text-red-500 text-sm">{error.licenseNo}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col w-full">
            <label className="mb-1 font-medium">Degree Type:</label>
            <select
              name="degreeType"
              className={inputStyle("degreeType")}
              value={form.degreeType}
              onChange={handleChange}
            >
              <option value="">Select Degree Type</option>
              <option value="MBBS">MBBS</option>
              <option value="MD">MD</option>
              <option value="DM">DM</option>
            </select>
            {error.degreeType && (
              <p className="text-red-500 text-sm">{error.degreeType}</p>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label className="mb-1 font-medium">Specialist Type:</label>
            <select
              name="specialistType"
              className={inputStyle("specialistType")}
              value={form.specialistType}
              onChange={handleChange}
            >
              <option value="">Select specialist type</option>
              <option value="General">General</option>
              <option value="Surgery">Surgery</option>
              <option value="InternalMedicine">Internal Medicine</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Gynecology">Gynecology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Neurology">Neurology</option>
              <option value="Oncology">Oncology</option>
              <option value="Others">Others</option>
            </select>
            {error.specialistType && (
              <p className="text-red-500 text-sm">{error.specialistType}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-medium">Point exact home location:</label>
          <MapWithMarker onSelect={handleMapSelect} />
          {form.latitude && form.longitude && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: Latitude {form.latitude}, Longitude {form.longitude}
            </p>
          )}
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Create Doctor
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CreateDoctorDirectly;
