import React, { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./utils/AxiosInstance";
import Navbar from "./Navbar";
import { toast } from "react-toastify";

const uploadImage = async (formData) => {
  const response = await axiosInstance.post(
    `${process.env.REACT_APP_API_BASE_URL}/uploadPrescription`,
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

  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      toast.success("Upload successful!");
      console.log("Upload successful:", data);
    },
    onError: (error) => {
      toast.error("Upload failed. Please try again.");
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

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(selectedFile.type)) {
      return toast.error("Invalid file type. Only JPG, PNG, or JPEG allowed.");
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      return toast.error("File size exceeds 5MB limit.");
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setPreviewURL(URL.createObjectURL(selectedFile));
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
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
    if (previewURL) URL.revokeObjectURL(previewURL);
    mutation.reset();
    setFile(null);
    setFileName("No file chosen");
    setPreviewURL("");
    setDragActive(false);
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-start">
      <Navbar />
      <div className="max-w-md mx-auto mt-20 p-8">
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
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                inputRef.current?.click();
              }
            }}
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
              disabled={
                !file ||
                mutation.isLoading ||
                (mutation.isSuccess && mutation.data?.imageUrl)
              }
              className={`w-full rounded-md px-4 py-3 font-bold text-white transition
              ${
                !file ||
                mutation.isLoading ||
                (mutation.isSuccess && mutation.data?.imageUrl)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {mutation.isLoading ? "Uploading..." : "Upload"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className={`w-full rounded-md px-4 py-3 font-bold text-white transition
              ${
                mutation.isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Clearing..." : "Clear Data"}
            </button>
          </div>
        </form>

        {mutation.isSuccess && mutation.data?.imageUrl && (
          <div className="mt-6 text-center">
            <p className="text-green-700 font-semibold">Upload successful!</p>
            <a
              href={mutation.data.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View Uploaded Image
            </a>
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
