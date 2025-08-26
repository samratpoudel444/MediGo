import { Formik } from "formik";
import { FormControl, TextField, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axiosInstance from "./utils/AxiosInstance";
import { useState } from "react";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState(""); 

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <Formik
          initialValues={{
            email: "",
            otp: "",
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              if (step === 1) {
                // Step 1: Send OTP
                await axiosInstance.post("/api/forgotPassword", {
                  email: values.email,
                });
                setEmail(values.email);
                setStep(2);
              } else if (step === 2) {
                // Step 2: Verify OTP
                await axiosInstance.post("/auth/verifyOtp", {
                  email,
                  otp: values.otp,
                });
                setStep(3);
              } else if (step === 3) {
                // Step 3: Reset Password
                if (values.newPassword !== values.confirmPassword) {
                  alert("Passwords do not match!");
                  return;
                }
                await axiosInstance.post("/auth/resetPassword", {
                  email,
                  newPassword: values.newPassword,
                });
                alert("Password reset successful! Please login.");
                setStep(1);
              }
            } catch (err) {
              console.error(err);
              alert(err.response?.data?.message || "Something went wrong");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {(formik) => (
            <>
              {step === 1 && (
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-6"
                >
                  <Typography
                    variant="h4"
                    className="text-gray-800 text-center"
                  >
                    Forgot Password
                  </Typography>

                  <FormControl>
                    <TextField
                      fullWidth
                      label="Email Address"
                      {...formik.getFieldProps("email")}
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "#42cbf5" }}
                    disabled={formik.isSubmitting}
                  >
                    Send OTP
                  </Button>

                  <p className="text-sm text-center">
                    Remember your password?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                      Go to login
                    </Link>
                  </p>
                </form>
              )}

              {step === 2 && (
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-6 text-center"
                >
                  <Typography variant="h5">Check your Email</Typography>
                  <Typography variant="body1">
                    We've sent an OTP to <b>{email}</b>. Please enter it below.
                  </Typography>

                  <FormControl>
                    <TextField
                      fullWidth
                      label="Enter OTP"
                      {...formik.getFieldProps("otp")}
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "#42cbf5" }}
                    disabled={formik.isSubmitting}
                  >
                    Verify OTP
                  </Button>
                </form>
              )}

              {step === 3 && (
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-6 text-center"
                >
                  <Typography variant="h5">Change Your Password</Typography>

                  <FormControl>
                    <TextField
                      fullWidth
                      type="password"
                      label="New Password"
                      {...formik.getFieldProps("newPassword")}
                    />
                  </FormControl>

                  <FormControl>
                    <TextField
                      fullWidth
                      type="password"
                      label="Confirm Password"
                      {...formik.getFieldProps("confirmPassword")}
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "#42cbf5" }}
                    disabled={formik.isSubmitting}
                  >
                    Reset Password
                  </Button>
                </form>
              )}
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
