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
import axiosInstance from "./utils/AxiosInstance";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import Navbar from "./Navbar";


async function getDoctorDetails(doctorType) {
  try {
    const res = await axiosInstance.get(
      `/api/v1/getAllDoctorByRole/${doctorType}`
    );
    return res.data.message || [];
  } catch (err) {
    toast.error(err?.response?.data?.message || "Failed to fetch doctor");
    return [];
  }
}

async function sendAppointment(formData) {
  try {
    const res = await axiosInstance.post(`/api/v1/bookAppointment`, formData);
    return res.data.message || [];
  } catch (err) {
    throw err;
  }
}

function AppointmentForm({ onClose }) {
  const [formData, setFormData] = useState({
    doctorType: "",
    doctorId: "",
    Age: "",
    appointmentDate: "",
    reason: "",
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
    onSuccess: () => {
      toast.success("Appointment booked successfully!");
      setFormData({
        doctorType: "",
        doctorId: "",
        Age: "",
        appointmentDate: "",
        reasons: "",
        appointmentType: "",
      });
      if (onClose) onClose();
    },
    onError: (error) => {
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
    <div>
    <div> <Navbar/></div>
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-16">
      <Typography variant="h5" className="text-gray-800 mb-6 text-center">
        Make an Appointment
      </Typography>
      <form className="space-y-4 gap-2" onSubmit={handleSubmit}>
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
            <MenuItem value="Internal Medicine">Internal Medicine</MenuItem>
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

        <FormControl fullWidth>
          <TextField
            label="Age"
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            error={Boolean(errors.Age)}
          />
          {errors.Age && <FormHelperText error>{errors.Age}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Reason"
            type="text"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            error={Boolean(errors.reason)}
          />
          {errors.reasons && (
            <FormHelperText error>{errors.reason}</FormHelperText>
          )}
        </FormControl>

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
            <FormHelperText error>{errors.appointmentType}</FormHelperText>
          )}
        </FormControl>

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
            <FormHelperText error>{errors.appointmentDate}</FormHelperText>
          )}
        </FormControl>

        <div className="mt-6 flex justify-center gap-4">
          <button
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Submitting..." : "Submit"}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-400 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Close
            </button>
          )}
        </div>
      </form>
    </div>
    </div>
  );
}

export default AppointmentForm;
