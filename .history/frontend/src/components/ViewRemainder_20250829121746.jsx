import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import axiosInstance from "./utils/AxiosInstance";
import "react-toastify/dist/ReactToastify.css";

function ViewRemainder() {
  const submitRemainder = async (values) => {
    const { data } = await axiosInstance.post(
      "/api/v1/createRemainder",
      values
    );
    return data;
  };

  const mutation = useMutation({
    mutationFn: submitRemainder,
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    time: Yup.string().required("Time is required"),
  });

  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center">
        <Formik
          initialValues={{ title: "", time: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            mutation.mutate(values, {
              onSuccess: () => {
                toast.success("Remainder created successfully!");
                resetForm();
              },
              onError: (error) => {
                console.log(error);
                toast.error(
                  error?.response?.data?.message ||
                    "Please provide a unique remainder or something went wrong!"
                );
              },
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4 w-full max-w-md p-6 border rounded-xl shadow">
              <h2 className="text-xl font-bold mb-4">
                Create Medicine Remainder
              </h2>

              <div>
                <label className="block mb-1">Title</label>
                <Field
                  name="title"
                  placeholder="Enter medicine name"
                  className="w-full px-2 py-1 border rounded"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block mb-1">Time</label>
                <Field
                  name="time"
                  type="time"
                  className="w-full px-2 py-1 border rounded"
                />
                <ErrorMessage
                  name="time"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={mutation.isPending}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {mutation.isPending ? "Creating..." : "Create Remainder"}
              </button>
            </Form>
          )}
        </Formik>
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default ViewRemainder;
