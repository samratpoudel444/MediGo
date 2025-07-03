import { Formik } from "formik";
import { FormControl, TextField, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axiosInstance from "./utils/AxiosInstance";
import { useState } from "react";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);

  const mutation = {
    mutate: (values, options) => {
      console.log("Reset email sent to:", values.email);
      setTimeout(() => {
        alert("Password reset link sent!");
        options.onSettled?.();
        setStep(2); // move to step 2 after mutation
      }, 1000);
    },
    isLoading: false,
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values, { setSubmitting }) => {
            mutation.mutate(values, {
              onSettled: () => {
                setSubmitting(false);
              },
            });
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
                    disabled={formik.isSubmitting || mutation.isLoading}
                  >
                    {mutation.isLoading ? "Sending..." : "Send Reset Link"}
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
                <div className="text-center space-y-4">
                  <Typography variant="h5">Check your Email</Typography>
                  <Typography variant="body1">
                    We've sent a password reset link to your email. Please check
                    your inbox.
                  </Typography>
                  <br />

                  <FormControl>
                    <TextField
                      fullWidth
                      label="Enter OTP"
                      {...formik.getFieldProps("email")}
                    />
                  </FormControl>

                  <br />
                  <br />

                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#42cbf5" }}
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                </div>
              )}
            </>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
