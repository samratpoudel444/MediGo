import React, { useState } from "react";
import {
  TextField,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Link,
  Button,
} from "@mui/material";
import MapWithMarker from "./MapComponent";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const RegisterUser = async (values) => {
  console.log(values);
  const response = await axios.post(
    "http://localhost:3000/api/v1/registerUser",
    values
  );
  return response.data;
};

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    role: "User",
    address: "",
    longitude: "",
    latitude: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mutation = useMutation({
    mutationFn: RegisterUser,

    onSuccess: (data) => {
      navigate("/login", {
        state: {
          toastMessage: data.message,
        },
      });
    },

    onError: (error) => {
      console.log(error);
      const message =
        error.response?.data?.message || error.message || "Registration Failed";
      toast.error(message);
      setIsSubmitting(false);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleLocationChange = ({ lat, lng }) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.role) newErrors.role = "Role is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    console.log("Submitting form");
    console.log(formData);

    mutation.mutate(formData);
  };

  return (
    <div className="w-screen lg:w-full h-screen flex justify-center ">
      <div className="w-full max-w-2xl p-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 rounded p-6 bg-white"
        >
          <Typography variant="h3" className="text-gray-600 text-center">
            Register User
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormControl fullWidth>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={Boolean(errors.firstName)}
              />
              {errors.firstName && (
                <FormHelperText error>{errors.firstName}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={Boolean(errors.lastName)}
              />
              {errors.lastName && (
                <FormHelperText error>{errors.lastName}</FormHelperText>
              )}
            </FormControl>
          </div>

          <FormControl fullWidth>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={Boolean(errors.email)}
            />
            {errors.email && (
              <FormHelperText error>{errors.email}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth>
            <TextField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={Boolean(errors.password)}
            />
            {errors.password && (
              <FormHelperText error>{errors.password}</FormHelperText>
            )}
          </FormControl>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                error={Boolean(errors.role)}
              >
                <MenuItem value="Patient">Patient</MenuItem>
                <MenuItem value="Doctor">Doctor</MenuItem>
              </Select>
              {errors.role && (
                <FormHelperText error>{errors.role}</FormHelperText>
              )}
            </FormControl> */}

            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                error={Boolean(errors.gender)}
              >
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              {errors.gender && (
                <FormHelperText error>{errors.gender}</FormHelperText>
              )}
            </FormControl>
          </div>

          <FormControl fullWidth>
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={Boolean(errors.address)}
            />
            {errors.address && (
              <FormHelperText error>{errors.address}</FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth>
            <label className="mb-2 font-medium text-gray-700">
              Select your exact location:
            </label>
            <div className="w-full h-96 border rounded-lg overflow-hidden">
              <MapWithMarker onSelect={handleLocationChange} />
              {FormControl.latitude && FormControl.longitude && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected:<br></br> Latitude {FormControl.latitude}, Lognitude{" "}
                  {FormControl.longitude}
                </p>
              )}
            </div>
          </FormControl>

          <Stack className="w-full items-center gap-4 mt-4">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={isSubmitting || mutation.isPending}
              className="py-3"
            >
              {isSubmitting || mutation.isPending
                ? "Registering..."
                : "Register"}
            </Button>

            {mutation.isError && (
              <Typography color="error" variant="body2">
                Registration failed. Please try again.
              </Typography>
            )}

            <Link
              component="button"
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-blue-800"
            >
              Already have an account? Sign in
            </Link>
          </Stack>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default RegisterForm;
