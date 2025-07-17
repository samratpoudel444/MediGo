import React, { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./utils/AxiosInstance";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import ReactModal from "react-modal";
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
    "/api/v1/uploadPrescription",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    }
  );
  return response.data;
};

const fetchRxNormDetails = async (medicineName) => {
  const resIds = await axiosInstance.get(
    `https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${encodeURIComponent(
      medicineName
    )}`
  );
  const rxcui = resIds.data.idGroup?.rxnormId?.[0];
  if (!rxcui) throw new Error("No RXCUI found for this medicine.");
  const detailsRes = await axiosInstance.get(
    `https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/properties.json`
  );
  return detailsRes.data.properties;
};

const PrescriptionUpload = () => {
  const [fileName, setFileName] = useState("No file chosen");
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [rxDetails, setRxDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data) => {
      setLoading(false);
      toast.success("Upload successful!");
    },
    onError: (error) => {
      setLoading(false);
      toast.error(error.response?.data?.message || "Upload failed");
    },
  });

  useEffect(() => {
    ReactModal.setAppElement("body");
    return () => previewURL && URL.revokeObjectURL(previewURL);
  }, [previewURL]);

  const handleFile = (selectedFile) => {
    setFile(selectedFile);
    setFileName(selectedFile.name);
    setPreviewURL(URL.createObjectURL(selectedFile));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    e.dataTransfer?.files?.[0] && handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("Please select a file first.");
    setLoading(true);
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
    setRxDetails(null);
    setIsModalOpen(false);
  };

  const handleApi = async (medicineName) => {
    try {
      toast.info("Fetching medicine details...");
      const details = await fetchRxNormDetails(medicineName);
      setRxDetails(details);
      setIsModalOpen(true);
      toast.success("Details fetched!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {loading && (
        <div className="fixed inset-0 bg-white bg-opacity-70 z-50 flex items-center justify-center">
          <ClipLoader color="#36d7b7" size={60} />
        </div>
      )}
      {/* Upload Section */}
      <div className="flex flex-wrap justify-center mt-10 gap-40">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-center mb-6">
            Upload Prescription
          </h2>
          <form onSubmit={handleUpload} className="space-y-6">
            <div
              className={`flex flex-col items-center justify-center border-4 border-dashed rounded-md cursor-pointer p-10 text-center transition-colors ${
                dragActive
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300 bg-white"
              }`}
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
                onChange={(e) => handleFile(e.target.files[0])}
              />
              {previewURL ? (
                <img
                  src={previewURL}
                  alt="Preview"
                  className="max-h-48 rounded-md border"
                />
              ) : (
                <>
                  <p className="text-gray-600 text-lg mb-2">{fileName}</p>
                </>
              )}
            </div>
            <div className="flex gap-5">
              <button
                type="submit"
                disabled={!file || mutation.isLoading}
                className={`w-full rounded-md py-3 font-bold text-white ${
                  !file || mutation.isLoading
                    ? "bg-gray-400"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                Upload
              </button>
              <button
                type="button"
                onClick={handleClear}
                disabled={mutation.isLoading}
                className={`w-full rounded-md py-3 font-bold text-white ${
                  mutation.isLoading
                    ? "bg-gray-400"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
        <PrescriptionImage />
      </div>

      {/* OCR Results */}
      {mutation.isSuccess && mutation.data?.extractedText && (
        <div className="mt-10 px-8 flex flex-col items-center">
          <div className="w-full max-w-4xl p-4 bg-green-100 rounded-md">
            <p className="font-semibold text-green-800 text-center">
              OCR Extraction Successful
            </p>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Field</TableCell>
                    <TableCell>Value</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(mutation.data.extractedText).map(
                    ([key, value]) => (
                      <TableRow key={key}>
                        <TableCell>{key}</TableCell>
                        <TableCell>{value}</TableCell>
                        <TableCell>
                          {key === "Medicine Name" && (
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => handleApi(value)}
                            >
                              View Medicine Details
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}

      {/* Modal for RxNorm Details */}
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Medicine Details"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "400px",
          },
        }}
      >
        <h2 className="text-xl font-semibold mb-4">Medicine Details</h2>
        {rxDetails ? (
          <div className="text-sm">
            {Object.entries(rxDetails).map(([k, v]) => (
              <p key={k}>
                <strong>{k}:</strong> {v}
              </p>
            ))}
          </div>
        ) : (
          <p>Loading details...</p>
        )}
        <div className="mt-4 text-right">
          <Button variant="contained" onClick={() => setIsModalOpen(false)}>
            Close
          </Button>
        </div>
      </ReactModal>
    </div>
  );
};

export default PrescriptionUpload;
