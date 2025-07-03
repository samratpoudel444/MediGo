import { Formik } from "formik";
import {
  FormControl,
  TextField,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
// import your mutation logic or useMutation if using react-query, etc.

const ForgotPassword = () => {
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center ">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values, { setSubmitting }) => {
            mutation.mutate(values, {
              onSettled: () => setSubmitting(false),
            });
          }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-6"
            >
              <Typography variant="h4" className="text-gray-800 text-center">
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
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;
