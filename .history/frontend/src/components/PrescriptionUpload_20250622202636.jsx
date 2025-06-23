import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

import axiosInstance from "./utils/AxiosInstance";
import Navbar from "./Navbar";

const uploadImage = async (formData) => {
  const response = await axiosInstance.post(
    "http://localhost:3000/api/v1/uploadPrescription",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const PrescriptionUpload = () => {
  const [fileName, setFileName] = useState("Choose any image");
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

  useEffect(() => {
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
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
    <div>
      <Navbar />
      <div
        style={{ padding: "2rem" }}
        className="flex flex-col items-right mx-10 mt-16 justify-center w-1/2"
      >
        <h2 className="text-4xl font-bold text-center ">Upload Prescription</h2>

        <div className="border">
          <form onSubmit={handleUpload}>
            <div className="space-y-2">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="text-2xl"
                  className="hidden"
                />
              </label>
            </div>

            <br />
            <br />
            <button
              type="submit"
              disabled={mutation.isLoading}
              className=" bg-green-400 px-5 py-3 rounded hover:opacity-90 text-2xl font-bold"
            >
              {mutation.isLoading ? "Uploading..." : "Upload"}
            </button>
          </form>
        </div>
        {previewURL && (
          <div style={{ marginTop: "1rem" }}>
            <p>Preview:</p>
            <img src={previewURL} alt="Preview" width="200" />
          </div>
        )}

        {mutation.isSuccess && mutation.data?.imageUrl && (
          <div>
            <p>Uploaded URL:</p>
            <a href={mutation.data.imageUrl} target="_blank" rel="noreferrer">
              {mutation.data.imageUrl}
            </a>
            <br />
            <img src={mutation.data.imageUrl} alt="Uploaded" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionUpload;
