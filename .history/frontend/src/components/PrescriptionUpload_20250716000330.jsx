import React, { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./utils/AxiosInstance";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader"; 
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableHead,
  TableContainer,
  Button,
} from "@mui/material";
import PrescriptionImage from "./prescriptionImage";


const uploadImage = async (formData) => {
  const response = await axiosInstance.post(
    "http://localhost:3000/api/v1/uploadPrescription",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }
  );
  return response.data;
};

const PrescriptionUpload = () => {
  const [fileName, setFileName] = useState("No file chosen");
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const [loading, setLoading]= useState(false);

  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      setLoading(false)
      toast.success("Upload successful!");
      console.log("Upload successful:", data);
    },
    onError: (error) => {
      setLoading(false);
      toast.error(error.response?.data?.message || "Upload failed");
      console.error("Upload failed:", error);
    },
  });


  useEffect(() => {
    return () => {
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, [previewURL]);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setPreviewURL(URL.createObjectURL(selectedFile));
  };

  const handleFileChange = (e) => handleFile(e.target.files[0]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("Please select a file first.");
    const formData = new FormData();
    formData.append("prescription", file);
    mutation.mutate(formData);
  };

  const handleClear = () => {
    mutation.reset();
    setFile(null);
    setFileName("No file chosen");
    setPreviewURL("");
    setDragActive(false);
    if (inputRef.current) inputRef.current.value = null;
  };

  const changeLoading= ()=>
  {
    setLoading(true);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center">
          <div className="text-center">
            <ClipLoader color="#36d7b7" size={60} />
            <p className="mt-4 text-lg text-gray-700">Uploading...</p>
          </div>
        </div>
      )}

      <div className="flex flex-row flex-wrap justify-center items-start gap-40 mt-10">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Upload Prescription
          </h2>

          <form onSubmit={handleUpload} className="space-y-6">
            <div
              className={`flex flex-col items-center justify-center border-4 border-dashed rounded-md cursor-pointer
              ${
                dragActive
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 bg-white"
              }
              p-10 text-center transition-colors duration-200`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current.click()}
            >
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {previewURL ? (
                <img
                  src={previewURL}
                  alt="Preview"
                  className="max-h-48 rounded-md border border-gray-300"
                />
              ) : (
                <>
                  <p className="text-gray-600 text-lg mb-2">
                    {fileName === "No file chosen"
                      ? "Drag and drop an image here or click to select"
                      : `Selected: ${fileName}`}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-blue-400 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                </>
              )}
            </div>

            <div className="flex flex-row gap-5">
              <button
                type="submit"
                onClick={changeLoading}
                disabled={!file || mutation.isLoading || mutation.isSuccess}
                className={`w-full rounded-md px-4 py-3 font-bold text-white transition ${
                  !file || mutation.isLoading || mutation.isSuccess
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {mutation.isLoading ? "Uploading..." : "Upload"}
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={mutation.isLoading}
                className={`w-full rounded-md px-4 py-3 font-bold text-white transition ${
                  mutation.isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {mutation.isLoading ? "Clearing..." : "Clear"}
              </button>
            </div>
          </form>
        </div>

        {/* Image Instructions / Format */}
        <div className="h-full w-full max-w-sm">
          <PrescriptionImage />
        </div>
      </div>

      {/* OCR Results */}
      <div className="mt-10 px-8 flex flex-col items-center">
        {mutation.isSuccess && mutation.data?.extractedText && (
          <div className="w-full max-w-4xl p-4 bg-green-100 rounded-md">
            <p className="font-semibold mb-4 text-green-800 text-center">
              OCR Extraction Successful
            </p>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Field</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(mutation.data.extractedText).map(
                    ([key, value]) => (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{value}</TableCell>
                        <TableCell className="px-">
                          {key === "Medicine Name" ? (
                            <>
                              {value}
                              <button
                                onClick={() => alert(`You clicked on ${value}`)}
                                style={{
                                  marginLeft: "10px",
                                  padding: "5px 10px",
                                  fontSize: "0.8rem",
                                  borderRadius: "4px",
                                  backgroundColor: "#1976d2",
                                  color: "#fff",
                                  border: "none",
                                  cursor: "pointer",
                                }}
                              >
                                View Medicine Details
                              </button>
                            </>
                          ) : (
                            value
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}

        {mutation.isError && (
          <p className="mt-4 text-center text-red-600 font-semibold">
            Upload failed. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default PrescriptionUpload;
