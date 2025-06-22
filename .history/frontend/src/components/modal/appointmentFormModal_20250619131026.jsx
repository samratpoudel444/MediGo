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
import { useMutation, useQuery } from "@tanstack/react-query";

async function getDoctorDetails(doctorType) {
  try {
    const res = await axiosInstance.get(
      `/api/v1/getAllDoctorByRole/${doctorType}`
    );
    console.log(res.data.message);
    return res.data.message || [];
  } catch (err) {
    console.log(err);
    toast.error(err?.response?.data?.message || "Failed to fetch doctor");
    return [];
  }
}

async function sendAppointment(formData) {
  try {
    const res = await axiosInstance.post(`/api/v1/bookAppointment`, formData);
    console.log(res.data.message);
    return res.data.message || [];
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function AppointmentFormModal({ onClose }) {
  const [formData, setFormData] = useState({
    doctorType: "",
    doctorId: "",
    Age: "",
    appointmentDate: "",
    reasons: "",
    appointmentType: "",
  });

  const [errors, setErrors] = useState({});

  const { data = [] } = useQuery({
    queryKey: ["doctorByRole", formData.doctorType],
    queryFn: ({ queryKey }) => getDoctorDetails(queryKey[1]),
    enabled: !!formData.doctorType,
  });

  const mutation = useMutation({
    mutationFn: sendAppointment,
    onSuccess: (data) => {
      toast.success("Appointment booked successfully!");
      setFormData({
        doctorType: "",
        doctorId: "",
        Age: "",
        appointmentDate: "",
        reasons: "",
        appointmentType: "",
        dob: "",
      });
      if (onClose) onClose();
    },
    onError: (error) => {
      console.error(error);
      const message =
        error.response?.data?.message || error.message || "Submission Failed";
      toast.error(message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setCalendar = () => {
    const now = new Date();
    const hour = now.getHours();

    const targetDate = new Date();

    if (hour >= 20 && hour < 24) {
      targetDate.setDate(now.getDate() + 3);
    } else {
      targetDate.setDate(now.getDate() + 2);
    }

    targetDate.setHours(0, 0, 0, 0);

    return targetDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();



    mutation.mutate(formData);
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
            onClick={onClose}
          >
            ✕
          </button>

          <div className="p-5 text-center">
            <Typography variant="h5" className="text-gray-800 mb-4">
              Make an Appointment
            </Typography>
            <form className="space-y-4" onSubmit={handleSubmit}>
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
                    {data?.map((doctor) => (
                      <MenuItem key={doctor.userId} value={doctor.userId}>
                        {doctor.userId.firstName} {doctor.userId.lastName}
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

                {/* Appointment Date */}
                <FormControl fullWidth>
                  <TextField
                    label="Appointment Date"
                    type="date"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    variant="standard"
                    inputProps={{
                      min: setCalendar().toISOString().split("T")[0],
                    }}
                    error={Boolean(errors.appointmentDate)}
                  />
                  {errors.appointmentDate && (
                    <FormHelperText error>
                      {errors.appointmentDate}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <button
                  type="submit"
                  className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-400 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentFormModal;
