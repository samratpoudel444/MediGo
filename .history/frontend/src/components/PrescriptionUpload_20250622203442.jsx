import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "./utils/AxiosInstance";
import Navbar from "./Navbar";

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

  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      console.log("Upload successful:", data);
    },
    onError: (error) => {
      console.error("Upload failed:", error);
    },
  });

  // useEffect(() => {
  //   return () => {
  //     if (previewURL) URL.revokeObjectURL(previewURL);
  //   };
  // }, [previewURL]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setFileName(selectedFile.name);
   setPreviewURL(URL.createObjectURL(selectedFile));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return alert("Select a file first.");

    const formData = new FormData();
    formData.append("prescription", file);

    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Upload Prescription
        </h2>

        <form onSubmit={handleUpload} className="space-y-6">
          <div>
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex items-center justify-center rounded-md bg-blue-600 px-4 py-3 text-white font-semibold hover:bg-blue-700 transition"
            >
              Choose Image
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <p className="mt-2 text-sm text-gray-600 truncate">{fileName}</p>
          </div>

          {previewURL && (
            <div className="flex justify-center">
              <img
                src={previewURL}
                alt="Preview"
                className="max-h-48 rounded-md border border-gray-300"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={!file || mutation.isLoading}
            className={`w-full rounded-md px-4 py-3 font-bold text-white transition
              ${
                !file || mutation.isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
          >
            {mutation.isLoading ? "Uploading..." : "Upload"}
          </button>
        </form>

        {mutation.isSuccess && mutation.data?.imageUrl && (
          <div className="mt-8 p-4 bg-green-100 rounded-md">
            <p className="font-semibold mb-2 text-green-800">
              Upload Successful!
            </p>
            <a
              href={mutation.data.imageUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline break-all"
            >
              {mutation.data.imageUrl}
            </a>
            <img
              src={mutation.data.imageUrl}
              alt="Uploaded"
              className="mt-4 max-h-48 rounded-md border border-gray-300"
            />
          </div>
        )}

        {mutation.isError && (
          <p className="mt-4 text-red-600 font-semibold">
            Upload failed. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default PrescriptionUpload;
