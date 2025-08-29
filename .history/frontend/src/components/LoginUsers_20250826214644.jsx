import { Formik } from "formik";
import {
  TextField,
  Typography,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  Stack,
  Button,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { connectSocket } from "./utils/SocketInitialize";



const userLogin= async(values)=>
{
    const response = await axios.post(
      "http://localhost:3000/api/v1/signInUsers",
      values
    );
    return response.data;

}

const LoginUsers = () => {

    const navigate= useNavigate();

    const mutation = useMutation({
      mutationFn: userLogin,

      onSuccess: (data) => {
        toast.success(data.message);
        localStorage.setItem('token',data.token);
         connectSocket();

        if (data.role === "Doctor") {
          navigate("/doctor/dashboard");
        } else if (data.role === "Admin") {
          navigate("/admin/ViewAnalytics");
        } else if (data.role === "Patient") {
          navigate("/Home");
        } else {
          navigate("/");
        }
      },

      onError: (error) => {
        console.log(error);
        const message =
          error.response?.data?.message || error.message || "login Failed";
        toast.error(message);
      },
    });

  return (
    <div className="w-screen lg:w-full h-screen flex items-center justify-center">
      <div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values, {setSubmitting}) => {
            mutation.mutate(values,{
                onSettled: ()=> setSubmitting(false),
            })
          }}
        >
          {(formik) => {
            return (
              <div className="w-200 max-w-md mx-auto p-6 rounded   ">
                <form
                  onSubmit={formik.handleSubmit}
                  className=" flex flex-col gap-8"
                >
                  <Typography variant="h2" className="text-gray-600">
                    Login
                  </Typography>

                  <FormControl>
                    <TextField
                      className="w-full"
                      label="Email"
                      {...formik.getFieldProps("email")}
                    />
                  </FormControl>

                  <FormControl>
                    <TextField
                      className="w-full"
                      label="Password"
                      type="password"
                      {...formik.getFieldProps("password")}
                    />
                  </FormControl>
                  <p className="text-right">
                    <Link href="/forgotPassword">forgot password?</Link>&nbsp;
                  </p>
                  <Stack className="w-full justify-center items-center gap-2">
                    <Button
                      type="submit"
                      size="large"
                      variant="contained"
                      style={{ backgroundColor: "#42cbf5" }}
                      disabled={formik.isSubmitting || mutation.isLoading}
                    >
                      {mutation.isLoading ? "submitting" : "submit"}
                    </Button>

                    <p>
                      Didn't have account?&nbsp;&nbsp;
                      <Link href="/register">Register here.</Link>&nbsp:&nbsp;
                    </p>
                  </Stack>
                </form>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default LoginUsers;
