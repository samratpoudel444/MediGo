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
     

        <div>
        </div>         
     
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default ViewRemainder;
