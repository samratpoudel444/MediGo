import { useState } from "react";
import {
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axiosInstance from "../utils/AxiosInstance";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

async function getDoctorDetails(doctorType) {
  try {
    const res = await axiosInstance.get(
      `/api/v1/getAllDoctorByRole/${doctorType}`
    );
    console.log(res)
    return res.data.message;
  } catch (err) {
    console.log(err)
    toast.error(err?.response?.data?.message || "Failed to fetch doctor");
    return [];
  }
}

function AppointmentFormModal() {
  const [formData, setFormData] = useState({
    doctorType: "",
    doctorId: "",
    Age: "",
    appointmentDate: "",
    reasons: "",
    appointmentType: "",
    dob: "",
  });

  const [errors, setErrors] = useState({});

  const { data = [] } = useQuery({
    queryKey: ["doctorByRole", formData.doctorType],
    queryFn: ({ queryKey }) => getDoctorDetails(queryKey[1]),
    enabled: !!formData.doctorType,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div
      id="popup-modal"
      className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-black bg-opacity-30"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-500">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 hover:text-gray-900"
          >
            ✕
          </button>

          <div className="p-5 text-center">
            <Typography variant="h5" className="text-gray-800 mb-4">
              Make an Appointment
            </Typography>
            <form className="space-y-4">
              <div className="flex flex-col gap-3">
                {/* Specialist Type */}
                <FormControl fullWidth>
                  <InputLabel>Specialist Type</InputLabel>
                  <Select
                    label="Specialist Type"
                    name="doctorType"
                    value={formData.doctorType}
                    onChange={handleChange}
                    error={Boolean(errors.doctorType)}
                  >
                    <MenuItem value="General">General</MenuItem>
                    <MenuItem value="Surgery">Surgery</MenuItem>
                    <MenuItem value="Internal Medicine">
                      Internal Medicine
                    </MenuItem>
                    <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                    <MenuItem value="Gynecology">Gynecology</MenuItem>
                    <MenuItem value="Orthopedics">Orthopedics</MenuItem>
                    <MenuItem value="Neurology">Neurology</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                  {errors.doctorType && (
                    <FormHelperText error>{errors.doctorType}</FormHelperText>
                  )}
                </FormControl>

                {/* Doctor Name */}
                <FormControl fullWidth>
                  <InputLabel>Doctor Name</InputLabel>
                  <Select
                    label="Doctor Name"
                    name="doctorId"
                    value={formData.doctorId}
                    onChange={handleChange}
                    error={Boolean(errors.doctorId)}
                  >
                    {data?.map((doc) => (
                      <MenuItem key={doc.id} value={doc.id}>
                        {doc.firstName} {doc.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.doctorId && (
                    <FormHelperText error>{errors.doctorId}</FormHelperText>
                  )}
                </FormControl>

                {/* Age */}
                <FormControl fullWidth>
                  <TextField
                    label="Age"
                    type="number"
                    name="Age"
                    value={formData.Age}
                    onChange={handleChange}
                    error={Boolean(errors.Age)}
                  />
                  {errors.Age && (
                    <FormHelperText error>{errors.Age}</FormHelperText>
                  )}
                </FormControl>

                {/* Reason */}
                <FormControl fullWidth>
                  <TextField
                    label="Reason"
                    type="text"
                    name="reasons"
                    value={formData.reasons}
                    onChange={handleChange}
                    error={Boolean(errors.reasons)}
                  />
                  {errors.reasons && (
                    <FormHelperText error>{errors.reasons}</FormHelperText>
                  )}
                </FormControl>

                {/* Appointment Type */}
                <FormControl fullWidth>
                  <InputLabel>Appointment Type</InputLabel>
                  <Select
                    label="Appointment Type"
                    name="appointmentType"
                    value={formData.appointmentType}
                    onChange={handleChange}
                    error={Boolean(errors.appointmentType)}
                  >
                    <MenuItem value="1">New Checkup</MenuItem>
                    <MenuItem value="2">Follow Up</MenuItem>
                    <MenuItem value="3">Regular Checkup</MenuItem>
                  </Select>
                  {errors.appointmentType && (
                    <FormHelperText error>
                      {errors.appointmentType}
                    </FormHelperText>
                  )}
                </FormControl>

                {/* Date of Birth */}
                <FormControl fullWidth>
                  <TextField
                    label="Date of Birth"
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    error={Boolean(errors.dob)}
                  />
                  {errors.dob && (
                    <FormHelperText error>{errors.dob}</FormHelperText>
                  )}
                </FormControl>
              </div>
            </form>

            <div className="mt-6 flex justify-center gap-4">
              <button className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
                Submit
              </button>
              <button className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-400 font-medium rounded-lg text-sm px-5 py-2.5">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentFormModal;
