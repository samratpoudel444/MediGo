import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/AxiosInstance"; 

const ViewPrescription = () => {
  const { id } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/v1/getPrescriptionById/${id}`
      );
      console.log(response.data.message)
      setPrescription(response.data.message);
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
    <div>
      <h1>Prescription Details</h1>
      {prescription?.imageUrl?.length > 0 ? (
        prescription.images.forEach(
           
        });((img, index) => (
          <img key={index} src={img} alt={`Prescription ${index + 1}`} />
        ))
      ) : (
        <p>No prescription images found.</p>
      )}
    </div>
  );
};

export default ViewPrescription;
