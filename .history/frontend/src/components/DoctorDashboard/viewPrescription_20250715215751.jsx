import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance";

const ViewPrescription = () => {
  const { id } = useParams();
  const [prescriptions, setPrescriptions] = useState([]); // array now
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/getPrescriptionById/${id}`
      );
      console.log(response.data.message);

      // If response.data.message is an array, set it directly
      if (Array.isArray(response.data.message)) {
        setPrescriptions(response.data.message);
      } else if (response.data.message) {
        // If single object, wrap in array for consistency
        setPrescriptions([response.data.message]);
      } else {
        setPrescriptions([]);
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching prescription:", err);
      setError("Failed to load prescription");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Prescription Details</h1>
      <div></div>
      {prescriptions.length > 0 ? (
        prescriptions.map((presc) => (
          <img
            key={presc._id}
            src={presc.imageUrl}
            alt={`Prescription ${presc._id}`}
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              marginBottom: "15px",
            }}
          />
        ))
      ) : (
        <p>No prescription images found.</p>
      )}
    </div>
  );
};

export default ViewPrescription;
